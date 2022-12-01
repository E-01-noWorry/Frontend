import React from "react";
import { fontBold, fontLarge, fontMedium } from "shared/themes/textStyle";
import IconClose from "static/icons/Variety=close, Status=untab, Size=L.svg";
import styled from "styled-components";

const GradeInfoModal = ({ handleClick }) => {
  return (
    <S.Container>
      <S.Header>
        <div />
        <h1>등급 선정기준</h1>
        <img onClick={handleClick} src={IconClose} alt="IconClose" />
      </S.Header>

      <S.Body>
        <S.Title>점수 획득 방법</S.Title>
        <S.Contents>
          <h3>&#8226; 고민투표</h3>
          <span>투표 참여 1회당 1점 획득</span>
          <span>투표 결과와 본인 투표가 일치할 경우 5점 획득</span>
        </S.Contents>

        <S.Contents>
          <h3>&#8226; 고민상담방</h3>
          <span>상담방 생성 1회당 3점 획득</span>
          <span>상담방의 방장 추천을 받은 경우 5점 획득</span>
        </S.Contents>
      </S.Body>
    </S.Container>
  );
};

const S = {
  Container: styled.section`
    @media ${({ theme }) => theme.device.PC} {
      width: ${({ theme }) => theme.style.width};
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};
    }

    position: fixed;

    width: 100%;
    min-height: 100%;
    padding: 0 2rem;
    background-color: ${({ theme }) => theme.bg};
    z-index: 9;
  `,

  Header: styled.section`
    display: grid;
    grid-template-columns: 3.2rem auto 3.2rem;
    justify-content: space-between;
    align-items: center;

    height: 6.4rem;
    margin: 0 -2rem;
    padding: 0 2rem;
    border-bottom: 1px solid ${({ theme }) => theme.sub4};

    > img {
      width: 100%;
      cursor: pointer;
    }

    h1 {
      ${fontLarge}

      > span {
        color: ${({ theme }) => theme.sub3};
      }
    }
  `,

  Body: styled.section`
    margin-top: 2rem;
  `,

  Title: styled.h2`
    display: block;

    height: 4.4rem;

    ${fontBold};
    line-height: 4rem;
  `,

  Contents: styled.article`
    display: flex;
    flex-direction: column;

    margin-top: 1.8rem;

    ${fontMedium};
    line-height: 2.1rem;

    h3 {
    }

    span {
      ${fontMedium};
      color: ${({ theme }) => theme.sub2};
      margin-left: 0.7rem;
    }
  `,
};

export default GradeInfoModal;
