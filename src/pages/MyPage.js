import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BodyPadding from '../components/common/BodyPadding';
import Footer from '../components/common/Footer';
import { fontLarge, fontSmall, fontMedium } from '../shared/themes/textStyle';
import { fontExtraBold, fontBold } from '../shared/themes/textStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { editNickNameThunk, getMyPointThunk } from '../app/module/myPageSlice';
import { css } from 'styled-components';
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const userNickname = useSelector((state) => state.myPageSlice.data);
  const userPoint = useSelector((state) => state.myPageSlice.point);
  const [tierInfo, setTierInfo] = useState(false);

  const onClickTireInfo = () => {
    setTierInfo((status) => !status);
  };
  //나의 포인트 조회
  useEffect(() => {
    if (localStorage.getItem('userKey')) {
      dispatch(getMyPointThunk());
    }
  }, [dispatch]);

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

  //닉네임변경
  const [editNickname, setEditNickname] = useState('');
  const [editMode, setEditMode] = useState(false);
  const userKey = localStorage.getItem('userKey');
  const onClickEditNickName = () => {
    setEditMode((status) => !status);
    if (editMode === true) {
      dispatch(editNickNameThunk({ ...editNickname, userKey: userKey }));
    }
  };

  const onChangeEditNickName = (event) => {
    const { name, value } = event.target;
    setEditNickname({ [name]: value });
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {loggined !== null ? (
        <>
          <MyPageHeadContainer>
            <ProfileImgLarge />
            <Badge userPoint={userPoint}>
              {userPoint <= 10
                ? 'White'
                : userPoint > 10 && userPoint <= 25
                ? 'Yellow'
                : userPoint > 25 && userPoint <= 50
                ? 'Green'
                : userPoint > 50 && userPoint <= 100
                ? 'Blue'
                : userPoint > 100
                ? 'Purple'
                : null}
            </Badge>
            <Nickname>
              {editMode ? (
                <EditNicknameInput
                  name="nickname"
                  onChange={onChangeEditNickName}
                  type="text"
                />
              ) : (
                <>
                  {userNickname && localStorage.getItem('nickname')}
                  <span style={{ fontWeight: '400px' }}>님</span>
                </>
              )}
            </Nickname>
            <EditNickname onClick={onClickEditNickName}>
              {editMode ? '수정완료' : '변경'}
            </EditNickname>
          </MyPageHeadContainer>
          <ScoreContainer>
            <MyScore>
              <ScoreInfo1>
                현재등급
                <ScoreDetail>
                  {userPoint <= 10
                    ? 'White'
                    : userPoint > 10 && userPoint <= 25
                    ? 'Yellow'
                    : userPoint > 25 && userPoint <= 50
                    ? 'Green'
                    : userPoint > 50 && userPoint <= 100
                    ? 'Blue'
                    : userPoint > 100
                    ? 'Purple'
                    : null}
                </ScoreDetail>
              </ScoreInfo1>
              <ScoreInfo2>
                모은점수{' '}
                <ScoreDetail>
                  {userPoint === null ? '0' : userPoint}
                </ScoreDetail>
              </ScoreInfo2>
              <ScoreInfo3>
                다음등급{' '}
                <ScoreDetail>
                  {userPoint <= 10
                    ? `${11 - userPoint}점 남음`
                    : userPoint >= 10 && userPoint <= 25
                    ? `${26 - userPoint}점 남음`
                    : userPoint >= 25 && userPoint <= 50
                    ? `${51 - userPoint}점 남음`
                    : userPoint >= 51 && userPoint <= 100
                    ? `${101 - userPoint}점 남음`
                    : '-'}
                </ScoreDetail>
              </ScoreInfo3>
            </MyScore>
          </ScoreContainer>

          <TierLetter onClick={onClickTireInfo}>
            등급별 혜택/달성조건 알아보기
          </TierLetter>

          {tierInfo ? (
            <TierInfoContainer>
              <TierInfo>
                <Tiers>
                  <TierButton
                    autoFocus
                    onFocus={onFocusWhite}
                    onBlur={onBlurWhite}
                  >
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
            </TierInfoContainer>
          ) : null}
          <BodyPadding>
            <VoteLetter>고민투표</VoteLetter>
            <VoteContainer>
              <PostVoted>
                <Contents onClick={() => navigate('/postvoted')}>
                  내가 등록한 고민 투표
                </Contents>
              </PostVoted>
              <Voted>
                <Contents onClick={() => navigate('/voted')}>
                  내가 투표한 고민 투표
                </Contents>
              </Voted>
            </VoteContainer>
            <VoteLetter>고민상담</VoteLetter>
            <VoteContainer>
              <MadeRoom>
                <Contents onClick={() => navigate('/maderoom')}>
                  내가 만든 고민 상담방
                </Contents>
              </MadeRoom>
              <OperatingRoom>
                <Contents onClick={() => navigate('/operatingroom')}>
                  대화중인 고민 상담방
                </Contents>
              </OperatingRoom>
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
              <PostVoted>
                <Contents onClick={() => window.alert('로그인후이용해주세요')}>
                  내가 등록한 고민 투표
                </Contents>
              </PostVoted>
              <Voted>
                <Contents onClick={() => window.alert('로그인후이용해주세요')}>
                  내가 투표한 고민 투표
                </Contents>
              </Voted>
            </VoteContainer>
            <VoteLetter>고민상담</VoteLetter>
            <VoteContainer>
              <MadeRoom>
                <Contents onClick={() => window.alert('로그인후이용해주세요')}>
                  내가 만든 고민 상담방
                </Contents>
              </MadeRoom>
              <OperatingRoom>
                <Contents onClick={() => window.alert('로그인후이용해주세요')}>
                  대화중인 고민 상담방
                </Contents>
              </OperatingRoom>
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

const ProfileImgLarge = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  background: #d9d9d9;
  border-radius: 999px;
  display: inline-block;
  margin-right: 1rem;
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
  box-shadow: 0 0.4rem 1rem 0 #cccccc;
`;

const Contents = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 0 0.7rem 0 2.2rem;
  cursor: pointer;
`;

const PostVoted = styled.div`
  margin: 1.4rem 0;
  width: 100%;
  height: 50vh;
`;
const Voted = styled.div`
  margin: 1.4rem 0;
  width: 100%;
  height: 50vh;
`;
const MadeRoom = styled.div`
  margin: 1.4rem 0;
  width: 100%;
  height: 50vh;
`;
const OperatingRoom = styled.div`
  margin: 1.4rem 0;
  width: 100%;
  height: 50vh;
`;

const Badge = styled.p`
  display: inline;
  margin-right: 65%;
  position: absolute;
  top: 3.3rem;
  left: 9.4rem;
  width: 5rem;
  height: 2rem;
  padding: 0.3rem 0.6rem 0 0.6rem;
  border-radius: 99rem;
  align-items: center;
  color: #fff;
  ${(props) =>
    props.userPoint <= 10
      ? css`
          background-color: #ececec;
        `
      : props.userPoint > 10 && props.userPoint <= 25
      ? css`
          background-color: #fdd74f;
        `
      : props.userPoint > 25 && props.userPoint <= 50
      ? css`
          background-color: #91dc6e;
        `
      : props.userPoint > 50 && props.userPoint <= 100
      ? css`
          background-color: #70a0ff;
        `
      : props.userPoint > 100
      ? css`
          background-color: #a57aff;
        `
      : null}
  ${fontBold}
  ${fontSmall}
  text-align: center;
`;

const Nickname = styled.p`
  display: inline;
  ${fontLarge}
  position: relative;
  bottom: 1.5rem;
  margin-right: 0.6rem;
`;

const EditNickname = styled.button`
  border: none;
  position: relative;
  bottom: 2rem;
  border-radius: 99rem;
  width: 6.8rem;
  padding: 0.8rem;
  height: 3.6rem;
`;

const EditNicknameInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  position: relative;
  width: 50%;

  &:focus {
    outline: none;
  }
`;

const ScoreContainer = styled.div`
  padding: 0 2rem;
  background: #ffffff;
`;

const MyScore = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 2rem;
  width: 100%;
  height: 6.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

const ScoreInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  ${fontBold}
`;
const ScoreInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  align-items: center;
  ${fontBold}
  border-left: 1px solid #e6e6e6;
  border-right: 1px solid #e6e6e6;
`;

const ScoreInfo3 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  align-items: center;
  ${fontBold}
`;
const ScoreDetail = styled.p`
  font-weight: 400;
  color: #595959;
  margin-top: 1.1rem;
`;

const TierInfoContainer = styled.div`
  margin-top: -3.5rem;
`;

const TierInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.4rem 0 1.6rem 0;
  width: 100%;
  height: 5.5rem;
  margin-bottom: 2.4rem;
  background: #ffffff;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0 0.4rem 0.4rem #cccccc;
`;

const TierLetter = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  ${fontSmall}
  text-align: center;
  padding: 1rem 0;
  background-color: #fff;
  margin-bottom: 2.4rem;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0 0.4rem 0.4rem 0 #cccccc;
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
  padding-right: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid #e6e6e6;
`;

const Logout = styled.div`
  text-align: center;
  ${fontSmall}
  color:#767676;
  cursor: pointer;
`;
