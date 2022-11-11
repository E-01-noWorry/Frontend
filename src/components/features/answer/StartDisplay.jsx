import React, { useEffect, useState } from "react";
import { MS } from "components/common/modal/modalStyles";
import { fontBold } from "shared/themes/textStyle";
import styled from "styled-components";

const StartDisplay = () => {
  const [infoText, setIntoText] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntoText(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {infoText && (
        <MS.Background>
          <S.Text>고민을 떠올리고 하단 버튼을 눌러주세요</S.Text>
        </MS.Background>
      )}
    </>
  );
};

const S = {
  Text: styled.div`
    ${fontBold};
    color: ${({ theme }) => theme.main2};
  `,
};

export default StartDisplay;
