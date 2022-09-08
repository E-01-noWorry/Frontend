import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconLarge } from '../../shared/themes/iconStyle';
import { fontSmall } from '../../shared/themes/textStyle';

import IconVoteTab from '../../static/icons/Variety=vote, Status=tab.svg';
import IconVoteUntab from '../../static/icons/Variety=vote, Status=untab.svg';
import IconChatTab from '../../static/icons/Variety=chat, Status=tab.svg';
import IconChatUntab from '../../static/icons/Variety=chat, Status=untab.svg';
import IconProfileTab from '../../static/icons/Variety=profile, Status=tab.svg';
import IconProfileUntab from '../../static/icons/Variety=profile, Status=untab.svg';

import styled from 'styled-components';

const Footer = ({ state }) => {
  const navigate = useNavigate();

  return (
    <StFooter state={state}>
      <StIconWrap onClick={() => navigate('/main', { state: 'select' })}>
        <StIcon>
          {state === 'select' ? (
            <img src={IconVoteTab} />
          ) : (
            <img src={IconVoteUntab} />
          )}
        </StIcon>
        <StText>고민투표</StText>
      </StIconWrap>

      <StIconWrap onClick={() => navigate('/main', { state: 'room' })}>
        <StIcon>
          {state === 'room' ? (
            <img src={IconChatTab} />
          ) : (
            <img src={IconChatUntab} />
          )}
        </StIcon>
        <StText>고민상담</StText>
      </StIconWrap>

      <StIconWrap>
        <StIcon></StIcon>
        <StText>소라고동</StText>
      </StIconWrap>

      <StIconWrap onClick={() => navigate('/mypage', { state: 'mypage' })}>
        <StIcon>
          {state === 'mypage' ? (
            <img src={IconProfileTab} />
          ) : (
            <img src={IconProfileUntab} />
          )}
        </StIcon>
        <StText>마이페이지</StText>
      </StIconWrap>
    </StFooter>
  );
};

export default Footer;

const StFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 6rem;
  padding: 0 2rem;
  background-color: #f5f5f5;

  &
    > div:nth-child(${(props) =>
        props.state === 'select'
          ? 1
          : props.state === 'room'
          ? 2
          : props.state === 'mypage'
          ? 4
          : null}) {
    color: #000;
  }
`;

const StIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: #787878;
`;

const StIcon = styled.div`
  ${IconLarge};
`;

const StText = styled.div`
  ${fontSmall};
  line-height: 1.8rem;
`;
