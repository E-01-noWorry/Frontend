import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearDataRoom, clearQueryRoom } from "app/module/roomSlice";
import { __getRoomAll, __getRoomBySearch } from "app/module/roomSlice";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import Nav from "components/common/Nav";
import Search from "components/common/Search";
import RoomItem from "components/common/RoomItem";

import useInfiniteScroll from "hooks/useInfiniteScroll";

import Logo from "static/images/Logo.svg";
import IconSurvey from "static/icons/Variety=Survey, Status=untab, Size=L.svg";
import styled from "styled-components";

const Room = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { page, setLastItemRef, refreshPage } = useInfiniteScroll();

  const { all, entered } = useSelector((state) => state.room.data);
  const query = useSelector((state) => state.room.query);
  const error = useSelector((state) => state.room.error);

  useEffect(() => {
    if (query) return;

    dispatch(__getRoomAll(page));
  }, [dispatch, query, page]);

  useEffect(() => {
    return () => dispatch(clearDataRoom());
  }, [dispatch]);

  return (
    <>
      <Header w={"4.5rem"}>
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
        <div />
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeHPoDci-rlaFfTEteUDaJXwnoVvvLUKDBQ831gb1o1U6fF5A/viewform"
        >
          <img src={IconSurvey} alt="IconSurvey" />
        </a>
      </Header>

      <Search
        query={query}
        refreshPage={refreshPage}
        clearQuery={clearQueryRoom}
        getListBySearch={__getRoomBySearch}
        text="채팅방 이름/고민, 태그 검색(10자 이내)"
      />

      <Layout>
        <S.Container>
          {all?.map((room, idx) => (
            <RoomItem
              key={room.roomKey}
              room={room}
              idx={idx}
              entered={entered}
              setRef={setLastItemRef}
              length={all.length}
            />
          ))}
        </S.Container>
      </Layout>

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    padding: 14rem 0 9.6rem 0;
  `,
};

export default Room;
