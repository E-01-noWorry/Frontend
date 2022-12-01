import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "app/module/instance";

import BasicModal from "common/components/modal/BasicModal";
import Header from "common/components/Header";
import Layout from "common/components/Layout";
import GlobalButton from "common/elements/GlobalButton";

import useModalState from "common/hooks/useModalState";
import { borderBoxDefault } from "shared/themes/boxStyle";
import { fontBold, fontLarge, fontMedium, fontSmall } from "shared/themes/textStyle";

import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import IconErase from "static/icons/Variety=erase, Status=untab, Size=S.svg";
import IconPlus from "static/icons/Variety=plus, Status=untab, Size=XL.svg";
import IconMinus from "static/icons/Variety=minus, Status=untab, Size=XL.svg";
import styled from "styled-components";

const WriteRoom = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [countPeople, setCountPeople] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [keywordArr, setKeywordArr] = useState([]);
  const [roomkey, setRoomkey] = useState(0);

  const [modal, handleModal, message] = useModalState(false);
  const [uploadModal, handleUploadModal, uploadMessage] = useModalState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const keywordHandler = (event) => {
    event.preventDefault();

    if (keywordArr.includes(keyword)) {
      handleModal("중복된 해시태그가 존재합니다.");
    } else if (keyword.trim().length === 0) {
      handleModal("태그를 입력해주세요");
    } else {
      setKeywordArr((prev) => [...prev, keyword.replace(" ", "")]);
    }

    setKeyword("");
  };

  const keywordDeleteHandler = (value) => {
    setKeywordArr((prev) => prev.filter((i) => i !== value));
  };

  const countPlusHandler = () => {
    if (countPeople < 8) {
      setCountPeople((prev) => prev + 1);
    }
  };

  const countMinusHandler = () => {
    if (countPeople > 1) {
      setCountPeople((prev) => prev - 1);
    }
  };

  const submitHandler = async () => {
    const payload = {
      title: title,
      hashTag: keywordArr,
      max: countPeople + 1,
    };

    try {
      const { data } = await instance.post("/room", payload);
      setRoomkey(data.result.roomKey);
      handleUploadModal("고민 상담방 등록 완료!");
    } catch (error) {
      handleModal(error.response.data.errMsg);
    }
  };

  return (
    <>
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}
      {uploadModal && (
        <BasicModal
          handleClick={() => navigate(`/chatroom/${roomkey}`, { state: { now: "/write" } })}
        >
          {uploadMessage}
        </BasicModal>
      )}

      <Header>
        <img onClick={() => navigate(-1)} src={IconBack} alt="IconBack" />
        <h1>채팅방 만들기</h1>
      </Header>

      <Layout>
        <S.Container>
          <S.Title>고민 상담방 이름 작성</S.Title>
          <S.TextContainer>
            <textarea
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={20}
              placeholder="고민 상담방 이름을 작성해주세요."
              style={{ height: "8.9rem" }}
            />
            <span>{title.length}/20자</span>
          </S.TextContainer>

          <S.Title>해시태그 작성</S.Title>
          <S.TextContainer>
            <S.Inner length={keywordArr.length}>
              {keywordArr?.map((item) => (
                <div key={item} onClick={() => keywordDeleteHandler(item)}>
                  <span>#{item}</span>
                  <img src={IconErase} alt="IconErase" />
                </div>
              ))}

              <form onSubmit={keywordHandler}>
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  maxLength={7}
                  placeholder={
                    keywordArr.length === 0
                      ? "태그 작성 후, 엔터를 눌러 등록해주세요.(7자 이내)"
                      : "해시태그 추가"
                  }
                />
              </form>
            </S.Inner>
            <span>{keywordArr.length}/3개</span>
          </S.TextContainer>

          <S.Title>최대 참여 인원수</S.Title>
          <S.SubTitle>본인을 제외한 참여자 인원을 정해주세요 (1~8명)</S.SubTitle>
          <S.CountContainer>
            <S.CountButton onClick={countMinusHandler}>
              <img src={IconMinus} alt="IconMinus" />
            </S.CountButton>
            <div>{countPeople}</div>
            <S.CountButton onClick={countPlusHandler}>
              <img src={IconPlus} alt="IconPlus" />
            </S.CountButton>
          </S.CountContainer>

          <GlobalButton onClick={submitHandler}>만들기</GlobalButton>
        </S.Container>
      </Layout>
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;

    padding: 7.4rem 0 2rem 0;
  `,

  Title: styled.label`
    margin-bottom: 1.6rem;

    ${fontBold};
    line-height: 2.4rem;
  `,

  SubTitle: styled.label`
    margin-top: -1.2rem;

    ${fontMedium};
    line-height: 2.1rem;
    color: ${({ theme }) => theme.sub2};
  `,

  TextContainer: styled.article`
    ${borderBoxDefault};
    position: relative;

    justify-content: flex-start;
    align-items: flex-start;

    height: 100%;
    min-height: 12.1rem;
    padding: 1.6rem;
    margin-bottom: ${(props) => props.mb || "3.2rem"};
    background-color: ${({ theme }) => theme.white};

    textarea {
      width: 100%;
      height: 6.9rem;
      background-color: transparent;

      resize: none;
      border: none;

      &:focus {
        outline: none;
      }
    }

    > span {
      position: absolute;
      top: 8.6rem;
      right: 1.6rem;

      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.sub1};
    }
  `,

  Inner: styled.article`
    display: flex;
    flex-wrap: wrap;
    column-gap: 0.8rem;
    row-gap: 1rem;

    div {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;

      height: 3.2rem;
      padding: 1.1rem 0.7rem 1.1rem 1.1rem;
      background-color: ${({ theme }) => theme.sub4};

      border-radius: 1.6rem;

      span {
        ${fontMedium};
      }
    }

    input {
      display: ${(props) => (props.length >= 3 ? "none" : "block")};

      width: ${(props) => (props.length === 0 ? "210%" : null)};
      height: 3.2rem;
      background-color: transparent;

      border: none;

      &:focus {
        outline: none;
      }
    }
  `,

  CountContainer: styled.article`
    ${borderBoxDefault};

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 7.6rem;
    padding: 1.4rem;
    margin-top: 2rem;
    margin-bottom: 3.2rem;
    background-color: ${({ theme }) => theme.white};

    & > div:nth-child(2) {
      ${fontBold};
      ${fontLarge}
    }
  `,

  CountButton: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 4.8rem;
    height: 4.8rem;
    background-color: ${({ theme }) => theme.sub4};

    border-radius: 1.4rem;

    cursor: pointer;
  `,
};

export default WriteRoom;
