import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BodyPadding from '../components/common/BodyPadding';
import Footer from '../components/common/Footer';
import { fontLarge, fontSmall, fontMedium } from '../shared/themes/textStyle';
import { fontExtraBold, fontBold } from '../shared/themes/textStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileImg from '../components/elements/ProfileImg';

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  //티어별 상세정보
  const [white, setWhite] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [green, setGreen] = useState(false);
  const [blue, setBlue] = useState(false);
  const [purple, setPurple] = useState(false);

  const onFocusWhite = () => {
    setWhite((status) => !status);
  };
  const onBlurWhite = () => {
    setWhite((status) => !status);
  };

  const onFocusYellow = () => {
    setYellow((status) => !status);
  };
  const onBlurYellow = () => {
    setYellow((status) => !status);
  };

  const onFocusGreen = () => {
    setGreen((status) => !status);
  };
  const onBlurGreen = () => {
    setGreen((status) => !status);
  };

  const onFocusBlue = () => {
    setBlue((status) => !status);
  };
  const onBlurBlue = () => {
    setBlue((status) => !status);
  };

  const onFocusPurple = () => {
    setPurple((status) => !status);
  };
  const onBlurPurple = () => {
    setPurple((status) => !status);
  };

  //로그인 여부
  const loggined = localStorage.getItem('token');

  //로그아웃
  const onClickLogOut = () => {
    localStorage.clear();
    window.location.reload('/mypage');
  };

  //내가 등록한 고민 투표
  const onClickPosted = () => {};

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {loggined !== null ? (
        <>
          <MyPageHeadContainer>
            <ProfileImg />
            <Badge>Yellow</Badge>
            <Nickname>{localStorage.getItem('nickname')}</Nickname>
          </MyPageHeadContainer>
          <TierInfo>
            <TierLetter>등급 기준 알아보기</TierLetter>
            <Tiers>
              <TierButton autoFocus onFocus={onFocusWhite} onBlur={onBlurWhite}>
                White
              </TierButton>
              <TierButton onFocus={onFocusYellow} onBlur={onBlurYellow}>
                Yellow
              </TierButton>
              <TierButton onFocus={onFocusGreen} onBlur={onBlurGreen}>
                Green
              </TierButton>
              <TierButton onFocus={onFocusBlue} onBlur={onBlurBlue}>
                Blue
              </TierButton>
              <TierButton onFocus={onFocusPurple} onBlur={onBlurPurple}>
                Purple
              </TierButton>
            </Tiers>
          </TierInfo>
          <BodyPadding>
            <TierInfoLetter>
              {white
                ? '최다 득표 투표 항목과 본인 투표 일치가 0~100회 일때'
                : null}
              {yellow
                ? '최다 득표 투표 항목과 본인 투표 일치가 101~200회 일때'
                : null}
              {green
                ? '최다 득표 투표 항목과 본인 투표 일치가 201~300회 일때'
                : null}
              {blue
                ? '최다 득표 투표 항목과 본인 투표 일치가 301~400회 일때'
                : null}
              {purple
                ? '최다 득표 투표 항목과 본인 투표 일치가 401~500회 일때'
                : null}
            </TierInfoLetter>
            <VoteLetter>고민투표</VoteLetter>
            <VoteContainer>
              <PostedVoted>
                <button>내가 등록한 고민 투표</button>
              </PostedVoted>
              <Voted>내가 투표한 고민 투표</Voted>
            </VoteContainer>
            <VoteLetter>고민상담</VoteLetter>
            <VoteContainer>
              <MadeRoom>내가 만든 고민 상담방</MadeRoom>
              <OperatingRoom>대화중인 고민 상담방</OperatingRoom>
            </VoteContainer>
          </BodyPadding>
        </>
      ) : (
        <>
          <MyPageHeadContainer>
            로그인하고 곰곰의 <br />
            다양한 서비스를 경험해보세요.
          </MyPageHeadContainer>
          <Buttons>
            <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
            <SignUpButton onClick={() => navigate('/signup')}>
              회원가입
            </SignUpButton>
          </Buttons>
          <BodyPadding>
            <VoteLetter>고민투표</VoteLetter>
            <VoteContainer>
              <PostedVoted>내가 등록한 고민 투표</PostedVoted>
              <Voted>내가 투표한 고민 투표</Voted>
            </VoteContainer>
            <VoteLetter>고민상담</VoteLetter>
            <VoteContainer>
              <MadeRoom>내가 만든 고민 상담방</MadeRoom>
              <OperatingRoom>대화중인 고민 상담방</OperatingRoom>
            </VoteContainer>
          </BodyPadding>
        </>
      )}
      {loggined !== null ? (
        <Logout onClick={onClickLogOut}>로그아웃</Logout>
      ) : null}

      <Footer state={state} />
    </div>
  );
};

export default MyPage;

const MyPageHeadContainer = styled.div`
  width: 100%;
  height: 11.3rem;
  padding: 2.65rem 2rem;
  ${fontLarge}
  ${fontExtraBold}
  background-color: #FFFFFF;
`;

const Buttons = styled.div`
  width: 100%;
  height: 6.8rem;
  background-color: #ffffff;
  border-radius: 0 0 2rem 2rem;
  justify-content: center;
  display: flex;
  padding: 0 1.95rem;
  margin-bottom: 3.2rem;
`;

const LoginButton = styled.button`
  width: 43.733%;
  margin-right: 0.4rem;
  height: 4.4rem;
  border-radius: 20px;
  background: #c5c5c5;
  border: none;
  ${fontSmall}
`;

const SignUpButton = styled.button`
  width: 43.733%;
  margin-left: 0.4rem;
  height: 4.4rem;
  border-radius: 20px;
  background: #c5c5c5;
  border: none;
  ${fontSmall}
`;

const VoteLetter = styled.p`
  color: #6c6c6c;
  ${fontBold}
  margin-bottom: 1.6rem;
`;

const VoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 100%;
  height: 10.4rem;
  margin-bottom: 3.2rem;
  background: #ffffff;
  border-radius: 20px;
`;

const PostedVoted = styled.div`
  margin: 1.4rem 0;
`;
const Voted = styled.div`
  margin: 1.4rem 0;
`;
const MadeRoom = styled.div`
  margin: 1.4rem 0;
`;
const OperatingRoom = styled.div`
  margin: 1.4rem 0;
`;

const Badge = styled.p`
  display: inline;
  margin-right: 65%;
  position: absolute;
  top: 2.5rem;
  left: 6.8rem;
  width: 5rem;
  height: 2rem;
  padding: 0.2rem 0.6rem;
  border-radius: 99rem;
  align-items: center;
  background-color: #ffd232;
  color: #fff;
  ${fontBold}
  ${fontSmall}
`;

const Nickname = styled.p`
  display: inline;
  ${fontLarge}
  position:absolute;
  top: 4.8rem;
  left: 6.8rem;
`;

const TierInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.4rem 0 1.6rem 0;
  width: 100%;
  height: 9.3rem;
  margin-bottom: 2.4rem;
  background: #ffffff;
  border-radius: 0px 0px 20px 20px;
`;

const TierLetter = styled.p`
  ${fontBold}
  margin-left: 2rem;
  margin-bottom: 1.6rem;
`;

const Tiers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.8rem;

  justify-content: space-around;
`;

const TierButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #fff;
  color: #999999;
  font-size: 1.4rem;
  padding: 0 0.6rem;
  border-radius: 99rem;
  &:nth-child(1):focus {
    background-color: black;
    color: #fff;
  }
  &:nth-child(2):focus {
    background-color: #ffd232;
    color: #fff;
  }
  &:nth-child(3):focus {
    background-color: green;
    color: #fff;
  }
  &:nth-child(4):focus {
    background-color: #7aa7ff;
    color: #fff;
  }
  &:nth-child(5):focus {
    background-color: purple;
    color: #fff;
  }
`;

const TierInfoLetter = styled.p`
  margin-bottom: 2.4rem;
  text-align: center;
  ${fontMedium}
  padding-bottom: 2rem;
  border-bottom: 1px solid #e6e6e6;
`;

const Logout = styled.button`
  margin-top: 5.5rem;
`;
