import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import BodyPadding from '../components/common/BodyPadding';
import GlobalButton from '../components/elements/GlobalButton';

import { isLogin } from '../shared/isLogin';

import { fontBold, fontMedium, fontSmall } from '../shared/themes/textStyle';

import styled from 'styled-components';
import { IconSmall } from '../shared/themes/iconStyle';

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) {
      navigate('/main', { state: 'select' });
    }
  }, []);

  if (isLogin()) {
    return <p>Loading...</p>;
  }

  return (
    <BodyPadding>
      <StWelcomeWrap>
        <StLogo>LOGO</StLogo>

        <StTitle>익명의 사람들과 고민을 나누고 해결해봐요</StTitle>

        <StSubTitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisi
          nullam in mattis tempus scelerisque.
        </StSubTitle>

        <StButtonWrap>
          <GlobalButton onClick={() => navigate('/login')}>
            시작하기
          </GlobalButton>

          <GlobalButton
            bgc={'transparent'}
            color={'#000'}
            border={'1px solid #000'}
            onClick={() => navigate('/main', { state: 'select' })}
          >
            고민 둘러보기
          </GlobalButton>
        </StButtonWrap>

        <StNaviLogin>
          <div>아직 회원이 아닌가요?</div>
          <div onClick={() => navigate('/signUp')}>
            회원가입
            <StIcon></StIcon>
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

  margin-top: 9rem;
`;

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 22.6rem;
  height: 12.2rem;

  background-color: green;
`;

const StTitle = styled.div`
  margin-top: 3.2rem;

  ${fontBold}
  font-size: 1.8rem;
  line-height: 2.7rem;
`;

const StSubTitle = styled.div`
  width: 100%;
  margin-top: 0.8rem;

  ${fontMedium};
  line-height: 2.1rem;
  text-align: center;
`;

const StButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin-top: 10rem;
  width: 100%;
`;

const StNaviLogin = styled.div`
  position: absolute;
  bottom: 3.2rem;

  display: flex;
  gap: 0.8rem;

  div:nth-child(1) {
    ${fontSmall}
    line-height: 2rem;
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
    ${fontSmall}
    line-height: 2rem;
  }
`;

const StIcon = styled.div`
  ${IconSmall}
  background-color: green;
`;
