import React from 'react';
import styled from 'styled-components';
import { IconLarge } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontLarge,
  fontMedium,
} from '../../../shared/themes/textStyle';
import IconClose from '../../../static/icons/Variety=close, Status=untab, Size=L.svg';
import BodyPadding from '../../common/BodyPadding';
import Header from '../../common/Header';

const MypageModal = (props) => {
  return (
    <>
      <Header>
        <StHeaderIcon></StHeaderIcon>
        <StHeaderTitle>등급 선정기준 및 혜택</StHeaderTitle>
        <StHeaderIcon onClick={props.onClickModal}>
          <img src={IconClose} alt="IconClose" />
        </StHeaderIcon>
      </Header>
      <Modal>
        <Section1>
          <Line />
          <BodyPadding>
            <Main1>점수 획득 방법</Main1>
            <Sub1>&#8226; 고민투표</Sub1>
            <SubContent>투표 참여 1회당 1점 획득</SubContent>
            <SubContent>
              투표 결과와 본인 투표가 일치할 경우 5점 획득
            </SubContent>
            <Sub2>&#8226; 고민상담방</Sub2>
            <SubContent>상담방 생성 1회당 3점 획득</SubContent>
            <SubContent>상담방의 방장 추천을 받은 경우 5점 획득</SubContent>
          </BodyPadding>
          <Line2 />
        </Section1>

        <Section2>
          <BodyPadding>
            <Main2>등급별 혜택</Main2>
            <Sub1>&#8226; White등급</Sub1>
            <SubContent>투표 참여 1회당 1점 획득</SubContent>
            <Sub1>&#8226; Yellow등급</Sub1>
            <SubContent>투표 참여 1회당 1점 획득</SubContent>
            <Sub1>&#8226; Green등급</Sub1>
            <SubContent>투표 참여 1회당 1점 획득</SubContent>
            <Sub1>&#8226; Blue등급</Sub1>
            <SubContent>투표 참여 1회당 1점 획득</SubContent>
            <Sub1>&#8226; Purple등급</Sub1>
            <SubContent>투표 참여 1회당 1점 획득</SubContent>
          </BodyPadding>
        </Section2>
      </Modal>
    </>
  );
};

export default MypageModal;

const Modal = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    min-height: calc(100%);
    padding-bottom: 9rem;
  }

  background-color: ${({ theme }) => theme.bg};
`;

const StHeaderIcon = styled.div`
  ${IconLarge};
`;

const StHeaderTitle = styled.div`
  ${fontLarge};
`;

const Line = styled.hr`
  margin-top: 1.7rem;
  border: 1px solid #e2ddd6;
  margin-bottom: 3rem;
`;

const Section1 = styled.div`
  margin-top: 6.4rem;
  line-height: 150%;
`;
const Main1 = styled.div`
  ${fontBold}
`;
const Sub1 = styled.div`
  ${fontMedium}
  margin-top: 1.8rem;
`;
const SubContent = styled.p`
  ${fontMedium}
  color: #74706A;
  margin-left: 0.7rem;
`;
const Sub2 = styled.div`
  ${fontMedium}
  margin-top: 1.8rem;
`;

const Line2 = styled.hr`
  margin-top: 2.8rem;
  border: 1px solid #e2ddd6;
  margin-bottom: 3rem;
`;

const Section2 = styled.div`
  line-height: 150%;
`;

const Main2 = styled.div`
  ${fontBold}
`;
