import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanUp, __getAllSelect } from '../../../app/module/selectSlice';
import { FILTER_ARR, CATEGORY_ARR } from '../../../shared/Array';
import styled from 'styled-components';

const MainSelect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contents = useSelector((state) => state.select.selects);

  const getAllSelect = useCallback(() => {
    dispatch(__getAllSelect());
  }, [dispatch]);

  useEffect(() => {
    getAllSelect();
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, getAllSelect]);

  return (
    <>
      <div>
        <h1>로고</h1>
        <div>알람 아이콘</div>
      </div>
      <div>
        <div>기본순</div>
        <div>카테고리</div>
      </div>
      {contents.map((content) => (
        <StContentBox
          key={content?.selectKey}
          onClick={() => navigate(`/detail/${content?.selectKey}`)}
        >
          <h1>{content?.title}</h1>
          <span>{content?.nickname}</span>
          <span>{content?.deadLine}</span>
        </StContentBox>
      ))}
    </>
  );
};

export default MainSelect;

const StContentBox = styled.div`
  width: 30rem;
  height: 5rem;
  border: 1px solid red;
`;
