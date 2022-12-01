import { fontBold, fontExtraBold } from "shared/themes/textStyle";
import styled from "styled-components";

interface Props extends ButtonProps {
  children: string;
  onClick: ((event: any) => Promise<void>) | (() => void);
}

const GlobalButton = ({ children, onClick, h, bgc, borderR, fw, fs, font }: Props) => {
  return (
    <S.Button onClick={onClick} h={h} bgc={bgc} borderR={borderR} fw={fw} fs={fs} font={font}>
      {children}
    </S.Button>
  );
};

export default GlobalButton;

interface ButtonProps {
  h?: string;
  bgc?: string;
  borderR?: string;
  fw?: string;
  fs?: string;
  font?: string;
}

const S = {
  Button: styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;

    width: 100%;
    height: ${(props) => props.h || "5.6rem"};
    background-color: ${(props) => props.bgc || props.theme.color.main2};

    border-radius: ${(props) => props.borderR || "2rem"};

    ${(props) => (props.fw === "bold" ? fontBold : fontExtraBold)}
    font-size: ${(props) => props.fs || "1.6rem"};
    color: ${(props) => props.font || props.theme.color.white};
  `,
};
