import { fontLarge } from "shared/themes/textStyle";
import styled from "styled-components";

const Header = ({ children, ...rest }) => {
  return <S.Header {...rest}>{children}</S.Header>;
};

export default Header;

const S = {
  Header: styled.header`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    grid-template-columns: ${(props) => props.w || "3.2rem"} auto 3.2rem;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 6.4rem;
    padding: 0 2rem;
    background-color: ${({ theme }) => theme.bg};

    z-index: 9;

    > img {
      width: 100%;
      cursor: pointer;
    }

    > h1 {
      ${fontLarge}
    }
  `,
};
