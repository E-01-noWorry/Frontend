import React from "react";
import { fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

const GradeInfo = ({ selectedGrade }) => {
  if (selectedGrade === 0) return;

  switch (selectedGrade) {
    case 1:
      return <S.Container>'고민 서비스 참여를 통해 0~10점을 획득했을 때'</S.Container>;
    case 2:
      return <S.Container>'고민 서비스 참여를 통해 11~25점을 획득했을 때'</S.Container>;
    case 3:
      return <S.Container>'고민 서비스 참여를 통해 26~50점을 획득했을 때'</S.Container>;
    case 4:
      return <S.Container>'고민 서비스 참여를 통해 51~100점을 획득했을 때'</S.Container>;
    case 5:
      return <S.Container>'고민 서비스 참여를 통해 101점 이상을 획득했을 때'</S.Container>;
    default:
      break;
  }
};

const S = {
  Container: styled.article`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 7rem;
    margin: 0 -2rem;
    border-bottom: 1px solid ${({ theme }) => theme.sub4};

    ${fontMedium};
  `,
};

export default GradeInfo;
