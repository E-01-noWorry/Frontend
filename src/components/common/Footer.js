import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterLine>
      <ButtonContainer>
        <Button onClick={() => navigate('/', { state: 'select' })}>
          고민투표
        </Button>
        <Button onClick={() => navigate('/', { state: 'room' })}>
          고민상담
        </Button>
        <Button onClick={() => navigate('/mypage')}>마이페이지</Button>
      </ButtonContainer>
    </FooterLine>
  );
};

export default Footer;

const FooterLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem 0;
  height: 5.6rem;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background-color: #fff;
  color: gray;

  &:focus {
    color: black;
  }
`;
