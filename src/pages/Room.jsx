import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { __getRoomBySearch, clearErrorRoom, clearQueryRoom } from "app/module/roomSlice";

import BasicModal from "components/common/modal/BasicModal";
import LoginModal from "components/common/modal/LoginModal";
import JoinModal from "components/features/room/JoinModal";

import Header from "components/common/Header";
import Layout from "components/common/Layout";
import Nav from "components/common/Nav";
import Search from "components/common/Search";
import RoomItem from "components/common/RoomItem";
import WriteButton from "components/elements/WriteButton";
import ScrollTopButton from "components/elements/ScrollTopButton";
import { FEEDBACK_LINK } from "pages/Select";

import useInfiniteScroll from "hooks/useInfiniteScroll";
import useGetRoom from "hooks/useGetRoom";
import useScrollTop from "hooks/useScrollTop";
import useModalState from "hooks/useModalState";

import Logo from "static/images/Logo.svg";
import IconSurvey from "static/icons/Variety=Survey, Status=untab, Size=L.svg";
import { fontMedium } from "shared/themes/textStyle";
import styled from "styled-components";

const Room = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { page, setLastItemRef, refreshPage } = useInfiniteScroll();
  const { data, query, error } = useGetRoom(page);
  const isScroll = useScrollTop();

  const [roomInfo, setRoomInfo] = useState({});
  const handleRoomInfo = (payload) => {
    setRoomInfo(payload);
  };

  const [modal, handleModal, message] = useModalState(false);
  const [loginModal, handleLoginModal] = useModalState(false);
  const [joinModal, handleJoinModal] = useModalState(false);

  return (
    <>
      {error && <BasicModal handleClick={() => dispatch(clearErrorRoom())}>{error}</BasicModal>}
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {joinModal && (
        <JoinModal
          pathname={pathname}
          handleJoinModal={handleJoinModal}
          entered={data.entered}
          roomInfo={roomInfo}
        />
      )}

      <Header w={"4.5rem"}>
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
        <div />
        <a href={FEEDBACK_LINK} target="_blank" rel="noreferrer">
          <img src={IconSurvey} alt="IconSurvey" />
        </a>
      </Header>

      <Search
        query={query}
        refreshPage={refreshPage}
        clearQuery={clearQueryRoom}
        getListBySearch={__getRoomBySearch}
        text="상담방 이름/고민, 태그 검색(10자 이내)"
      />

      <Layout>
        <S.Container>
          {!data.all.length && <span>투표가 없습니다.</span>}
          {data?.all.map((room, idx) => (
            <RoomItem
              key={room.roomKey}
              idx={idx}
              setRef={setLastItemRef}
              roomItem={{ room, entered: data.entered, length: data.all.length }}
              handleModal={{ handleModal, handleLoginModal, handleJoinModal }}
              handleRoomInfo={handleRoomInfo}
            />
          ))}
        </S.Container>
      </Layout>

      <WriteButton pathname={pathname} handleLoginModal={handleLoginModal} />

      {isScroll && <ScrollTopButton />}

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    padding: 14rem 0 9.6rem 0;

    > span {
      margin-top: 4rem;
      ${fontMedium};
    }
  `,
};

export default Room;
