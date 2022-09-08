import React from 'react';

import ProfileImg from '../../elements/ProfileImg';

import { nowTime } from '../../../shared/timeCalculation';

import { fontMedium, fontSmall } from '../../../shared/themes/textStyle';

import styled from 'styled-components';

const ChatBox = ({ chatState, userKey }) => {
  return (
    <StChatWrap>
      {chatState.map((chat, idx) => (
        <StChat key={idx}>
          <div
            className={
              chat.userKey === 12
                ? 'system'
                : chat.userKey === parseInt(userKey)
                ? 'right'
                : 'left'
            }
          >
            {chat.User.nickname === 'admin99' ? (
              <div className="middle">
                <div className="chat">{chat.chat}</div>
              </div>
            ) : chatState[idx]?.User.nickname ===
                chatState[idx - 1]?.User.nickname &&
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
                  <div className="nickname">{chat.User.nickname}</div>
                  <div className="chat">{chat.chat}</div>
                </div>

                <span className="time">{nowTime(chat.createdAt)}</span>
              </>
            )}
          </div>
        </StChat>
      ))}
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
    background-color: #d3d3d3;

    height: 2.6rem;
    padding: 3px 6px;
    margin: 1.2rem auto;

    border-radius: 1.3rem;

    .chat {
      ${fontSmall};
      line-height: 2rem;
      color: #fff;
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
      background-color: #515151;

      border-radius: 2rem 0.4rem 2rem 2rem;

      ${fontMedium};
      line-height: 2.1rem;
      color: #fff;
    }

    .time {
      margin-right: 1rem;
      margin-top: auto;

      font-size: 1.2rem;
      line-height: 1.8rem;
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
      background-color: #e4e4e4;

      border-radius: 0.4rem 2rem 2rem 2rem;

      ${fontMedium};
      line-height: 2.1rem;
    }

    .time {
      margin-left: 1rem;
      margin-top: auto;

      font-size: 1.2rem;
      line-height: 1.8rem;
    }
  }
`;
