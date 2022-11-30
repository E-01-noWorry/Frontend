import React from "react";
import { fontBold, fontSmall } from "shared/themes/textStyle";
import { colorFromPoint } from "shared/utils/calculate";
import styled from "styled-components";

const Badge = ({ point }) => {
  return <S.Badge point={point}>{colorFromPoint(point)}</S.Badge>;
};

const S = {
  Badge: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: fit-content;
    height: 2rem;
    padding: 0 0.6rem;
    background-color: ${(props) =>
      0 <= props.point && props.point <= 10
        ? "#D0D0D0;"
        : 11 <= props.point && props.point <= 25
        ? "#fdd74f"
        : 26 <= props.point && props.point <= 50
        ? "#91dc6e"
        : 51 <= props.point && props.point <= 100
        ? "#70a0ff"
        : 101 <= props.point
        ? "#a57aff"
        : null};

    border-radius: 99rem;

    ${fontBold};
    ${fontSmall};
    color: ${({ theme }) => theme.white};
  `,
};

export default Badge;
