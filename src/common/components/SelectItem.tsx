import { useNavigate } from "react-router-dom";
import { SelectItemProps } from "types";

import { remainedTime } from "shared/utils/timeCalculation";
import { ReactComponent as IconPeople } from "static/icons/Variety=people, Status=untab, Size=S.svg";
import { ReactComponent as IconLeftTime } from "static/icons/Variety=Left Time, Status=untab, Size=S.svg";
import { ReactComponent as IconTimeOver } from "static/icons/Variety=Timeover, Status=Untab, Size=S.svg";
import { fontBold, fontMedium, fontSmall } from "shared/themes/textStyle";
import styled from "styled-components";

interface Props {
  item: SelectItemProps;
  idx: number;
  setRef: any;
  length: number;
}

const SelectItem = ({ item, idx, setRef, length }: Props) => {
  const navigate = useNavigate();

  const handleEnterDetail = () => {
    navigate(`/detail/${item.selectKey}`);
  };

  return (
    <S.Container
      onClick={handleEnterDetail}
      completion={item.completion}
      ref={idx === length - 1 ? setRef : null}
    >
      <S.Header completion={item.completion}>
        <span>{item.category}</span>
        <span>
          작성자 <span>{item.nickname}</span>
        </span>
      </S.Header>

      <S.Body completion={item.completion}>
        <span>{item.title}</span>
        <span>{item.options?.join(" vs ")}</span>
      </S.Body>

      <S.Footer>
        <div>
          <IconPeople />
          <span>{item.total}</span>
        </div>
        <div>
          {item.completion ? (
            <>
              <IconTimeOver />
              <span>투표마감</span>
            </>
          ) : (
            <>
              <IconLeftTime />
              <span>{remainedTime(item.deadLine)} 남음</span>
            </>
          )}
        </div>
      </S.Footer>
    </S.Container>
  );
};

export default SelectItem;

interface Completion {
  completion: boolean;
}

const S = {
  Container: styled.article<Completion>`
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: 13.9rem;
    padding: 1.6rem;
    background-color: ${(props) =>
      props.completion ? props.theme.color.sub4 : props.theme.color.white};
    border-radius: 2rem;

    cursor: pointer;
  `,

  Header: styled.div<Completion>`
    position: absolute;
    top: 1.6rem;

    display: flex;
    align-items: center;
    gap: 0.4rem;

    width: 100%;

    > span:nth-child(1) {
      padding: 0 0.6rem;
      background-color: ${(props) =>
        props.completion ? props.theme.color.main4 : props.theme.color.main2};

      border-radius: 1rem;

      ${fontSmall}
      line-height: 2rem;
      color: ${({ theme }) => theme.color.white};
    }

    > span:nth-child(2) {
      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.sub2};

      span {
        ${fontBold};
      }
    }
  `,

  Body: styled.div<Completion>`
    display: flex;
    flex-direction: column;

    width: 100%;

    > span {
      width: 100%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    > span:nth-child(1) {
      margin-top: 2.6rem;

      ${fontBold};
      line-height: 2.1rem;
      color: ${(props) => (props.completion ? props.theme.color.sub2 : props.theme.color.black)};
    }

    > span:nth-child(2) {
      margin-top: 0.4rem;

      ${fontMedium}
      line-height: 1.8rem;
      color: ${({ theme }) => theme.color.sub2};
    }
  `,

  Footer: styled.div`
    position: absolute;
    bottom: 1.6rem;

    display: flex;
    align-items: center;

    width: 100%;

    > div {
      display: flex;
      align-items: center;
      gap: 0.4rem;

      ${fontSmall}
      color: ${({ theme }) => theme.color.sub2};
    }

    > div:nth-child(2) {
      position: absolute;
      right: 3.6rem;
    }
  `,
};
