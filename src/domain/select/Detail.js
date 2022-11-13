import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import instance from "app/module/instance";
import { cleanUpError } from "app/module/voteSlice";
import { writeCommentThunk } from "app/module/commentSlice";

import Header from "common/components/Header";
import BodyPadding from "common/components/BodyPadding";
import Vote from "domain/select/components/Vote";
import Comment from "domain/select/components/comment";
import ProfileImg from "common/elements/ProfileImg";
import { ModalBasic, ModalDelete, ModalLogin } from "common/components/Modal";

import { remainedTime } from "shared/utils/timeCalculation";

import { fontExtraBold, fontLarge, fontMedium } from "shared/themes/textStyle";
import { IconLarge, IconSmall } from "shared/themes/iconStyle";

import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconDelete from "static/icons/Variety=delete, Status=untab, Size=L.svg";
import IconTimeWarning from "static/icons/Variety=Time warning, Status=untab, Size=S.svg";
import IconTimeOver from "static/icons/Variety=Timeover, Status=Untab, Size=S.svg";
import IconSend from "static/icons/Variety=send, Status=untab, Size=L.svg";

import styled from "styled-components";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const content = useSelector((state) => state.select.select);
  const error = useSelector((state) => state.vote.error);
  const user = useSelector((state) => state);

  const { selectKey } = useParams();
  const userKey = localStorage.getItem("userKey");

  const [modal, setModal] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [writeComment, setWriteComment] = useState({
    comment: "",
  });

  useEffect(() => {
    setLoginModal(error);
  }, [error]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(__getDetailSelect(selectKey));

    return () => {
      // dispatch(cleanUp());
    };
  }, [dispatch, selectKey]);

  //투표 게시글 DELETE API
  const deleteHandler = async () => {
    try {
      await instance.delete(`/select/${selectKey}`);
      if (state?.now === "select" || state?.now === false) {
        navigate("/main", { state: { now: "select" }, replace: true });
      } else {
        navigate(-1, { replace: true });
      }
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  //뒤로가기 버튼
  const goBackHandler = () => {
    if (state?.now === "select" || state?.now === false) {
      navigate("/main", {
        state: {
          now: "select",
          filter: state.filter,
          category: state.category,
          proceeding: state.proceeding,
        },
      });
    } else {
      navigate(-1);
    }
  };

  const onChangeHandler = (event) => {
    const { value, name } = event.target;
    setWriteComment({ ...setWriteComment, [name]: value });
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    if (writeComment.comment.length >= 2) {
      dispatch(
        writeCommentThunk({
          ...writeComment,
          selectKey,
        }),
      );
    } else if (
      writeComment.comment.length > 0 &&
      writeComment.comment.length < 2 &&
      localStorage.getItem("accessToken") !== null
    ) {
      setModal("최소 2글자 입력하세요.");
    }
    setWriteComment({
      comment: "",
    });
    if (localStorage.getItem("accessToken") === null) {
      setLoginModal(true);
    }
    if (writeComment.comment === "" && localStorage.getItem("accessToken") !== null) {
      setModal("내용을 입력해주세요.");
    }
  };

  return (
    <>
      {deleteModal && <ModalDelete setter={() => setDeleteModal(false)} del={deleteHandler} />}

      {modal && <ModalBasic setter={() => setModal("")}>{modal}</ModalBasic>}

      {loginModal && (
        <ModalLogin
          login={() => {
            navigate("/login");
            dispatch(cleanUpError());
          }}
          setter={() => {
            setLoginModal(false);
            dispatch(cleanUpError());
          }}
        />
      )}

      <Header>
        <StHeaderIcon onClick={goBackHandler}>
          <img src={IconBack} alt="IconBack" />
        </StHeaderIcon>
        {parseInt(userKey) === content?.userKey && (
          <StHeaderIcon onClick={() => setDeleteModal(true)}>
            <img src={IconDelete} alt="IconDelete" />
          </StHeaderIcon>
        )}
      </Header>

      <BodyPadding>
        <StInfoWrap>
          <ProfileImg point={content.point} />

          <StNickname>{content.nickname}</StNickname>

          <StCategory>{content.category}</StCategory>

          <StTitle>{content.title}</StTitle>

          <StDeadLine>
            {content.completion ? (
              <>
                <StIcon>
                  <img src={IconTimeOver} alt="IconTimeOver" />
                </StIcon>
                <span className="timeover">투표마감</span>
              </>
            ) : (
              <>
                <StIcon>
                  <img src={IconTimeWarning} alt="IconTimeWarning" />
                </StIcon>
                <span className="deadline">{remainedTime(content.deadLine)}</span>
              </>
            )}
          </StDeadLine>

          <Vote content={content} selectKey={selectKey} />

          <Comment content={content} user={user} />
        </StInfoWrap>
      </BodyPadding>

      <form onSubmit={onClickSubmit}>
        <WriteBox>
          <Write
            type="text"
            placeholder="더 좋은 의견을 남겨주세요."
            name="comment"
            onChange={onChangeHandler}
            maxLength="50"
            value={writeComment.comment}
          />
          <SubmitButton onClick={onClickSubmit}>
            <img src={IconSend} alt="IconSend" />
          </SubmitButton>
        </WriteBox>
      </form>
    </>
  );
};

export default Detail;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StInfoWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    width: ${({ theme }) => theme.style.width};
    min-height: 100%;
    padding: 6.4rem 2rem 0 2rem;
  }

  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 6.4rem;
  background-color: ${({ theme }) => theme.bg};
`;

const StNickname = styled.div`
  margin-top: 0.2rem;

  ${fontMedium}
  line-height: 2.1rem;
  color: ${({ theme }) => theme.sub2};
`;

const StCategory = styled.div`
  padding: 0 0.4rem;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.main2};

  border-radius: calc(2.1rem / 2);

  ${fontMedium};
  line-height: 2.1rem;
  color: ${({ theme }) => theme.white};
`;

const StTitle = styled.div`
  width: 100%;
  margin: 0.8rem 2rem;

  ${fontLarge};
  ${fontExtraBold};
  line-height: 3rem;
  text-align: center;

  word-wrap: break-word;
  word-break: break-all;
`;

const StDeadLine = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;

  margin-top: 0.8rem;

  ${fontMedium};

  .deadline {
    color: ${({ theme }) => theme.warning};
  }

  .timeover {
    color: ${({ theme }) => theme.sub2};
  }
`;

const StIcon = styled.div`
  ${IconSmall};
`;

const WriteBox = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    width: ${({ theme }) => theme.style.width};
  }

  position: fixed;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  height: 8.8rem;
  padding: 0.8rem;
  background-color: ${({ theme }) => theme.bg};

  z-index: 9;
`;

const Write = styled.input`
  width: 100%;
  padding: 1.75rem 10rem 1.75rem 2rem;

  border-radius: 20px;
  border: 0 solid black;

  resize: none;
`;

const SubmitButton = styled.div`
  position: fixed;
  bottom: 3.6rem;
  right: 3.2rem;
`;
