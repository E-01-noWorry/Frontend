import React from "react";

import ProfileImg from "common/elements/ProfileImg";
import Layout from "common/components/Layout";

import useScrollHeight from "domain/room/hooks/useScrollHeight";
import { nowTime } from "shared/utils/timeCalculation";
import { fontExtraSmall, fontMedium, fontSmall } from "shared/themes/textStyle";

import IconDropdown from "static/icons/Variety=Dropdown, Status=untab, Size=S.svg";
import styled from "styled-components";

const ChatBox = ({ chat, userKey }) => {
  const { scrollRef, scrollState } = useScrollHeight(chat);

  const divideMessageType = (key) => {
    if (key === 12) {
      return "system";
    } else if (key === userKey) {
      return "right";
    } else {
      return "left";
    }
  };

  const isSameTime = (idx) => {
    return (
      chat[idx]?.userKey === chat[idx - 1]?.userKey &&
      nowTime(chat[idx]?.createdAt) === nowTime(chat[idx - 1]?.createdAt)
    );
  };

  return (
    <>
      {!scrollState && (
        <S.NewMessage>
          <div onClick={() => scrollRef.current.scrollIntoView({ behavior: "smooth" })}>
            <span>마지막 메세지</span>
            <img src={IconDropdown} alt="IconDropdown" />
          </div>
        </S.NewMessage>
      )}

      <Layout>
        <S.ChatContainer>
          {chat.map((item, idx) => (
            <S.Chat key={idx}>
              <div className={divideMessageType(item.userKey)}>
                {/* 시스템 메세지 */}
                {item.userKey === 12 && <div className="chat">{item.chat}</div>}

                {/* 유저 메세지 */}
                {item.userKey !== 12 && !isSameTime(idx) && (
                  <>
                    <ProfileImg className="img" point={item.User.point} size={"4rem"} />
                    <div>
                      <div className="nickname">
                        {item.userKey === parseInt(userKey) ? "" : item.User?.nickname}
                      </div>
                      <div className="middle">
                        <div className="chat">{item.chat}</div>
                        <span className="time">{nowTime(item.createdAt)}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* 같은 시간에 온 유저 메세지 */}
                {item.userKey !== 12 && isSameTime(idx) && (
                  <div className="sametime">
                    <div className="chat">{item.chat}</div>
                  </div>
                )}
              </div>
            </S.Chat>
          ))}
          <div ref={scrollRef} />
        </S.ChatContainer>
      </Layout>
    </>
  );
};

const S = {
  ChatContainer: styled.section`
    padding: 11rem 0 8rem 0;
  `,

  NewMessage: styled.div`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10rem;

    display: flex;
    justify-content: center;
    width: 100%;

    z-index: 9;

    div {
      display: flex;
      align-items: center;

      height: 3.2rem;
      padding: 0.3rem 0.6rem 0.3rem 1rem;
      background-color: ${({ theme }) => theme.white};
      border-radius: 1.6rem;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.08);

      cursor: pointer;

      span {
        ${fontSmall};
        line-height: 2rem;
        color: ${({ theme }) => theme.sub2};
      }
    }
  `,

  Chat: styled.article`
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

        word-wrap: break-word;
        word-break: break-all;
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

        word-wrap: break-word;
        word-break: break-all;
      }

      .time {
        margin-left: 1rem;
        margin-top: auto;

        ${fontExtraSmall};
        line-height: 1.8rem;
        color: ${({ theme }) => theme.sub3};
      }
    }
  `,
};

export default ChatBox;
