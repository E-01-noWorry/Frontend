import React from "react";
import { fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

const GradeInfo = ({ selectedGrade }) => {
  if (selectedGrade === 0) return;

  const pointFromGrade = () => {
    switch (selectedGrade) {
      case 1:
        return "0~10점";
      case 2:
        return "11~25점";
      case 3:
        return "26~50점";
      case 4:
        return "51~100점";
      case 5:
        return "101점 이상";
      default:
        break;
    }
  };

  return <S.Container>'고민 서비스 참여를 통해 {pointFromGrade()}을 획득했을 때'</S.Container>;
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
