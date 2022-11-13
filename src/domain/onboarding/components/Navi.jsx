import React from "react";
import styled from "styled-components";

const Navi = ({ pagination }) => {
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

const S = {
  Navi: styled.div`
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
      background-color: ${({ theme }) => theme.sub3};

      border-radius: 50%;
    }

    div:nth-child(${(props) => props.pagination}) {
      background-color: ${({ theme }) => theme.sub1};
    }

    z-index: 9;
  `,
};

export default Navi;
