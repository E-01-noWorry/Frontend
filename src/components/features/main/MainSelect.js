import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import instance from '../../../app/module/instance';

import BodyPadding from '../../common/BodyPadding';
import SelectContentBox from '../../common/SelectContentBox';

import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/Array';

import { fontMedium } from '../../../shared/themes/textStyle';
import { IconMedium, IconSmall } from '../../../shared/themes/iconStyle';

import IconDropdown from '../../../static/icons/Variety=Dropdown, Status=untab, Size=S.svg';
import IconSearch from '../../../static/icons/Variety=search, Status=untab, Size=M.svg';

import styled from 'styled-components';
import { ModalBasic } from '../../common/Modal';

const MainSelect = () => {
  const { state } = useLocation();

  const [contents, setContents] = useState([]);

  //필터와 카테고리를 관리하는 State
  const [filter, setFilter] = useState(state.filter || '기본순');
  const [category, setCategory] = useState(state.category || '카테고리');
  const [proceeding, setProceeding] = useState(state.proceeding || '모든 투표');

  const [modal, setModal] = useState('');
  const [filterModal, setFilterModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [proceedingModal, setProceedingModal] = useState(false);

  const [search, setSearch] = useState(false);
  const searchRef = useRef();

  //무한 스크롤을 관리하는 State
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState(null);

  //선택 게시글 불러오기
  const getScrollSelect = useCallback(async () => {
    try {
      if (proceeding !== '모든 투표') {
        const { data } = await instance.get(`/select/ongoing?page=${page}`);
        setContents((prev) => [...prev, ...data.result]);
      } else if (filter === '인기순') {
        const { data } = await instance.get(`/select/filter?page=${page}`);
        setContents((prev) => [...prev, ...data.data]);
      } else if (category && category !== '카테고리') {
        const { data } = await instance.get(
          `/select/category/${category}?page=${page}`,
        );
        setContents((prev) => [...prev, ...data.result]);
      } else {
        const { data } = await instance.get(`/select?page=${page}`);
        setContents((prev) => [...prev, ...data.result]);
      }
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  }, [proceeding, filter, category, page]);

  useEffect(() => {
    if (search) return;

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

  //고민 채팅방 키워드 검색
  const searchHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await instance.get(
        `/select/search?searchWord=${searchRef.current.value}`,
      );
      setSearch(true);
      setContents([...data.result]);
    } catch (error) {
      setModal(error.response.data.errMsg);
    }
    searchRef.current.value = '';
  };

  //고민 채팅방 검색 취소버튼
  const searchCancelHandler = () => {
    searchRef.current.value = '';
    if (search) {
      setContents([]);
      setPage(1);
      setSearch(false);
    }
  };

  //필터 핸들러
  const filterHandler = (event) => {
    if (filter !== event.target.getAttribute('value')) {
      setFilter(event.target.getAttribute('value'));
      setProceeding('모든 투표');
      setCategory('카테고리');
      setContents([]);
      setPage(1);
    }
  };

  //필터 셀렉트 박스 토글
  const filterOpenHandler = () => {
    setFilterModal((prev) => !prev);
    setCategoryModal(false);
    setProceedingModal(false);
  };

  //카테고리 핸들러
  const categoryHandler = (event) => {
    if (category !== event.target.getAttribute('value')) {
      setCategory(event.target.getAttribute('value'));
      setProceeding('모든 투표');
      setFilter('기본순');
      setContents([]);
      setPage(1);
    }
  };

  //카테고리 셀렉트 박스 토글
  const categoryOpenHandler = () => {
    setCategoryModal((prev) => !prev);
    setFilterModal(false);
    setProceedingModal(false);
  };

  //진행 중인 투표만 보기 핸들러
  const proceedingHandler = (event) => {
    if (proceeding !== event.target.getAttribute('value')) {
      setProceeding(event.target.getAttribute('value'));
      setFilter('기본순');
      setCategory('카테고리');
      setContents([]);
      setPage(1);
    }
  };

  const proceedingOpenHandler = () => {
    setProceedingModal((prev) => !prev);
    setCategoryModal(false);
    setFilterModal(false);
  };

  return (
    <>
      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      <StSearchWrap>
        <form onSubmit={searchHandler}>
          <input
            maxLength={10}
            placeholder="고민 투표/제목 검색(10자 이내)"
            ref={searchRef}
          />
          <div onClick={searchHandler}>
            <img src={IconSearch} alt="IconSearch" />
          </div>
        </form>
        <StCancel onClick={searchCancelHandler}>취소</StCancel>
      </StSearchWrap>

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

        <StFilter onClick={proceedingOpenHandler}>
          <span>{proceeding}</span>
          <StArrowIcon>
            <img src={IconDropdown} alt="IconDropdown" />
          </StArrowIcon>
          <StCategoryModal setter={proceedingModal}>
            {['모든 투표', '진행중인 투표'].map((item) => (
              <span key={item} value={item} onClick={proceedingHandler}>
                {item}
              </span>
            ))}
          </StCategoryModal>
        </StFilter>
      </StFilterDiv>

      <BodyPadding>
        <SelectContentBox
          contents={contents}
          setRef={setRef}
          filter={filter}
          category={category}
          proceeding={proceeding}
        />
      </BodyPadding>
    </>
  );
};

export default MainSelect;

const StSearchWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  position: fixed;
  top: 6.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.bg};

  z-index: 9;

  form {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      height: 4rem;
      padding: 0 1.5rem;
      background-color: ${({ theme }) => theme.white};

      border: none;
      border-radius: 2rem;

      &:focus {
        outline: none;
      }
    }

    div {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      ${IconMedium};

      cursor: pointer;
    }
  }
`;

const StCancel = styled.div`
  width: 3rem;

  ${fontMedium}

  cursor: pointer;
`;

const StFilterDiv = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  position: fixed;
  top: 12.8rem;

  display: flex;
  align-items: flex-start;
  gap: 2.5rem;

  width: 100%;
  height: 4.2rem;
  padding: 0.4rem 2rem 0 2rem;
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

  cursor: pointer;
`;

const StFilterModal = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    top: 3rem;
  }

  position: fixed;
  top: 16rem;

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

    &:hover,
    &:active {
      color: ${({ theme }) => theme.main2};
    }
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
