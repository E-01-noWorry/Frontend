import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import instance from '../../../app/module/instance';

import BodyPadding from '../../common/BodyPadding';
import SelectContentBox from '../../common/SelectContentBox';

import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/Array';

import { fontMedium } from '../../../shared/themes/textStyle';
import { IconSmall } from '../../../shared/themes/iconStyle';

import IconDropdown from '../../../static/icons/Variety=Dropdown, Status=untab, Size=S.svg';

import styled from 'styled-components';

const MainSelect = () => {
  const { state } = useLocation();

  const [contents, setContents] = useState([]);

  //필터와 카테고리를 관리하는 State
  const [filter, setFilter] = useState(state.filter || '기본순');
  const [category, setCategory] = useState('카테고리');

  const [filterModal, setFilterModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  //무한 스크롤을 관리하는 State
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState(null);

  //선택 게시글 불러오기
  const getScrollSelect = useCallback(async () => {
    try {
      if (filter === '인기순') {
        const { data } = await instance.get(`/select/filter?page=${page}`);
        setContents((prev) => [...prev, ...data.data]);
      } else if (category && category !== '카테고리') {
        const { data } = await instance.get(
          `/select/category/${category}?page=${page}`,
        );
        setContents((prev) => [...prev, ...data.result]);
      } else if (filter === '기본순' || category === '카테고리') {
        const { data } = await instance.get(`/select?page=${page}`);
        setContents((prev) => [...prev, ...data.result]);
      }
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  }, [filter, category, page]);

  useEffect(() => {
    getScrollSelect();
  }, [getScrollSelect]);

  //지정한 대상이 관찰되면 page를 1 올려주고 대상을 해제한다.
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
      observer.unobserve(entry.target);
    }
  };

  //매번 갱신되기 전 마지막 게시글에 붙어있는 ref를 감시하라고 지정해준다
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(ref);
    }
    return () => observer?.disconnect();
  }, [ref]);

  //필터 핸들러
  const filterHandler = (event) => {
    if (filter !== event.target.getAttribute('value')) {
      setFilter(event.target.getAttribute('value'));
      setCategory('카테고리');
      setContents([]);
      setPage(1);
    }
  };

  //필터 셀렉트 박스 토글
  const filterOpenHandler = () => {
    setFilterModal((prev) => !prev);
    setCategoryModal(false);
  };

  //카테고리 핸들러
  const categoryHandler = (event) => {
    if (category !== event.target.getAttribute('value')) {
      setCategory(event.target.getAttribute('value'));
      setFilter('기본순');
      setContents([]);
      setPage(1);
    }
  };

  //카테고리 셀렉트 박스 토글
  const categoryOpenHandler = () => {
    setCategoryModal((prev) => !prev);
    setFilterModal(false);
  };

  return (
    <>
      <StFilterDiv length={contents.length}>
        <StFilter onClick={filterOpenHandler}>
          <span>{filter}</span>
          <StArrowIcon>
            <img src={IconDropdown} alt="IconDropdown" />
          </StArrowIcon>
          <StFilterModal setter={filterModal}>
            {FILTER_ARR.map((item) => (
              <span key={item} value={item} onClick={filterHandler}>
                {item}
              </span>
            ))}
          </StFilterModal>
        </StFilter>

        <StFilter onClick={categoryOpenHandler}>
          <span>{category}</span>
          <StArrowIcon>
            <img src={IconDropdown} alt="IconDropdown" />
          </StArrowIcon>
          <StCategoryModal setter={categoryModal}>
            {CATEGORY_ARR.map((item) => (
              <span key={item} value={item} onClick={categoryHandler}>
                {item}
              </span>
            ))}
          </StCategoryModal>
        </StFilter>
      </StFilterDiv>

      <BodyPadding>
        <SelectContentBox contents={contents} setRef={setRef} filter={filter} />
      </BodyPadding>
    </>
  );
};

export default MainSelect;

const StFilterDiv = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  position: fixed;
  top: 6.4rem;

  display: flex;
  align-items: center;
  gap: 2.9rem;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.bg};

  border-bottom: ${(props) =>
    props.length ? null : `1px solid ${props.theme.sub4}`};

  z-index: 9;
`;

const StFilter = styled.div`
  display: flex;
  align-items: center;

  span {
    ${fontMedium}
    color: ${({ theme }) => theme.sub2};
  }
`;

const StFilterModal = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    top: 4.3rem;
  }

  position: fixed;
  top: 10.8rem;

  display: flex;
  flex-direction: column;

  transform-origin: center top;
  transition-duration: 0.1s;
  transform: scaleY(${(props) => (props.setter ? 1 : 0)});

  background-color: #fff;

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);
  border-radius: 1rem;

  span {
    display: block;

    height: 3rem;
    padding: 0 1.5rem;

    line-height: 3rem;
  }
`;

const StCategoryModal = styled(StFilterModal)`
  transform: scaleY(${(props) => (props.setter ? 1 : 0)});
`;

const StArrowIcon = styled.div`
  ${IconSmall};

  img {
    width: 2rem;
    height: 2rem;
  }
`;
