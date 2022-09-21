import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BodyPadding from '../../components/common/BodyPadding';
import Footer from '../../components/common/Footer';
import {
  fontLarge,
  fontSmall,
  fontMedium,
} from '../../shared/themes/textStyle';
import { fontExtraBold, fontBold } from '../../shared/themes/textStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  editNickNameThunk,
  getMyPointThunk,
} from '../../app/module/myPageSlice';
import { css } from 'styled-components';
import { IconLarge, IconMedium } from '../../shared/themes/iconStyle';
import { ModalBasic } from '../../components/common/Modal';
import IconEdit from '../../static/icons/Variety=edit, Status=untab.svg';
import IconNext from '../../static/icons/Variety=next, Status=untab.svg';
import IconVoteTab from '../../static/icons/Variety=vote, Status=tab.svg';
import IconChatting from '../../static/icons/Variety=chating, Status=untab.svg';
import ProfileImg from '../../components/elements/ProfileImg';
import MypageModal from '../../components/features/mypage/mypageModal';

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const userNickname = useSelector((state) => state.myPageSlice.data);
  const userPoint = useSelector((state) => state.myPageSlice.point);

  const [modal, setModal] = useState('');

  //나의 포인트 조회
  useEffect(() => {
    if (localStorage.getItem('userKey')) {
      dispatch(getMyPointThunk());
    }
  }, [dispatch]);

  //티어별 상세정보
  const [tiers, setTiers] = useState({
    tiers: '',
  });

  const onClickTiers = (event) => {
    setTiers({ tiers: event.target.id });
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
    const { name, value } = event.target.id;
    setEditNickname({ [name]: value });
  };

  //Modal
  const [modalMode, setModalMode] = useState(false);

  const onClickModal = () => {
    setModalMode((status) => !status);
  };

  return (
    <div style={{ paddingBottom: '9rem' }}>
      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      {loggined !== null ? (
        //로그인시

        <>
          {modalMode ? (
            <Modal>
              <MypageModal onClickModal={onClickModal} />
            </Modal>
          ) : (
            <>
              <MyPageHeadContainer>
                <StProfileImgLarge />
                <div>
                  <div>
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
                  </div>
                  <StNicknameWrap>
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
                          <span style={{ fontWeight: '400' }}>님</span>
                        </>
                      )}
                    </Nickname>
                    <EditNickname onClick={onClickEditNickName}>
                      {editMode ? (
                        <span>변경</span>
                      ) : (
                        <>
                          <img width="20" src={IconEdit} alt="IconEdit" />
                          <span>변경</span>
                        </>
                      )}
                    </EditNickname>
                  </StNicknameWrap>
                </div>
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
                    모은점수
                    <ScoreDetail>
                      {userPoint === null ? '0' : userPoint}
                    </ScoreDetail>
                  </ScoreInfo2>
                  <ScoreInfo3>
                    다음등급 까지
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

              <TierLetter>
                <span onClick={onClickModal}>등급 별 달성 조건</span>
              </TierLetter>

              <TierInfoContainer>
                <TierInfo>
                  <Tiers>
                    <TierButtonWhite
                      onClick={onClickTiers}
                      tiers={tiers}
                      id="white"
                    >
                      White
                    </TierButtonWhite>
                    <TierButtonYellow
                      onClick={onClickTiers}
                      tiers={tiers}
                      id="yellow"
                    >
                      Yellow
                    </TierButtonYellow>
                    <TierButtonGreen
                      onClick={onClickTiers}
                      tiers={tiers}
                      id="green"
                    >
                      Green
                    </TierButtonGreen>
                    <TierButtonBlue
                      onClick={onClickTiers}
                      tiers={tiers}
                      id="blue"
                    >
                      Blue
                    </TierButtonBlue>
                    <TierButtonPurple
                      onClick={onClickTiers}
                      tiers={tiers}
                      id="purple"
                    >
                      Purple
                    </TierButtonPurple>
                  </Tiers>
                </TierInfo>

                <TierInfoLetter>
                  {tiers.tiers === 'white'
                    ? '고민 서비스 참여를 통해 0~10점을 획득했을 때'
                    : null}
                  {tiers.tiers === 'yellow'
                    ? '고민 서비스 참여를 통해 11~25점을 획득했을 때'
                    : null}
                  {tiers.tiers === 'green'
                    ? '고민 서비스 참여를 통해 26~50점을 획득했을 때'
                    : null}
                  {tiers.tiers === 'blue'
                    ? '고민 서비스 참여를 통해 51~100점을 획득했을 때'
                    : null}
                  {tiers.tiers === 'purple'
                    ? '고민 서비스 참여를 통해 101점 이상을 획득했을 때'
                    : null}
                </TierInfoLetter>
              </TierInfoContainer>

              <BodyPadding>
                <StTitle>고민투표</StTitle>
                <StBox>
                  <StInnerNavi onClick={() => navigate('/postvoted')}>
                    <StInnerTitle>
                      <div>
                        <img src={IconEdit} alt="IconEdit" />
                      </div>
                      <div>내가 등록한 고민 투표</div>
                    </StInnerTitle>
                    <StInnerArrow>
                      <img src={IconNext} alt="IconNext" />
                    </StInnerArrow>
                  </StInnerNavi>

                  <StInnerNavi onClick={() => navigate('/voted')}>
                    <StInnerTitle>
                      <div>
                        <img src={IconVoteTab} alt="IconVoteTab" />
                      </div>
                      <div>내가 투표한 고민 투표</div>
                    </StInnerTitle>
                    <StInnerArrow>
                      <img src={IconNext} alt="IconNext" />
                    </StInnerArrow>
                  </StInnerNavi>
                </StBox>

                <StTitle>고민상담</StTitle>
                <StBox>
                  <StInnerNavi onClick={() => navigate('/maderoom')}>
                    <StInnerTitle>
                      <div>
                        <img src={IconEdit} alt="IconEdit" />
                      </div>
                      <div>내가 만든 고민 상담방</div>
                    </StInnerTitle>
                    <StInnerArrow>
                      <img src={IconNext} alt="IconNext" />
                    </StInnerArrow>
                  </StInnerNavi>

                  <StInnerNavi onClick={() => navigate('/operatingroom')}>
                    <StInnerTitle>
                      <div>
                        <img src={IconChatting} alt="IconChatting" />
                      </div>
                      <div>대화중인 고민 상담방</div>
                    </StInnerTitle>
                    <StInnerArrow>
                      <img src={IconNext} alt="IconNext" />
                    </StInnerArrow>
                  </StInnerNavi>
                </StBox>
              </BodyPadding>
            </>
          )}
        </>
      ) : (
        //비로그인시
        <>
          <MyPageHeadContainer>
            로그인하고 곰곰의 <br />
            다양한 서비스를 경험해보세요.
          </MyPageHeadContainer>
          <ButtonWrap>
            <StUserButton onClick={() => navigate('/login')}>
              로그인
            </StUserButton>
            <StUserButton onClick={() => navigate('/signup')}>
              회원가입
            </StUserButton>
          </ButtonWrap>
          <BodyPadding>
            <StTitle>고민투표</StTitle>
            <StBox>
              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconEdit} alt="IconEdit" />
                  </div>
                  <div>내가 등록한 고민 투표</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>

              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconVoteTab} alt="IconVoteTab" />
                  </div>
                  <div>내가 투표한 고민 투표</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>
            </StBox>

            <StTitle>고민상담</StTitle>
            <StBox>
              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconEdit} alt="IconEdit" />
                  </div>
                  <div>내가 만든 고민 상담방</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>

              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconChatting} alt="IconChatting" />
                  </div>
                  <div>대화중인 고민 상담방</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>
            </StBox>
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

const Modal = styled.div`
  visibility: visible;
`;

const StTitle = styled.div`
  margin-bottom: 1.6rem;

  ${fontBold};
  line-height: 2.4rem;
  color: ${({ theme }) => theme.sub2};
`;

const StBox = styled.div`
  height: 10.4rem;
  background-color: ${({ theme }) => theme.white};
  margin-bottom: 3.2rem;

  border-radius: 2rem;
`;

const StInnerNavi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50%;
  padding-left: 1.6rem;
  padding-right: 0.8rem;
`;

const StInnerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;

  & > div:nth-child(1) {
    ${IconLarge}
  }
`;

const StInnerArrow = styled.div`
  ${IconMedium};
`;

const MyPageHeadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 11.3rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.white};

  ${fontLarge}
  ${fontExtraBold}
  line-height: 3rem;
`;

const StProfileImgLarge = styled(ProfileImg)`
  width: 6.5rem;
  height: 6.5rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;

  width: 100%;
  height: 6.8rem;
  padding: 0 2rem;
  margin-bottom: 3.2rem;
  background-color: ${({ theme }) => theme.white};

  border-radius: 0 0 2rem 2rem;
`;

const StUserButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.4rem;
  background-color: ${({ theme }) => theme.main2};

  border-radius: 2rem;

  ${fontExtraBold}
  ${fontMedium}
  color: ${({ theme }) => theme.white};
`;

const Badge = styled.div`
  width: 5rem;
  padding: 0 0.6rem;

  border-radius: 99rem;

  ${fontBold}
  ${fontSmall}
  color: ${({ theme }) => theme.white};
  line-height: 2rem;
  text-align: center;

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
`;

const StNicknameWrap = styled.div`
  display: flex;
  align-items: center;

  gap: 0.8rem;
`;

const Nickname = styled.div`
  height: 3rem;

  ${fontLarge}
`;

const EditNickname = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.8rem;
  height: 3.6rem;
  padding: 0.8rem 1rem 0.8rem 0.8rem;

  border: none;
  border-radius: 99rem;
`;

const EditNicknameInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.sub4};
  min-width: 18.5rem;

  &:focus {
    outline: none;
  }
`;

const ScoreContainer = styled.div`
  padding: 0 2rem;
  background: ${({ theme }) => theme.white};
`;

const MyScore = styled.div`
  border: 1px solid ${({ theme }) => theme.sub4};
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
  align-items: center;

  width: 30%;

  ${fontMedium}
  ${fontBold}
`;

const ScoreInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30%;

  border-left: 1px solid ${({ theme }) => theme.sub4};
  border-right: 1px solid ${({ theme }) => theme.sub4};

  ${fontMedium}
  ${fontBold}
`;

const ScoreInfo3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40%;

  ${fontMedium}
  ${fontBold}
`;

const ScoreDetail = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.main2};
  margin-top: 1.1rem;
`;

const TierInfoContainer = styled.div`
  margin-top: -4rem;
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
`;

const TierLetter = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  ${fontSmall}
  padding: 1.6rem 0;
  background-color: #fff;
  margin-bottom: 2.4rem;
  border-radius: 0px 0px 20px 20px;
  > span {
    margin-left: 2rem;
    font-size: 1.6rem;
    ${fontBold}
  }
`;

const Tiers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.8rem;

  justify-content: space-around;
`;

const TierButtonWhite = styled.button`
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

  ${(props) =>
    props.tiers.tiers === 'white'
      ? css`
          background-color: #eaeaea;
          color: #fff;
        `
      : null}
`;
const TierButtonYellow = styled.button`
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

  ${(props) =>
    props.tiers.tiers === 'yellow'
      ? css`
          background-color: #fdd74f;
          color: #fff;
        `
      : null}
`;
const TierButtonGreen = styled.button`
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

  ${(props) =>
    props.tiers.tiers === 'green'
      ? css`
          background-color: #91dc6e;
          color: #fff;
        `
      : null}
`;
const TierButtonBlue = styled.button`
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

  ${(props) =>
    props.tiers.tiers === 'blue'
      ? css`
          background-color: #70a0ff;
          color: #fff;
        `
      : null}
`;
const TierButtonPurple = styled.button`
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

  ${(props) =>
    props.tiers.tiers === 'purple'
      ? css`
          background-color: #a57aff;

          color: #fff;
        `
      : null}
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
  cursor: pointer;

  margin-top: -1.5rem;

  text-align: center;
  ${fontSmall}
  color:#767676;
`;