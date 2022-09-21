import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalBasic } from './Modal';

import { IconLarge } from '../../shared/themes/iconStyle';
import { fontExtraSmall } from '../../shared/themes/textStyle';

import IconVoteTab from '../../static/icons/Variety=vote, Status=tab, Size=L.svg';
import IconVoteUntab from '../../static/icons/Variety=vote, Status=untab, Size=L.svg';
import IconChatTab from '../../static/icons/Variety=_chat, Status=tab, Size=L.svg';
import IconChatUntab from '../../static/icons/Variety=chat, Status=untab, Size=L.svg';
import IconProfileTab from '../../static/icons/Variety=profile, Status=tab, Size=L.svg';
import IconProfileUntab from '../../static/icons/Variety=profile, Status=untab, Size=L.svg';
import IconGomTab from '../../static/icons/Variety=Gom, Status=tab, Size=L.svg';
import IconGomUntab from '../../static/icons/Variety=Gom, Status=untab, Size=L.svg';

import styled from 'styled-components';

const Footer = ({ state }) => {
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  return (
    <>
      {modal && <ModalBasic setter={() => setModal(false)}>{modal}</ModalBasic>}

      <StFooter state={state}>
        <StIconWrap onClick={() => navigate('/main', { state: 'select' })}>
          <StIcon>
            {state === 'select' ? (
              <img src={IconVoteTab} alt="IconVoteTab" />
            ) : (
              <img src={IconVoteUntab} alt="IconVoteUntab" />
            )}
          </StIcon>
          <StText>고민투표</StText>
        </StIconWrap>

        <StIconWrap onClick={() => navigate('/main', { state: 'room' })}>
          <StIcon>
            {state === 'room' ? (
              <img src={IconChatTab} alt="IconChatTab" />
            ) : (
              <img src={IconChatUntab} alt="IconChatUntab" />
            )}
          </StIcon>
          <StText>고민상담</StText>
        </StIconWrap>

        {/* <StIconWrap onClick={() => navigate('/answer', { state: 'answer' })}> */}
        <StIconWrap onClick={() => setModal('앗! 아직 개발중이에요.')}>
          <StIcon>
            {state === 'answer' ? (
              <img src={IconGomTab} alt="IconGomTab" />
            ) : (
              <img src={IconGomUntab} alt="IconGomUntab" />
            )}
          </StIcon>
          <StText>곰곰해답</StText>
        </StIconWrap>

        <StIconWrap onClick={() => navigate('/mypage', { state: 'mypage' })}>
          <StIcon>
            {state === 'mypage' ? (
              <img src={IconProfileTab} alt="IconProfileTab" />
            ) : (
              <img src={IconProfileUntab} alt="IconProfileUntab" />
            )}
          </StIcon>
          <StText>마이페이지</StText>
        </StIconWrap>
      </StFooter>
    </>
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
  height: 7.2rem;
  padding: 0.5rem 2.5rem 1.7rem 2.5rem;
  background-color: ${({ theme }) => theme.bg};

  border-top: 1px solid ${({ theme }) => theme.sub4};

  &
    > div:nth-child(${(props) =>
        props.state === 'select'
          ? 1
          : props.state === 'room'
          ? 2
          : props.state === 'mypage'
          ? 4
          : null}) {
    color: ${({ theme }) => theme.main2};
  }
`;

const StIconWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.sub2};
`;

const StIcon = styled.div`
  ${IconLarge};
`;

const StText = styled.div`
  ${fontExtraSmall};
  line-height: 1.8rem;
`;
