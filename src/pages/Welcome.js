import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyPadding from '../components/common/BodyPadding';
import GlobalButton from '../components/elements/GlobalButton';

import { isLogin } from '../shared/isLogin';

import { fontSmall } from '../shared/themes/textStyle';
import { IconSmall } from '../shared/themes/iconStyle';

import IconNext from '../static/icons/Variety=next, Status=untab.svg';
import Logo from '../static/images/Logo.svg';

import styled from 'styled-components';
import Loading from './Loading';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      navigate('/main', { state: 'select' });
    }
  }, [navigate]);

  if (isLogin()) {
    return <Loading />;
  }

  return (
    <BodyPadding>
      <StWelcomeWrap>
        <StLogo>
          <img src={Logo} alt="Logo" />
        </StLogo>

        <StButtonWrap>
          <GlobalButton onClick={() => navigate('/login')}>
            시작하기
          </GlobalButton>

          <GlobalButton
            bgc={({ theme }) => theme.white}
            font={({ theme }) => theme.main2}
            onClick={() => navigate('/main', { state: 'select' })}
          >
            서비스 둘러보기
          </GlobalButton>
        </StButtonWrap>

        <StNaviLogin>
          <div>아직 회원이 아닌가요?</div>
          <div onClick={() => navigate('/signUp')}>
            회원가입
            <StIcon>
              <img src={IconNext} alt="IconNext" />
            </StIcon>
          </div>
        </StNaviLogin>
      </StWelcomeWrap>
    </BodyPadding>
  );
};

export default Welcome;

const StWelcomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StLogo = styled.div`
  position: absolute;
  top: 20rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StButtonWrap = styled.div`
  position: absolute;
  bottom: 14rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  width: 100%;
  padding: 0 2rem;
`;

const StNaviLogin = styled.div`
  position: absolute;
  bottom: 3.2rem;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  div:nth-child(1) {
    ${fontSmall}
    color: ${({ theme }) => theme.sub2};
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;

    ${fontSmall}
  }
`;

const StIcon = styled.div`
  ${IconSmall}

  img {
    width: 2rem;
    height: 2rem;
  }
`;
