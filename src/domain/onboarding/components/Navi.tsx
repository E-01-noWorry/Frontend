import React from "react";
import styled from "styled-components";

interface Props {
  pagination: number;
}

const Navi = ({ pagination }: Props) => {
  return (
    <>
      {pagination < 4 && (
        <S.Navi pagination={pagination}>
          {[1, 2, 3].map((i) => (
            <div key={i} />
          ))}
        </S.Navi>
      )}
    </>
  );
};

export default Navi;

const S = {
  Navi: styled.div<Props>`
    position: absolute;
    top: 4rem;
    right: 4rem;

    display: flex;
    gap: 0.8rem;

    width: 4rem;
    height: 0.8rem;

    div {
      width: 0.8rem;
      height: 0.8rem;
      background-color: ${({ theme }) => theme.color.sub3};

      border-radius: 50%;
    }

    div:nth-child(${(props) => props.pagination}) {
      background-color: ${({ theme }) => theme.color.sub1};
    }

    z-index: 9;
  `,
};
