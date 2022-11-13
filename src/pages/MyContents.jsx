import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import SelectItem from "components/common/SelectItem";
import RoomItem from "components/common/RoomItem";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import useGetMyContents from "hooks/useGetMyContents";

import { fontMedium } from "shared/themes/textStyle";
import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import styled from "styled-components";

const titleTransform = (pathname) => {
  switch (pathname) {
    case "/postvoted":
      return "내가 등록한 고민 투표";
    case "/voted":
      return "내가 투표한 고민 투표";
    case "/maderoom":
      return "내가 만든 고민 상담방";
    case "/operatingroom":
      return "대화중인 고민 상담방";
    default:
      break;
  }
};

const MyContents = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { page, setLastItemRef } = useInfiniteScroll();

  const list = useGetMyContents(page, pathname);

  return (
    <>
      <S.Header length={list.length}>
        <img src={IconBack} alt="IconBack" onClick={() => navigate(-1)} />
        <h1>{titleTransform(pathname)}</h1>
      </S.Header>

      <Layout>
        <S.Container>
          {pathname === "/postvoted" || pathname === "/voted" ? (
            <>
              {!list.length && <span>투표가 없습니다.</span>}
              {list?.map((item, idx) => (
                <SelectItem
                  key={item.selectKey}
                  item={item}
                  idx={idx}
                  setRef={setLastItemRef}
                  length={list.length}
                />
              ))}
            </>
          ) : (
            <>
              {!list.length && <span>상담방이 없습니다.</span>}
              {list?.map((item, idx) => (
                <RoomItem
                  key={item.roomKey}
                  idx={idx}
                  setRef={setLastItemRef}
                  roomItem={{ room: item, length: list.length }}
                />
              ))}
            </>
          )}
        </S.Container>
      </Layout>
    </>
  );
};

const S = {
  Header: styled(Header)`
    border-bottom: ${(props) => (props.length ? null : `1px solid ${props.theme.sub4}`)};
  `,

  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    padding: 6.4rem 0 9.6rem 0;

    > span {
      margin-top: 4rem;
      ${fontMedium};
    }
  `,
};

export default MyContents;
