import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import instance from "app/module/instance";
import { clearErrorComment, __getComment } from "app/module/commentSlice";

import LoginModal from "common/components/modal/LoginModal";
import DeleteModal from "./components/DeleteModal";
import BasicModal from "common/components/modal/BasicModal";

import Layout from "common/components/Layout";
import Header from "common/components/Header";
import DetailInfo from "./components/DetailInfo";
import DetailVote from "./components/DetailVote";
import Comment from "./components/Comment";
import CommentInput from "./components/CommentInput";

import useModalState from "common/hooks/useModalState";
import { userStorage } from "shared/utils/localStorage";

import { fontMedium } from "shared/themes/textStyle";
import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconDelete from "static/icons/Variety=delete, Status=untab, Size=L.svg";
import styled, { css } from "styled-components";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectKey } = useParams();

  const { data: commentList, error } = useSelector((state) => state.comment);
  const [detailInfo, setDetailInfo] = useState({});
  console.log(commentList);

  const [modal, handleModal, message] = useModalState(false);
  const [loginModal, handleLoginModal] = useModalState(false);
  const [deleteModal, handleDeleteModal] = useModalState(false);

  const __getDetail = useCallback(async () => {
    try {
      const { data } = await instance.get(`/select/${selectKey}`);
      setDetailInfo(data.result);
    } catch (error) {
      handleModal(error.response.data.errMsg);
    }
  }, [selectKey, handleModal]);

  useEffect(() => {
    __getDetail();
  }, [__getDetail]);

  useEffect(() => {
    dispatch(__getComment(selectKey));
  }, [dispatch, selectKey]);

  const __DeleteDetail = async () => {
    try {
      await instance.delete(`/select/${selectKey}`);
      navigate(-1, { replace: true });
    } catch (error) {
      handleModal(error.response.data.errMsg);
    }
  };

  return (
    <>
      {error && <BasicModal handleClick={dispatch(clearErrorComment())}>{error}</BasicModal>}
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {deleteModal && <DeleteModal handleClick={handleDeleteModal} handleDelete={__DeleteDetail} />}

      <Header>
        <img onClick={() => navigate(-1)} src={IconBack} alt="IconBack" />
        <div />
        {userStorage.getUserKey() === detailInfo.userKey && (
          <img onClick={handleDeleteModal} src={IconDelete} alt="IconDelete" />
        )}
      </Header>

      <Layout>
        <S.Container>
          <DetailInfo info={detailInfo} />

          <DetailVote info={detailInfo} selectKey={selectKey} handleLoginModal={handleLoginModal} />

          <S.CommentContainer length={commentList.length}>
            {!commentList.length && <span>댓글이 없습니다.</span>}
            {commentList?.map((comment) => (
              <Comment key={comment.commentKey} comment={comment} handleModal={handleModal} />
            ))}
          </S.CommentContainer>
        </S.Container>
      </Layout>

      <CommentInput
        selectKey={selectKey}
        handleModal={handleModal}
        handleLoginModal={handleLoginModal}
      />
    </>
  );
};

const S = {
  Container: styled.section`
    padding: 6.4rem 0 2rem 0;
  `,

  CommentContainer: styled.section`
    padding-bottom: 6.4rem;
    margin: 0 -2rem;

    ${(props) =>
      !props.length &&
      css`
        border-top: 1px solid ${({ theme }) => theme.sub4};
      `}

    > span {
      display: block;
      width: 100%;
      margin-top: 4rem;

      text-align: center;
      ${fontMedium};
    }
  `,
};
export default Detail;
