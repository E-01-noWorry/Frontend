import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import BasicModal from "components/common/modal/BasicModal";
import LoginModal from "components/common/modal/LoginModal";
import LogoutModal from "components/features/mypage/LogoutModal";
import UserDeleteModal from "components/features/mypage/UserDeleteModal";

import Layout from "components/common/Layout";
import UserContainer from "components/features/mypage/UserContainer";
import GradeContainer from "components/features/mypage/GradeContainer";
import LoginContainer from "components/features/mypage/LoginContainer";
import MyService from "components/features/mypage/MyService";
import GradeInfo from "components/features/mypage/GradeInfo";
import Logout from "components/features/mypage/Logout";
import Nav from "components/common/Nav";

import useGetMyInfo from "hooks/useGetMyInfo";
import useModalState from "hooks/useModalState";
import { userStorage } from "shared/utils/localStorage";

import { fontExtraBold, fontLarge } from "shared/themes/textStyle";
import styled from "styled-components";

const MyPage = () => {
  const { pathname } = useLocation();

  const myInfo = useGetMyInfo();

  const [modal, handleModal, message] = useModalState(false);
  const [loginModal, handleLoginModal] = useModalState(false);
  const [logoutModal, handleLogoutModal] = useModalState(false);
  const [userDeleteModal, handleUserDeleteModal] = useModalState(false);

  const [selectedGrade, setSelectedGrade] = useState(0);
  const handleSelectGrade = (idx) => {
    setSelectedGrade(idx + 1);
  };

  return (
    <>
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {logoutModal && <LogoutModal handleClick={handleLogoutModal} />}
      {userDeleteModal && (
        <UserDeleteModal handleClick={handleUserDeleteModal} handleModal={handleModal} />
      )}

      <Layout>
        <S.HeaderTop>
          {userStorage.getToken() ? (
            <UserContainer myInfo={myInfo} handleModal={handleModal} />
          ) : (
            <h1>
              로그인하고 곰곰의 <br />
              고민해결 서비스를 경험해보세요.
            </h1>
          )}
        </S.HeaderTop>

        <S.HeaderBottom>
          {userStorage.getToken() ? (
            <GradeContainer
              myInfo={myInfo}
              selectedGrade={selectedGrade}
              handleSelectGrade={handleSelectGrade}
            />
          ) : (
            <LoginContainer />
          )}
        </S.HeaderBottom>

        {userStorage.getToken() && <GradeInfo selectedGrade={selectedGrade} />}

        <MyService
          handleLoginModal={handleLoginModal}
          handleUserDeleteModal={handleUserDeleteModal}
        />

        {userStorage.getToken() && <Logout handleLogoutModal={handleLogoutModal} />}
      </Layout>

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  HeaderTop: styled.section`
    display: flex;
    align-items: center;

    margin: 0 -2rem;
    padding: 0 2rem;
    height: 11.3rem;
    background-color: ${({ theme }) => theme.white};

    h1 {
      ${fontLarge};
      ${fontExtraBold};
      line-height: 3rem;
    }
  `,

  HeaderBottom: styled.section`
    margin: 0 -2rem;
    padding: 0 2rem 2.4rem 2rem;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0 0 2rem 2rem;
  `,
};

export default MyPage;
