import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import BasicModal from "common/components/modal/BasicModal";
import useModalState from "common/hooks/useModalState";

import { userStorage } from "shared/utils/localStorage";
import { detectInAppBrowser, detectIphone } from "shared/utils/deviceDetector";
import { fontExtraBold, fontMedium } from "shared/themes/textStyle";

import Logo from "static/images/Logo.svg";
import styled from "styled-components";
import Layout from "common/components/Layout";

const Start = () => {
  const navigate = useNavigate();
  const [modal, handleModal] = useModalState(false);

  useEffect(() => {
    if (detectInAppBrowser(window.navigator.userAgent)) {
      //인앱일때
      //1. 아이폰이면 인앱 브라우저는 지원이 안된다는 모달을 띄워줍니다
      //2. 안드로이드라면 크롬으로 우회합니다
      if (detectIphone(window.navigator.userAgent)) {
        handleModal();
      } else {
        window.location.href =
          "intent://www.gomgom.site#Intent;scheme=http;package=com.android.chrome;end)";
      }
    } else {
      //인앱이 아닐때
      //1. 로그인 상태라면 메인 화면으로 이동합니다
      //2. 비로그인 상태라면 온보딩 화면으로 이동합니다
      setTimeout(() => {
        if (userStorage.getToken()) {
          navigate("/select");
        } else navigate("/welcome");
      }, 1000);
    }
  }, [navigate, handleModal]);

  return (
    <>
      {modal && (
        <BasicModal handleClick={handleModal}>
          <span>
            아쉽게도 인앱브라우저는 지원이 안됩니다. <br />
            Safari 또는 Chrome으로 접속해주세요!
          </span>
        </BasicModal>
      )}

      <Layout>
        <S.Logo>
          <img src={Logo} alt="Logo" />
          <span>같이 고민해요, 곰곰</span>
        </S.Logo>
      </Layout>
    </>
  );
};

const S = {
  Logo: styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;

    span {
      ${fontMedium};
      ${fontExtraBold};
      color: ${({ theme }) => theme.main2};
    }
  `,
};

export default Start;
