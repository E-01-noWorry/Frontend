import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../app/module/instance';
import { cleanUp, __getDetailSelect } from '../app/module/selectSlice';
import Vote from '../components/features/vote/Vote';

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const content = useSelector((state) => state.select.select);

  const { selectKey } = useParams();
  const userKey = localStorage.getItem('userKey');

  useEffect(() => {
    dispatch(__getDetailSelect(selectKey));
    return () => {
      dispatch(cleanUp());
    };
  }, [dispatch, selectKey]);

  //투표 게시글 DELETE API
  const deleteHandler = async () => {
    try {
      await instance.delete(`/select/${selectKey}`);
      navigate('/', { state: 'select' });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => navigate(-1)}>뒤로 가기</button>
        {parseInt(userKey) === content?.userKey ? (
          <button onClick={deleteHandler}>삭제</button>
        ) : null}
        <div>캐릭터 이미지</div>
        <div>{content.nickname}</div>
        <div>{content.category}</div>
        <h1>{content.title}</h1>
        <div>{content.deadLine}</div>
        <Vote content={content} selectKey={selectKey} userKey={userKey} />
      </div>
    </div>
  );
};

export default Detail;
