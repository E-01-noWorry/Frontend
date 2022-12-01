import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import instance from "app/module/instance";
import axios from "axios";

import BasicModal from "common/components/modal/BasicModal";
import Loading from "common/components/Loading";
import Layout from "common/components/Layout";
import GlobalInput from "common/elements/GlobalInput";
import GlobalButton from "common/elements/GlobalButton";

import useModalState from "common/hooks/useModalState";
import { userStorage } from "shared/utils/localStorage";

import { fontBold, fontLarge, fontMedium, fontSmall } from "shared/themes/textStyle";
import styled from "styled-components";

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [nickname, setNickname] = useState("");

  const [modal, handleModal, message] = useModalState(false);
  const [sucessModal, handleSucessModal] = useModalState(false);

  const kakaoLogin = useCallback(async () => {
    try {
      const { data } = await instance.get(`/auth/kakao/callback?code=${code}`);
      userStorage.setStorage(data.user);

      if (data.user.nickname !== "") {
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    kakaoLogin();
  }, [kakaoLogin]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleClickEdit = async () => {
    try {
      const { data } = await instance.put("/user/nickname", nickname);
      userStorage.setNickname(data.nickname);
      handleSucessModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleModal((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  };

  const handleClickSuccess = () => {
    handleSucessModal();
    window.location.replace("/");
  };

  return userStorage.getNickname() ? (
    <Loading />
  ) : (
    <>
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}

      {sucessModal && (
        <BasicModal handleClick={handleClickSuccess}>닉네임 설정에 성공했습니다.</BasicModal>
      )}

      <Layout>
        <S.Container>
          <S.Title>닉네임을 설정해주세요.</S.Title>
          <S.SubTitle>닉네임 설정 완료 시 메인 페이지로 이동합니다.</S.SubTitle>

          <S.EditContainer>
            <GlobalInput
              type="text"
              placeholder="닉네임을 입력해주세요"
              maxLength={12}
              value={nickname}
              onChange={handleOnChange}
            />

            <GlobalButton onClick={handleClickEdit}>등록</GlobalButton>
          </S.EditContainer>

          <S.HelpText>*익명으로 안심하고 고민을 이야기할 수 있어요.</S.HelpText>
          <S.HelpText>*닉네임은 마이페이지에서 변경이 가능합니다.</S.HelpText>
        </S.Container>
      </Layout>
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-height: 100vh;
  `,

  Title: styled.h1`
    ${fontLarge};
    ${fontBold};
    line-height: 3rem;
  `,

  SubTitle: styled.span`
    ${fontMedium};
    line-height: 2.1rem;
  `,

  EditContainer: styled.div`
    display: grid;
    grid-template-columns: auto 10rem;
    gap: 0.8rem;

    width: 100%;
    margin-top: 2.4rem;
  `,

  HelpText: styled.span`
    width: 100%;
    margin-top: 0.8rem;
    margin-left: 2rem;

    ${fontSmall};
    color: ${({ theme }) => theme.color.sub2};
    line-height: 1.2rem;
    text-align: left;
  `,
};

export default KakaoRedirect;
