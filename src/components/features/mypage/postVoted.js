import React, { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../../app/module/instance';
import { postVotedThunk } from '../../../app/module/myPageSlice';

const PostVoted = () => {
  const dispatch = useDispatch();
  const PostInfo = useSelector((state) => state.myPageSlice);
  console.log(PostInfo.data);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [ref, inView] = useInView();

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    dispatch(postVotedThunk({ page, loading: inView }));
  }, [page]);
  console.log(`page=${page}`);
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading && PostInfo?.data[page - 1]?.length !== 0) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <>
      <div ref={ref}>dhdl</div>
      <div
        style={{ width: '200px', height: '1000px', border: '1px solid black' }}
      >
        {/* {PostInfo?.data?.map((a, b) => (
          <div key={a.selectKey}>{a.title}</div>
        ))} */}
      </div>
    </>
  );
};
export default PostVoted;
