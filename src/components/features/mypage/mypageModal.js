import React from 'react';
import styled from 'styled-components';
import {
  fontBold,
  fontLarge,
  fontMedium,
} from '../../../shared/themes/textStyle';
import Close from '../../../static/icons/Variety=close, Status=L.svg';
import BodyPadding from '../../common/BodyPadding';

const MypageModal = (props) => {
  return (
    <Modal>
      <Header>
        <p>등급 선정기준 및 혜택</p>
        <img src={Close} onClick={props.onClickModal}></img>
      </Header>
      <Line />
      <Section1>
        <BodyPadding>
          <Main1>점수 획득 방법</Main1>
          <Sub1>&#8226; 고민투표</Sub1>
          <SubContent>투표 참여 1회당 1점 획득</SubContent>
          <SubContent>투표 결과와 본인 투표가 일치할 경우 5점 획득</SubContent>
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
  );
};

export default MypageModal;

const Modal = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: center;

  > p {
    margin-top: 0.7rem;
    ${fontLarge}
  }
  > img {
    position: absolute;
    right: 2.7rem;
  }
`;

const Line = styled.hr`
  margin-top: 1.7rem;
  border: 1px solid #e2ddd6;
  margin-bottom: 3rem;
`;

const Section1 = styled.div`
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
