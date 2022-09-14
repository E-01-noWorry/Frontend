import React, { useEffect, useRef } from 'react';

import ProfileImg from '../../elements/ProfileImg';

import { nowTime } from '../../../shared/timeCalculation';

import {
  fontExtraSmall,
  fontMedium,
  fontSmall,
} from '../../../shared/themes/textStyle';

import styled from 'styled-components';

const ChatBox = ({ chatState, userKey }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [chatState]);

  return (
    <StChatWrap>
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
              <>
                <div className="sametime">
                  <div className="chat">{chat.chat}</div>
                </div>
              </>
            ) : (
              <>
                <ProfileImg className="img" />

                <div className="middle">
                  <div className="nickname">{chat.User?.nickname}</div>
                  <div className="chat">{chat.chat}</div>
                </div>

                <span className="time">{nowTime(chat.createdAt)}</span>
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
  margin-top: 11rem;
  margin-bottom: 8rem;
`;

const StChat = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  //시스템 메세지 CSS
  .system {
    display: inline-block;
    background-color: ${({ theme }) => theme.sub3};

    height: 2.6rem;
    padding: 3px 6px;
    margin: 1.2rem auto;

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

    .middle {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .nickname {
        ${fontSmall};
        line-height: 2rem;
        color: ${({ theme }) => theme.sub2};
      }
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
      margin-right: 1.6rem;
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

    .middle {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      .nickname {
        ${fontSmall};
        line-height: 2rem;
        color: ${({ theme }) => theme.sub2};
      }
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
      margin-left: 1.6rem;
      margin-top: auto;

      ${fontExtraSmall};
      line-height: 1.8rem;
      color: ${({ theme }) => theme.sub3};
    }
  }
`;
