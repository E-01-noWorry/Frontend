import React, { useEffect, useRef, useState } from 'react';

import ProfileImg from '../../elements/ProfileImg';

import { nowTime } from '../../../shared/timeCalculation';

import {
  fontExtraSmall,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

import IconDropdown from '../../../static/icons/Variety=Dropdown, Status=untab, Size=S.svg';

import styled from 'styled-components';

import _ from 'lodash';

const ChatBox = ({ chatState, userKey }) => {
  const scrollRef = useRef();
  const [scrollState, setScrollState] = useState(true);

  const scrollEvent = _.debounce((event) => {
    const totalHeight = document.body.scrollHeight;
    const scrollHeight = window.innerHeight;
    const myHeight = event.srcElement.scrollingElement.scrollTop;

    setScrollState(totalHeight <= scrollHeight + myHeight);
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);
  }, []);

  useEffect(() => {
    if (!scrollState) return;
    scrollRef.current.scrollIntoView();
  }, [chatState]);

  return (
    <StChatWrap>
      {!scrollState && (
        <StNewMessage onClick={() => scrollRef.current.scrollIntoView()}>
          <span>최근 메세지 보기</span>
          <img src={IconDropdown} alt="IconDropdown" />
        </StNewMessage>
      )}

      {chatState.map((chat, idx) => (
        <StChat key={idx}>
          {/* userKey로 시스템메세지, 내 메세지, 상대의 메세지를 판단합니다 */}
          <div
            className={
              chat.userKey === 12
                ? 'system'
                : chat.userKey === parseInt(userKey)
                ? 'right'
                : 'left'
            }
          >
            {chat.userKey === 12 ? (
              <div className="middle">
                <div className="chat">{chat.chat}</div>
              </div>
            ) : chatState[idx]?.userKey === chatState[idx - 1]?.userKey &&
              nowTime(chatState[idx].createdAt) ===
                nowTime(chatState[idx - 1].createdAt) ? (
              <div className="sametime">
                <div className="chat">{chat.chat}</div>
              </div>
            ) : (
              <>
                <ProfileImg className="img" point={chat.User?.point} />
                <div>
                  <div className="nickname">
                    {chat.userKey === parseInt(userKey)
                      ? ''
                      : chat.User?.nickname}
                  </div>
                  <div className="middle">
                    <div className="chat">{chat.chat}</div>
                    <span className="time">{nowTime(chat.createdAt)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </StChat>
      ))}
      <div ref={scrollRef} />
    </StChatWrap>
  );
};

export default ChatBox;

const StChatWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 11rem;
  padding-bottom: 8rem;
`;

const StNewMessage = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10rem;
  transform: translateX(-50%);

  display: flex;
  align-items: center;

  height: 2.6rem;
  padding: 0.3rem 0.6rem 0.3rem 1rem;
  background-color: ${({ theme }) => theme.white};

  border-radius: 1.3rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

  span {
    ${fontSmall};
    line-height: 2rem;
    color: ${({ theme }) => theme.sub2};
  }
`;

const StChat = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  //시스템 메세지 CSS
  .system {
    display: inline-block;

    height: 2.6rem;
    padding: 3px 6px;
    margin: 1.2rem auto;
    background-color: ${({ theme }) => theme.sub3};

    border-radius: 1.3rem;

    .chat {
      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.white};
    }
  }

  //나의 채팅 CSS
  .right {
    display: flex;
    flex-direction: row-reverse;

    width: 100%;
    height: 100%;
    margin: 1.2rem 0;

    .img {
      margin-left: 0.8rem;
    }

    .nickname {
      height: 2rem;
      text-align: end;
      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.sub2};
    }

    .middle {
      display: flex;
      flex-direction: row-reverse;
    }

    .sametime {
      margin-top: -1.2rem;
      margin-right: 4.8rem;
    }

    .chat {
      display: inline-block;

      max-width: 21.3rem;
      padding: 1rem;
      background-color: ${({ theme }) => theme.main2};

      border-radius: 2rem 0.4rem 2rem 2rem;

      ${fontMedium};
      line-height: 2.1rem;
      color: ${({ theme }) => theme.white};
    }

    .time {
      margin-right: 1rem;
      margin-top: auto;

      ${fontExtraSmall};
      line-height: 1.8rem;
      color: ${({ theme }) => theme.sub3};
    }
  }

  //다른 사람의 채팅 CSS
  .left {
    display: flex;

    width: 100%;
    height: 100%;
    margin: 1.2rem 0;

    .img {
      margin-right: 0.8rem;
    }

    .nickname {
      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.sub2};
    }

    .middle {
      display: flex;
    }

    .sametime {
      margin-top: -1.2rem;
      margin-left: 4.8rem;
    }

    .chat {
      display: inline-block;

      max-width: 21.3rem;
      padding: 1rem;
      background-color: ${({ theme }) => theme.white};

      border-radius: 0.4rem 2rem 2rem 2rem;

      ${fontMedium};
      line-height: 2.1rem;
    }

    .time {
      margin-left: 1rem;
      margin-top: auto;

      ${fontExtraSmall};
      line-height: 1.8rem;
      color: ${({ theme }) => theme.sub3};
    }
  }
`;
