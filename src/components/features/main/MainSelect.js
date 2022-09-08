import React, { useEffect, useState } from 'react';

import instance from '../../../app/module/instance';

import BodyPadding from '../../common/BodyPadding';
import SelectContentBox from '../../common/SelectContentBox';

import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/Array';

import { fontMedium } from '../../../shared/themes/textStyle';

import styled from 'styled-components';
import { IconSmall } from '../../../shared/themes/iconStyle';

const MainSelect = () => {
  const [contents, setContents] = useState([]);
  const [modal, setModal] = useState('');

  //필터와 카테고리를 관리하는 State
  const [filter, setFilter] = useState('기본순');
  const [category, setCategory] = useState('카테고리');

  const [filterModal, setFilterModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);

  //무한 스크롤을 관리하는 State
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState(null);

  //선택 게시글 불러오기
  const getScrollSelect = async () => {
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
      setModal(error.response.data.errMsg);
      console.log(error.response.data.errMsg);
    }
  };

  useEffect(() => {
    getScrollSelect();
  }, [filter, category, page]);

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

  //카테고리 핸들러
  const categoryHandler = (event) => {
    if (category !== event.target.getAttribute('value')) {
      setCategory(event.target.getAttribute('value'));
      setFilter('기본순');
      setContents([]);
      setPage(1);
    }
  };

  const filterOpenHandler = () => {
    setFilterModal((prev) => !prev);
    setCategoryModal(false);
  };

  const categoryOpenHandler = () => {
    setCategoryModal((prev) => !prev);
    setFilterModal(false);
  };

  return (
    <>
      <StFilterDiv>
        <StFilter onClick={filterOpenHandler}>
          <span>{filter}</span>
          <StArrowIcon></StArrowIcon>
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
          <StArrowIcon></StArrowIcon>
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
        <StMainWrap>
          <SelectContentBox contents={contents} setRef={setRef} />
        </StMainWrap>
      </BodyPadding>
    </>
  );
};

export default MainSelect;

const StMainWrap = styled.div`
  margin-top: 13rem;
  margin-bottom: 8.4rem;
`;

const StFilterDiv = styled.div`
  position: fixed;
  top: 6.4rem;

  display: flex;
  align-items: center;
  gap: 2.9rem;

  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  background-color: #f5f5f5;
`;

const StFilter = styled.div`
  display: flex;
  align-items: center;

  span {
    ${fontMedium}
  }
`;

const StFilterModal = styled.div`
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
    padding: 0 1rem;

    line-height: 3rem;
  }
`;

const StCategoryModal = styled(StFilterModal)`
  transform: scaleY(${(props) => (props.setter ? 1 : 0)});
`;

const StArrowIcon = styled.div`
  ${IconSmall};
  background-color: green;
`;
