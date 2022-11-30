import React from "react";
import { fontBold, fontMedium } from "shared/themes/textStyle";
import { colorFromPoint, remainedPoint } from "shared/utils/calculate";
import IconInformation from "static/icons/Variety=Information, Status=untab, Size=S.svg";
import styled from "styled-components";

const GradeContainer = ({ myInfo, selectedGrade, handleSelectGrade }) => {
  return (
    <>
      <S.MyGrade>
        <div>
          <span>현재 등급</span>
          <span>{colorFromPoint(myInfo.point)}</span>
        </div>

        <div>
          <span>모은 점수</span>
          <span>{myInfo.point}점</span>
        </div>

        <div>
          <span>다음 등급까지</span>
          <span>{remainedPoint(myInfo.point)}점 남음</span>
        </div>
      </S.MyGrade>

      <S.GradeInfo selectedGrade={selectedGrade}>
        <div>
          <span>등급 별 달성 조건</span>
          <img src={IconInformation} alt="IconInformation" />
        </div>

        <div>
          {["White", "Yellow", "Green", "Blue", "Purple"].map((color, idx) => (
            <span key={idx} onClick={() => handleSelectGrade(idx)}>
              {color}
            </span>
          ))}
        </div>
      </S.GradeInfo>
    </>
  );
};

const S = {
  MyGrade: styled.article`
    display: grid;
    grid-template-columns: 30% 30% 40%;

    height: 6.7rem;

    border: 1px solid ${({ theme }) => theme.sub4};
    border-radius: 2rem;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1.1rem;

      > span:nth-child(1) {
        ${fontMedium};
        ${fontBold};
      }

      > span:nth-child(2) {
        ${fontMedium};
        color: ${({ theme }) => theme.main2};
      }
    }

    > div:nth-child(2) {
      margin: 1rem 0;
      border-left: 1px solid ${({ theme }) => theme.sub4};
      border-right: 1px solid ${({ theme }) => theme.sub4};
    }
  `,

  GradeInfo: styled.article`
    margin-top: 2.4rem;

    > div:nth-child(1) {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      ${fontBold};
    }

    > div:nth-child(2) {
      display: flex;
      justify-content: space-between;

      margin-top: 1.6rem;

      ${fontMedium};
      color: ${({ theme }) => theme.sub2};

      span {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 2.1rem;
        padding: 0 0.6rem;
        border-radius: 999rem;

        cursor: pointer;
      }

      > span:nth-child(${(props) => props.selectedGrade}) {
        color: ${({ theme }) => theme.white};
        background-color: ${(props) =>
          props.selectedGrade === 1
            ? "#D0D0D0"
            : props.selectedGrade === 2
            ? "#fdd74f"
            : props.selectedGrade === 3
            ? "#91dc6e"
            : props.selectedGrade === 4
            ? "#70a0ff"
            : "#a57aff"};
      }
    }
  `,
};
export default GradeContainer;
