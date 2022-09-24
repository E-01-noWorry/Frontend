import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from '../../../app/module/instance';

import BodyPadding from '../../common/BodyPadding';
import { ModalBasic } from '../../common/Modal';

import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconMedium, IconSmall } from '../../../shared/themes/iconStyle';
import {
  fontBold,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

import IconPerson from '../../../static/icons/Variety=person, Status=untab, Size=S.svg';
import IconSearch from '../../../static/icons/Variety=search, Status=untab, Size=M.svg';
import IconAnnounce from '../../../static/icons/Variety=announce, Status=untab, Size=M.svg';
import IconAnnounced from '../../../static/icons/Variety=announced, Status=untab, Size=M.svg';

import styled from 'styled-components';

const MainRoom = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useState('');
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState(false);
  const searchRef = useRef();

  //무한 스크롤을 관리하는 State
  const [page, setPage] = useState(1);
  const [ref, setRef] = useState(null);

  const getAllRoom = async () => {
    try {
      const { data } = await instance.get(`/room?page=${page}`);
      setRooms((prev) => [...prev, ...data.result]);
    } catch (error) {
      console.log(error.response.data.errMsg);
    }
  };

  useEffect(() => {
    if (search) return;
    getAllRoom();
  }, [page]);

  //지정한 대상이 관찰되면 page를 1 올려주고 대상을 해제한다.
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      setPage((prev) => prev + 1);
      observer.unobserve(entry.target);
    }
  };

  //매번 갱신되기 전 마지막 게시글에 붙어있는 ref를 감시하라고 지정해준다
  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(ref);
    }
    return () => observer?.disconnect();
  }, [ref]);

  //고민 채팅방 입장 POST API
  const joinRoomHandler = async (roomKey) => {
    try {
      await instance.post(`/room/${roomKey}`);
      navigate(`/chatroom/${roomKey}`, { state: { now: 'room' } });
    } catch (error) {
      setModal(error.response.data.errMsg);
    }
  };

  //고민 채팅방 키워드 검색
  const searchHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await instance.get(
        `/room/search?searchWord=${searchRef.current.value}`,
      );
      setSearch(true);
      setRooms([...data.result]);
    } catch (error) {
      setModal(error.response.data.errMsg);
    }
    searchRef.current.value = '';
  };

  //고민 채팅방 검색 취소버튼
  const searchCancelHandler = () => {
    searchRef.current.value = '';
    if (search) {
      setRooms([]);
      setPage(1);
      setSearch(false);
    }
  };

  return (
    <>
      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      <StSearchWrap length={rooms.length}>
        <form onSubmit={searchHandler}>
          <input
            maxLength={10}
            placeholder="채팅방 이름/고민, 태그 검색(10자 이내)"
            ref={searchRef}
          />
          <div onClick={searchHandler}>
            <img src={IconSearch} alt="IconSearch" />
          </div>
        </form>
        <StCancel onClick={searchCancelHandler}>취소</StCancel>
      </StSearchWrap>

      <BodyPadding>
        {rooms.length === 0 && (
          <StNoneContents>상담방이 없습니다.</StNoneContents>
        )}
        <StContentBoxWrap>
          {rooms?.map((room, idx) => (
            <StContentBox
              key={room.roomKey}
              onClick={() => joinRoomHandler(room.roomKey)}
              cur={room.currentPeople}
              max={room.max}
              //마지막 게시글에 ref를 달아줍니다
              ref={idx === rooms.length - 1 ? setRef : null}
            >
              <StInnerTitle cur={room.currentPeople} max={room.max}>
                {room.currentPeople === room.max ? (
                  <img src={IconAnnounced} alt="IconAnnounced" />
                ) : (
                  <img src={IconAnnounce} alt="IconAnnounce" />
                )}
                <span>{room.title}</span>
              </StInnerTitle>

              <StInnerKeywordWrap>
                {room.hashTag?.map((item) => (
                  <StInnerKeyword
                    key={item}
                    cur={room.currentPeople}
                    max={room.max}
                  >
                    #{item}{' '}
                  </StInnerKeyword>
                ))}
              </StInnerKeywordWrap>

              <StContentFooter>
                <StInnerCurrent>
                  <StPeopleIcon>
                    <img src={IconPerson} alt="IconPerson" />
                  </StPeopleIcon>
                  <span>
                    {room.currentPeople}/{room.max} 명
                  </span>
                </StInnerCurrent>

                <StInnerNickname>
                  작성자 <span>{room.host}</span>
                </StInnerNickname>
              </StContentFooter>
            </StContentBox>
          ))}
        </StContentBoxWrap>
      </BodyPadding>
    </>
  );
};

export default MainRoom;

const StNoneContents = styled.div`
  width: 100%;
  margin-top: 16.9rem;

  ${fontMedium}
  text-align: center;
`;

const StSearchWrap = styled.div`
  position: fixed;
  top: 6.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  width: 100%;
  height: 6.4rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.bg};

  border-bottom: ${(props) =>
    props.length ? null : `1px solid ${props.theme.sub4}`};

  z-index: 9;

  form {
    position: relative;
    width: 100%;

    input {
      width: 100%;
      height: 4rem;
      padding: 0 1.5rem;
      background-color: ${({ theme }) => theme.white};

      border: none;
      border-radius: 2rem;

      &:focus {
        outline: none;
      }
    }

    div {
      position: absolute;
      top: 0.8rem;
      right: 0.8rem;
      ${IconMedium};
    }
  }
`;

const StCancel = styled.div`
  width: 3rem;

  ${fontMedium}
`;

const StContentBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-top: 14rem;
  margin-bottom: 9.6rem;
`;

const StContentBox = styled.div`
  position: relative;
  ${borderBoxDefault};

  height: 11.4rem;
  padding: 1.6rem;
  background-color: ${(props) =>
    props.cur === props.max ? props.theme.sub4 : props.theme.white};
`;

const StInnerTitle = styled.div`
  position: absolute;
  top: 1.6rem;
  left: 1.6rem;

  display: flex;
  align-items: center;

  img {
    width: 2rem;
  }

  span {
    ${fontBold};
    line-height: 2.1rem;
    color: ${(props) =>
      props.cur === props.max ? props.theme.sub2 : props.theme.black};
  }
`;

const StInnerKeywordWrap = styled.div`
  position: absolute;
  top: 4.1rem;
  left: 1.6rem;

  display: flex;
  gap: 0.6rem;
`;

const StInnerKeyword = styled.span`
  height: 100%;
  padding: 0 0.5rem;
  background-color: ${(props) =>
    props.cur === props.max ? '#D8D0C5' : props.theme.sub4};

  border-radius: 1rem;

  ${fontSmall}
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};
`;

const StContentFooter = styled.div`
  position: absolute;
  bottom: 0;

  width: 100%;
`;

const StInnerNickname = styled.div`
  position: absolute;
  bottom: 1.6rem;
  right: 1.6rem;

  ${fontSmall};
  line-height: 2rem;
  color: ${({ theme }) => theme.sub2};

  span {
    ${fontBold};
  }
`;

const StInnerCurrent = styled.div`
  position: absolute;
  bottom: 1.6rem;
  left: 1.6rem;

  display: flex;
  gap: 0.25rem;

  ${fontMedium};
  line-height: 2.1rem;
  color: ${({ theme }) => theme.sub2};
`;

const StPeopleIcon = styled.div`
  ${IconSmall};
`;
