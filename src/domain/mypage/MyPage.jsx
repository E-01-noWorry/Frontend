import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import BasicModal from "common/components/modal/BasicModal";
import LoginModal from "common/components/modal/LoginModal";
import LogoutModal from "domain/mypage/components/LogoutModal";
import UserDeleteModal from "domain/mypage/components/UserDeleteModal";

import Layout from "common/components/Layout";
import UserContainer from "domain/mypage/components/UserContainer";
import GradeContainer from "domain/mypage/components/GradeContainer";
import LoginContainer from "domain/mypage/components/LoginContainer";
import MyService from "domain/mypage/components/MyService";
import GradeInfo from "domain/mypage/components/GradeInfo";
import Logout from "domain/mypage/components/Logout";
import Nav from "common/components/Nav";

import useGetMyInfo from "domain/mypage/hooks/useGetMyInfo";
import useModalState from "common/hooks/useModalState";
import { userStorage } from "shared/utils/localStorage";

import { fontExtraBold, fontLarge } from "shared/themes/textStyle";
import styled from "styled-components";
import GradeInfoModal from "domain/mypage/components/GradeInfoModal";

const MyPage = () => {
  const { pathname } = useLocation();

  const myInfo = useGetMyInfo();

  const [modal, handleModal, message] = useModalState(false);
  const [gradeInfoModal, handleGradeInfoModal] = useModalState(false);
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
      {gradeInfoModal && <GradeInfoModal handleClick={handleGradeInfoModal} />}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {logoutModal && <LogoutModal handleClick={handleLogoutModal} />}
      {userDeleteModal && (
        <UserDeleteModal handleClick={handleUserDeleteModal} handleModal={handleModal} />
      )}

      <Layout>
        <S.MypageContainer>
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
                handleGradeInfoModal={handleGradeInfoModal}
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
        </S.MypageContainer>
      </Layout>

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  MypageContainer: styled.section`
    padding-bottom: 10rem;
  `,

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
