import React from "react";
import ProfileImg from "common/elements/ProfileImg";

import { remainedTime } from "shared/utils/timeCalculation";
import { fontExtraBold, fontLarge, fontMedium } from "shared/themes/textStyle";

import IconTimeWarning from "static/icons/Variety=Time warning, Status=untab, Size=S.svg";
import IconTimeOver from "static/icons/Variety=Timeover, Status=Untab, Size=S.svg";
import styled from "styled-components";

const DetailInfo = ({ info }) => {
  return (
    <S.InfoContainer>
      <ProfileImg point={info.point} size={"4rem"} />
      <S.Nickname>{info.nickname}</S.Nickname>
      <S.Category>{info.category}</S.Category>
      <S.Title>{info.title}</S.Title>
      <S.DeadLine>
        {info.completion ? (
          <>
            <img src={IconTimeOver} alt="IconTimeOver" />
            <span className="timeover">투표마감</span>
          </>
        ) : (
          <>
            <img src={IconTimeWarning} alt="IconTimeWarning" />
            <span className="deadline">{remainedTime(info.deadLine)}</span>
          </>
        )}
      </S.DeadLine>
    </S.InfoContainer>
  );
};

const S = {
  InfoContainer: styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Nickname: styled.div`
    margin-top: 0.2rem;

    ${fontMedium}
    line-height: 2.1rem;
    color: ${({ theme }) => theme.sub2};
  `,

  Category: styled.div`
    padding: 0 0.4rem;
    margin-top: 2rem;
    background-color: ${({ theme }) => theme.main2};

    border-radius: calc(2.1rem / 2);

    ${fontMedium};
    line-height: 2.1rem;
    color: ${({ theme }) => theme.white};
  `,

  Title: styled.div`
    width: 100%;
    margin: 0.8rem 2rem;

    ${fontLarge};
    ${fontExtraBold};
    line-height: 3rem;
    text-align: center;

    word-wrap: break-word;
    word-break: break-all;
  `,

  DeadLine: styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;

    margin-top: 0.8rem;

    ${fontMedium};

    .deadline {
      color: ${({ theme }) => theme.warning};
    }

    .timeover {
      color: ${({ theme }) => theme.sub2};
    }
  `,
};

export default DetailInfo;
