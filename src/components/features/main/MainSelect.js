import React, { useEffect, useState } from 'react';

import instance from '../../../app/module/instance';

import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/Array';

import { fontMedium } from '../../../shared/themes/textStyle';

import styled from 'styled-components';
import SelectContentBox from '../../common/SelectContentBox';

const MainSelect = () => {
  const [contents, setContents] = useState([]);
  const [modal, setModal] = useState('');

  //필터와 카테고리를 관리하는 State
  const [filter, setFilter] = useState('기본순');
  const [category, setCategory] = useState('카테고리');

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
      } else {
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
    setFilter(event.target.value);
    setCategory('카테고리');
    setContents([]);
    setPage(1); //page도 바꿔줘야 필터를 바꿨을때 제대로 작동한다
  };

  //카테고리 핸들러
  const categoryHandler = (event) => {
    setCategory(event.target.value);
    setFilter('기본순');
    setContents([]);
    setPage(1);
  };

  return (
    <StMainWrap>
      <StFilterDiv>
        <select onChange={filterHandler} value={filter}>
          {FILTER_ARR.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select onChange={categoryHandler} value={category}>
          <option>카테고리</option>
          {CATEGORY_ARR.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </StFilterDiv>

      <SelectContentBox contents={contents} setRef={setRef} />
    </StMainWrap>
  );
};

export default MainSelect;

const StMainWrap = styled.div`
  margin-top: 8.5rem;
  margin-bottom: 8.4rem;
`;

const StFilterDiv = styled.div`
  display: flex;
  gap: 2.9rem;

  width: 100%;
  margin: 2.19rem 0;

  select {
    background-color: transparent;

    border: none;

    ${fontMedium}
    &:focus {
      outline-style: none;
    }
  }

  option {
    ${fontMedium}
  }
`;
