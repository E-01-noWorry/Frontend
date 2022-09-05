import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../../app/module/instance';
import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/Array';
import styled from 'styled-components';
import {
  fontBold,
  fontExtraBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';
import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { remainedTime } from '../../../shared/timeCalculation';

const MainSelect = () => {
  const navigate = useNavigate();
  const [contents, setContents] = useState([]);

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
        setContents([...contents, ...data.data]);
      } else if (category && category !== '카테고리') {
        const { data } = await instance.get(
          `/select/category/${category}?page=${page}`,
        );
        setContents([...contents, ...data.result]);
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
  }, [category, filter, page]);

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
    <>
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

      <StContentBoxWrap>
        {contents?.map((content, idx) => (
          <StContentBox
            key={content.selectKey}
            onClick={() => navigate(`/detail/${content.selectKey}`)}
            //마지막 게시글에 ref를 달아준다
            ref={idx === contents.length - 1 ? setRef : null}
          >
            <StContentInner>
              <StInnerCategory>{content.category}</StInnerCategory>
              <StInnerCurrent>
                {content.total || 0}명이 투표 참여중
              </StInnerCurrent>
            </StContentInner>
            <StInnerTitle>{content.title}</StInnerTitle>
            <StInnerOption>{content.options?.join(' vs ')}</StInnerOption>
            <StContentInner style={{ marginTop: '32px' }}>
              <StInnerNickname>
                작성자 <span>{content.nickname}</span>
              </StInnerNickname>
              <StInnerTime>
                남은시간 {remainedTime(content.deadLine)}
              </StInnerTime>
            </StContentInner>
          </StContentBox>
        ))}
      </StContentBoxWrap>
    </>
  );
};

export default MainSelect;

const StFilterDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 2.19rem 0;
  gap: 2.9rem;

  select {
    ${fontMedium}

    border: none;
    background-color: transparent;

    &:focus {
      outline-style: none;
    }
  }

  option {
    ${fontMedium}
  }
`;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const StContentBox = styled.div`
  ${borderBoxDefault};
  height: 100%;
  align-items: flex-start;
  padding: 1.6rem;

  background-color: #fff;

  &:hover,
  &:active {
    background-color: #d4d4d4;
  }
`;

const StContentInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const StInnerCategory = styled.div`
  ${fontSmall}
  line-height: 1.95rem;

  height: 2rem;
  padding: 0 0.5rem;
  border-radius: 1rem;

  background-color: #ececec;
`;

const StInnerCurrent = styled.div`
  ${fontSmall}
  line-height: 2.2rem;

  height: 2rem;
`;

const StInnerTitle = styled.div`
  ${fontExtraBold}
  margin-top: 1rem;
`;

const StInnerOption = styled.div`
  ${fontMedium}
  margin-top: 0.6rem;
`;

const StInnerNickname = styled.div`
  ${fontSmall};

  span {
    ${fontBold};
  }
`;

const StInnerTime = styled.div`
  ${fontSmall};
`;
