import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ModalBasic } from "common/components/Modal";

import { userStorage } from "shared/utils/localStorage";
import { detectInAppBrowser, detectIphone } from "shared/utils/deviceDetector";
import { fontExtraBold, fontMedium } from "shared/themes/textStyle";

import Logo from "static/images/Logo.svg";

import styled from "styled-components";

const Start = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (detectInAppBrowser(window.navigator.userAgent)) {
      //인앱일때
      //1. 아이폰이면 인앱 브라우저는 지원이 안된다는 모달을 띄워줍니다
      //2. 안드로이드라면 크롬으로 우회합니다
      if (detectIphone(window.navigator.userAgent)) {
        setModal(true);
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
  }, [navigate]);

  return (
    <>
      {modal && (
        <ModalBasic setter={() => setModal(false)}>
          <span>
            아쉽게도 인앱브라우저는 지원이 안됩니다. <br />
            Safari 또는 Chrome으로 접속해주세요!
          </span>
        </ModalBasic>
      )}

      <StStartWrap>
        <StLogo>
          <img src={Logo} alt="Logo" />
          <span>같이 고민해요, 곰곰</span>
        </StLogo>
      </StStartWrap>
    </>
  );
};

export default Start;

const StStartWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    width: ${({ theme }) => theme.style.width};
    min-height: 100%;
  }

  background-color: ${({ theme }) => theme.bg};
`;

const StLogo = styled.div`
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
`;
