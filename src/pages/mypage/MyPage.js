import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BodyPadding from "../../components/common/BodyPadding";
// import Footer from '../../components/common/Footer';
import { fontLarge, fontSmall, fontMedium } from "../../shared/themes/textStyle";
import { fontExtraBold, fontBold } from "../../shared/themes/textStyle";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteInfoThunk, editNickNameThunk, getMyPointThunk } from "../../app/module/myPageSlice";
import { css } from "styled-components";
import { IconLarge, IconMedium } from "../../shared/themes/iconStyle";
import {
  ModalBasic,
  ModalDelete,
  ModalDeleteInfo,
  ModalLogout,
} from "../../components/common/Modal";
import ProfileImg from "../../components/elements/ProfileImg";
import MypageModal from "../../components/features/mypage/mypageModal";

import IconChange from "../../static/icons/Variety=Change, Status=untab, Size=S.svg";
import IconEdit from "../../static/icons/Variety=edit, Status=untab, Size=L.svg";
import IconNext from "../../static/icons/Variety=next, Status=untab, Size=M.svg";
import IconVoteTab from "../../static/icons/Variety=vote, Status=tab, Size=L.svg";
import IconChatting from "../../static/icons/Variety=chating, Status=untab, Size=L.svg";
import IconInformation from "../../static/icons/Variety=Information, Status=untab, Size=S.svg";
import IconPerson from "../../static/icons/Variety=profile, Status=tab, Size=L.svg";
import { cleanUpErr } from "../../app/module/myPageSlice";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const userNickname = useSelector((state) => state.myPageSlice.data.nickname);
  const userPoint = useSelector((state) => state.myPageSlice.point.point);
  const editNicknameErr = useSelector((state) => state.myPageSlice?.err);
  const [modal, setModal] = useState("");

  const [logoutModal, setLogoutModal] = useState(false);
  const [deleteInfoModal, setDeleteInfoModal] = useState(false);

  //나의 포인트 조회
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("userKey")) {
      dispatch(getMyPointThunk());
    }
  }, [dispatch]);

  //닉네임변경시 모달
  useEffect(() => {
    setModal(editNicknameErr);
  }, [editNicknameErr]);

  //티어별 상세정보
  const [tiers, setTiers] = useState({
    tiers: "",
  });

  const onClickTiers = (event) => {
    setTiers({ tiers: event.target.id });
  };

  //로그인 여부
  const loggined = localStorage.getItem("accessToken");

  //로그아웃
  const onClickLogOut = () => {
    setLogoutModal(true);
  };

  //닉네임변경
  const [editNickname, setEditNickname] = useState({
    nickname: "",
  });
  const [editMode, setEditMode] = useState(false);

  const onClickEditNickName = () => {
    setEditMode((status) => !status);
    setEditNickname({ nickname: localStorage.getItem("nickname") });
    if (editMode === true) {
      if (editNicknameErr) {
        setModal(editNicknameErr);
      }

      dispatch(editNickNameThunk({ ...editNickname }));
    }
  };

  const onClickEditMode = () => {
    setEditMode((status) => !status);
  };

  const onChangeEditNickName = (event) => {
    const { name, value } = event.target;
    setEditNickname({ [name]: value });
  };

  //Modal
  const [modalMode, setModalMode] = useState(false);

  const onClickModal = () => {
    setModalMode((status) => !status);
  };

  //회원삭제
  const onClickDeleteInfo = () => {
    dispatch(deleteInfoThunk()).then(() => localStorage.clear());
  };

  return (
    <>
      <div style={{ paddingBottom: "9rem" }}>
        {modal && (
          <ModalBasic
            setter={() => {
              setModal("");
              dispatch(cleanUpErr());
            }}
          >
            {modal}
          </ModalBasic>
        )}

        {logoutModal && (
          <ModalLogout
            setter={() => {
              setLogoutModal(false);
            }}
            logout={() => {
              localStorage.clear();
              window.location.reload("/mypage");
            }}
          />
        )}

        {deleteInfoModal && (
          <ModalDeleteInfo
            setter={() => {
              setDeleteInfoModal(false);
            }}
            del={() => {
              onClickDeleteInfo();
              setDeleteInfoModal(false);
              setModal("회원탈퇴가 완료되었습니다.");
            }}
          />
        )}

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
                  <StProfileImgLarge point={userPoint} />
                  <div>
                    <div>
                      <Badge userPoint={userPoint}>
                        {userPoint <= 10
                          ? "White"
                          : userPoint > 10 && userPoint <= 25
                          ? "Yellow"
                          : userPoint > 25 && userPoint <= 50
                          ? "Green"
                          : userPoint > 50 && userPoint <= 100
                          ? "Blue"
                          : userPoint > 100
                          ? "Purple"
                          : null}
                      </Badge>
                    </div>
                    <StNicknameWrap>
                      <Nickname>
                        {editMode ? (
                          <>
                            <EditNicknameInput
                              name="nickname"
                              onChange={onChangeEditNickName}
                              type="text"
                              value={editNickname.nickname}
                            />
                            <Incorrect>*한글, 영문, 숫자로만 2~10자로 입력해주세요</Incorrect>
                          </>
                        ) : (
                          <>
                            {userNickname || localStorage.getItem("nickname")}
                            <span style={{ fontWeight: "400" }}>님</span>
                          </>
                        )}
                      </Nickname>
                      <EditNickname>
                        {editMode ? (
                          <>
                            <EditButton onClick={onClickEditNickName}>
                              <span>변경</span>
                            </EditButton>
                            <EditButton onClick={onClickEditMode}>
                              <span>취소</span>
                            </EditButton>
                          </>
                        ) : (
                          <EditButton onClick={onClickEditNickName}>
                            <img width="20" src={IconChange} alt="IconChange" />
                            <span>변경</span>
                          </EditButton>
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
                          ? "White"
                          : userPoint > 10 && userPoint <= 25
                          ? "Yellow"
                          : userPoint > 25 && userPoint <= 50
                          ? "Green"
                          : userPoint > 50 && userPoint <= 100
                          ? "Blue"
                          : userPoint > 100
                          ? "Purple"
                          : null}
                      </ScoreDetail>
                    </ScoreInfo1>
                    <ScoreInfo2>
                      모은점수
                      <ScoreDetail>{userPoint === null ? "0" : userPoint}점</ScoreDetail>
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
                          : "-"}
                      </ScoreDetail>
                    </ScoreInfo3>
                  </MyScore>
                </ScoreContainer>

                <TierLetter onClick={onClickModal}>
                  <span>등급 별 달성 조건</span>
                  <img src={IconInformation} alt="IconInformation" />
                </TierLetter>

                <TierInfoContainer>
                  <TierInfo>
                    <Tiers>
                      <TierButtonWhite onClick={onClickTiers} tiers={tiers} id="white">
                        White
                      </TierButtonWhite>
                      <TierButtonYellow onClick={onClickTiers} tiers={tiers} id="yellow">
                        Yellow
                      </TierButtonYellow>
                      <TierButtonGreen onClick={onClickTiers} tiers={tiers} id="green">
                        Green
                      </TierButtonGreen>
                      <TierButtonBlue onClick={onClickTiers} tiers={tiers} id="blue">
                        Blue
                      </TierButtonBlue>
                      <TierButtonPurple onClick={onClickTiers} tiers={tiers} id="purple">
                        Purple
                      </TierButtonPurple>
                    </Tiers>
                  </TierInfo>
                </TierInfoContainer>

                <BodyPadding>
                  <StMypageWrap login={loggined}>
                    <TierInfoLetter>
                      {tiers.tiers === "white" ? (
                        <Line>'고민 서비스 참여를 통해 0~10점을 획득했을 때'</Line>
                      ) : null}
                      {tiers.tiers === "yellow" ? (
                        <Line>'고민 서비스 참여를 통해 11~25점을 획득했을 때'</Line>
                      ) : null}
                      {tiers.tiers === "green" ? (
                        <Line>'고민 서비스 참여를 통해 26~50점을 획득했을 때'</Line>
                      ) : null}
                      {tiers.tiers === "blue" ? (
                        <Line>'고민 서비스 참여를 통해 51~100점을 획득했을 때'</Line>
                      ) : null}
                      {tiers.tiers === "purple" ? (
                        <Line>'고민 서비스 참여를 통해 101점 이상을 획득했을 때'</Line>
                      ) : null}
                    </TierInfoLetter>
                    <StTitle>고민투표</StTitle>
                    <StBox>
                      <StInnerNavi onClick={() => navigate("/postvoted")}>
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

                      <StInnerNavi onClick={() => navigate("/voted")}>
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
                      <StInnerNavi onClick={() => navigate("/maderoom")}>
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

                      <StInnerNavi onClick={() => navigate("/operatingroom")}>
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
                    <StTitle>고객센터</StTitle>
                    <StBox>
                      <StInnerNavi>
                        <StInnerTitle>
                          <div>
                            <img src={IconEdit} alt="IconEdit" />
                          </div>
                          <div>
                            <a
                              href="https://forms.gle/daCzxS5nhRZXzrUr9"
                              target="_blank"
                              style={{ color: "black", cursor: "default" }}
                            >
                              1 : 1 문의
                            </a>
                          </div>
                        </StInnerTitle>
                        <StInnerArrow>
                          <img src={IconNext} alt="IconNext" />
                        </StInnerArrow>
                      </StInnerNavi>

                      <StInnerNavi onClick={() => setDeleteInfoModal(true)}>
                        <StInnerTitle>
                          <div>
                            <img src={IconPerson} alt="IconPerson" />
                          </div>
                          <div>회원 탈퇴</div>
                        </StInnerTitle>
                        <StInnerArrow>
                          <img src={IconNext} alt="IconNext" />
                        </StInnerArrow>
                      </StInnerNavi>
                    </StBox>

                    {loggined !== null && modalMode === false ? (
                      <Logout onClick={onClickLogOut}>로그아웃</Logout>
                    ) : null}
                  </StMypageWrap>
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
              <StUserButton onClick={() => navigate("/login")}>로그인</StUserButton>
              <StUserButton onClick={() => navigate("/signup")}>회원가입</StUserButton>
            </ButtonWrap>
            <BodyPadding>
              <StMypageWrap login={loggined}>
                <StTitle>고민투표</StTitle>
                <StBox>
                  <StInnerNavi onClick={() => setModal("로그인 후 사용해주세요.")}>
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

                  <StInnerNavi onClick={() => setModal("로그인 후 사용해주세요.")}>
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
                  <StInnerNavi onClick={() => setModal("로그인 후 사용해주세요.")}>
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
                  <StInnerNavi onClick={() => setModal("로그인 후 사용해주세요.")}>
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

                <StTitle>고객센터</StTitle>
                <StBox>
                  <StInnerNavi onClick={() => setModal("로그인 후 사용해주세요.")}>
                    <StInnerTitle>
                      <div>
                        <img src={IconEdit} alt="IconEdit" />
                      </div>
                      <div>1 : 1 문의</div>
                    </StInnerTitle>
                    <StInnerArrow>
                      <img src={IconNext} alt="IconNext" />
                    </StInnerArrow>
                  </StInnerNavi>
                  <StInnerNavi onClick={() => setModal("로그인 후 사용해주세요.")}>
                    <StInnerTitle>
                      <div>
                        <img src={IconPerson} alt="IconPerson" />
                      </div>
                      <div>회원 탈퇴</div>
                    </StInnerTitle>
                    <StInnerArrow>
                      <img src={IconNext} alt="IconNext" />
                    </StInnerArrow>
                  </StInnerNavi>
                </StBox>
              </StMypageWrap>
            </BodyPadding>
          </>
        )}
        {/* <Footer state={state} /> */}
      </div>
    </>
  );
};

export default MyPage;

const StMypageWrap = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    padding: ${(props) => (props.login ? "29rem 2rem 9rem 2rem" : "21.5rem 2rem 9rem 2rem")};
    min-height: calc(100%);

    z-index: -1;
  }

  background-color: ${({ theme }) => theme.bg};
`;

const Modal = styled.div`
  visibility: visible;
`;

const StTitle = styled.div`
  margin-bottom: 1.6rem;
  margin-top: -2rem;
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
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

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
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 11.3rem;
  }

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

const EditNickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
  height: 3.6rem;
  padding: 0.8rem 1rem 0.8rem 0.8rem;

  border: none;
  border-radius: 99rem;
`;

const EditNicknameInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.sub4};
  background-color: transparent;
  min-width: 18.5rem;

  &:focus {
    outline: none;
  }
`;

const EditButton = styled.div`
  display: flex;
  width: 6.8rem;
  height: 3.6rem;
  padding: 0.8rem;
  border-radius: 99rem;
  background-color: #e2ddd6;
  font-size: 1.4rem;
  justify-content: center;
  align-items: center;
`;

const ScoreContainer = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 11.3rem;
  }

  width: 100%;
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
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 23.2rem;
  }

  margin-top: -4rem;
`;

const TierInfo = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    padding: 0 0 1.6rem 0;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.4rem 0 1.6rem 0;
  width: 100%;
  margin-bottom: 2.4rem;
  background: #ffffff;
  border-radius: 0px 0px 20px 20px;
`;

const TierLetter = styled.p`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    margin-top: 18rem;
    margin-bottom: 0;
  }

  display: flex;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
  padding: 1.6rem 0;
  margin-bottom: 2.4rem;
  background-color: #fff;

  ${fontSmall}

  > span {
    margin-left: 2rem;

    font-size: 1.6rem;
    line-height: 2rem;
    ${fontBold}
  }
`;

const Tiers = styled.div`
  display: flex;
  width: 100%;

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
    props.tiers.tiers === "white"
      ? css`
          background-color: #d0d0d0;
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
    props.tiers.tiers === "yellow"
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
    props.tiers.tiers === "green"
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
    props.tiers.tiers === "blue"
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
    props.tiers.tiers === "purple"
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
`;

const Line = styled.p`
  border-bottom: 1px solid #e2ddd6;
  padding-bottom: 2.4rem;
  margin: 0 -2rem;
`;

const Logout = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  cursor: pointer;

  margin-top: -1.5rem;

  text-align: center;
  ${fontSmall}
  color:#767676;
`;
const Correct = styled.p`
  font-size: 0.5rem;
  margin-top: -0.2rem;
  color: ${({ theme }) => theme.sub2};
`;
const Incorrect = styled(Correct)`
  color: #999999;
`;
