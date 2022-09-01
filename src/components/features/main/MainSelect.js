import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  cleanUp,
  __getAllSelect,
  __getScrollSelect,
} from '../../../app/module/selectSlice';
import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/array';
import styled from 'styled-components';

const MainSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contents = useSelector((state) => state.select.selects);

  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');

  const getAllSelect = useCallback(() => {
    dispatch(__getAllSelect());
  }, [dispatch]);

  useEffect(() => {
    getAllSelect();

    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, getAllSelect]);

  ////////////////////////////////////////////////////////////////////
  //무한 스크롤 부분
  // const [page, setPage] = useState(1);
  // const [ref, setRef] = useState(null);

  // const onIntersect = ([entry], observer) => {
  //   if (entry.isIntersecting) {
  //     setPage((prev) => prev + 1);
  //     observer.unobserve(entry.target);
  //   }
  // };

  // const defaultOption = {
  //   root: null,
  //   rootMargin: '80px',
  //   threshold: 0.5,
  // };

  // useEffect(() => {
  //   let observer;
  //   if (ref) {
  //     observer = new IntersectionObserver(onIntersect, defaultOption);
  //     observer.observe(ref);
  //   }
  //   return () => observer?.disconnect();
  // }, [ref]);

  // const getScrollSelect = useCallback(() => {
  //   dispatch(__getScrollSelect(page));
  // });

  // useEffect(() => {
  //   getScrollSelect();
  // }, [page]);
  ////////////////////////////////////////////////////////////////////

  return (
    <>
      <div>
        <h1>로고</h1>
        <div>알람 아이콘</div>
      </div>
      <div>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          {FILTER_ARR.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option>카테고리</option>
          {CATEGORY_ARR.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {contents.map((content) => (
        <StContentBox
          key={content?.selectKey}
          onClick={() => navigate(`/detail/${content?.selectKey}`)}
        >
          <div>
            <span>{content?.category}</span>
            <span>{content?.total || 0}명이 참여중</span>
          </div>
          <h1>{content?.title}</h1>
          <span>{content?.options.join(' vs ')}</span>
          <div>
            <span>작성자 {content?.nickname}</span>
            <span>{content?.deadLine}</span>
          </div>
        </StContentBox>
      ))}
      {/* <p ref={setRef}>더보기</p> */}
    </>
  );
};

export default MainSelect;

const StContentBox = styled.div`
  width: 30rem;
  height: 20rem;
  border: 1px solid red;
`;
