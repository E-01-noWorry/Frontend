import React, { useState, useCallback, useEffect } from "react";
import instance from "app/module/instance";
import styled, { css } from "styled-components";
import { fontBold, fontExtra, fontExtraBold, fontMedium } from "shared/themes/textStyle";
import { borderBoxDefault } from "shared/themes/boxStyle";
import GlobalButton from "common/elements/GlobalButton";

const DetailVote = ({ info, selectKey, handleLoginModal }) => {
  const [voteResult, setVoteResult] = useState({});
  const [selectedNumber, setSelectedNumber] = useState(0);

  const __getVoteResult = useCallback(async () => {
    try {
      const { data } = await instance.get(`/select/vote/${selectKey}`);
      setVoteResult(data);
    } catch (error) {}
  }, [selectKey]);

  useEffect(() => {
    __getVoteResult();
  }, [__getVoteResult]);

  const __postVote = async () => {
    try {
      const { data } = await instance.post(`/select/vote/${selectKey}`, {
        choice: selectedNumber,
      });
      setVoteResult(data);
    } catch (error) {
      handleLoginModal(error.response.data.errMsg);
    }
  };

  return (
    <>
      {voteResult.msg?.includes("성공") ? (
        <S.ResultContainer>
          {info.options?.map((option, idx) => (
            <S.Result bgImage={info.image[idx]} key={idx}>
              <div>{voteResult.result[idx + 1] || 0}%</div>
              <div>{option}</div>
            </S.Result>
          ))}
        </S.ResultContainer>
      ) : (
        <S.VoteContainer isSelect={selectedNumber} image={info.image}>
          {info.options?.map((option, idx) => (
            <S.Vote bgImage={info.image[idx]} key={idx} onClick={() => setSelectedNumber(idx + 1)}>
              <input
                type="radio"
                hidden
                id={option}
                checked={selectedNumber === idx + 1}
                onChange={() => setSelectedNumber(idx + 1)}
              />
              <label htmlFor={option}>{option}</label>
              <GlobalButton
                onClick={__postVote}
                h={"4.8rem"}
                bgc={({ theme }) => theme.white}
                font={({ theme }) => theme.black}
                borderR={"1.5rem"}
                fw={"bold"}
              >
                클릭 후 투표
              </GlobalButton>
            </S.Vote>
          ))}
        </S.VoteContainer>
      )}
    </>
  );
};

const S = {
  ResultContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    height: 100%;
    padding: 2rem;
    margin: 2.4rem 0 4.8rem 0;
    background-color: ${({ theme }) => theme.sub5};

    border-radius: 2rem;
  `,

  Result: styled.article`
    ${borderBoxDefault};
    gap: 0.8rem;

    height: 15rem;
    padding: 2.65rem 1.6rem;
    background-color: ${(props) => (props.bgImage ? props.theme.white : props.theme.main2)};
    color: ${({ theme }) => theme.white};

    //투표 결과 퍼센트
    div:nth-child(1) {
      ${fontExtra};
      ${fontExtraBold};
      line-height: 4.8rem;
    }

    //투표 선택지 이름
    div:nth-child(2) {
      ${fontMedium};
      line-height: 2.1rem;
    }

    ${(props) =>
      props.bgImage &&
      css`
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${(props) => props.bgImage});
        background-size: cover;
        background-position: center center;

        color: ${({ theme }) => theme.white};
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
      `}
  `,

  VoteContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    padding: 2rem;
    margin: 2.4rem 0 4.8rem 0;
    background-color: ${({ theme }) => theme.sub5};

    border-radius: 2rem;

    //클릭한 선택지 CSS
    & > div:nth-child(${(props) => props.isSelect}) {
      display: flex;
      justify-content: space-between;

      background-color: ${({ theme }) => theme.main2};

      transition-duration: 0.3s;

      ${(props) =>
        props.image?.[0] &&
        css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${(props) => props.image[props.isSelect - 1]});
          background-size: cover;
          background-position: center center;
        `}

      //클릭한 선택지의 이름
      label {
        color: ${({ theme }) => theme.white};
        line-height: 2.4rem;
      }

      //클릭 후 투표 버튼
      button {
        display: flex;
      }
    }
  `,

  Vote: styled.div`
    ${borderBoxDefault};
    height: 15rem;
    padding: 2.6rem 1.6rem;
    background-color: #fff;

    ${fontBold}

    cursor: pointer;

    //클릭 후 투표 버튼
    //안보이다가 onclick 발생시 위의 코드에서 block으로 바뀝니다
    button {
      display: none;
    }

    //이미지 선택지면 글씨 컬러 흰색, 그림자 효과
    ${(props) =>
      props.bgImage &&
      css`
        background-image: url(${(props) => props.bgImage});
        background-size: cover;
        background-position: center center;

        label {
          color: #fff;
          text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
        }
      `}
  `,
};

export default DetailVote;
