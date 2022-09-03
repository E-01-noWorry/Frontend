import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../app/module/instance';
import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/array';
import styled from 'styled-components';

const MainSelect = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);

  //필터와 카테고리를 관리하는 State
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');

  //무한 스크롤을 관리하는 State
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState(null);

  //선택 게시글 불러오기
  const getScrollSelect = async () => {
    try {
      if (filter === '인기순') {
        const { data } = await instance.get(`/select/filter?page=${page}`);
        setContents([...contents, ...data.data]);
      } else {
        const { data } = await instance.get(`/select?page=${page}`);
        setContents([...contents, ...data.result]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //지정한 대상이 관찰되면 page를 1 올려주고 대상을 해제한다.
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
      observer.unobserve(entry.target);
    }
  };

  useEffect(() => {
    getScrollSelect();
  }, [filter, page]);

  //Intersection Observer API의 기본 옵션 설정
  const defaultOption = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
  };

  //매번 갱신되기 전 마지막 게시글에 붙어있는 ref를 감시하라고 지정해준다
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, defaultOption);
      observer.observe(ref);
    }
    return () => observer?.disconnect();
  }, [ref]);

  //필터가 변경되면 filter값을 바꿔주고 겹침을 방지하기 위해 contents를 빈배열로 바꿔준다
  const filterHandler = (event) => {
    setFilter(event.target.value);
    setContents([]);
  };

  return (
    <>
      <div>
        <select onChange={filterHandler} defaultValue={filter}>
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

      {contents?.map((content, idx) => (
        <StContentBox
          key={content.selectKey}
          onClick={() => navigate(`/detail/${content.selectKey}`)}
          //마지막 게시글에 ref를 달아준다
          ref={idx === contents.length - 1 ? setRef : null}
        >
          <div>
            <span>{content.category}</span>
            <span>{content.total || 0}명이 참여중</span>
          </div>
          <h1>{content.title}</h1>
          <span>{content.options?.join(' vs ')}</span>
          <div>
            <span>작성자 {content.nickname}</span>
            <span>{content.deadLine}</span>
          </div>
        </StContentBox>
      ))}
    </>
  );
};

export default MainSelect;

const StContentBox = styled.div`
  width: 30rem;
  height: 15rem;
  border: 1px solid red;
`;
