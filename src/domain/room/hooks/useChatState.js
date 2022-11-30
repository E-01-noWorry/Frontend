import { useCallback, useEffect, useState } from "react";
import instance from "app/module/instance";
import { io } from "socket.io-client";

const useChatState = ({ socket, roomKey, userKey }) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [chat, setChat] = useState([]);

  const [kickMessage, setKickMessage] = useState({ key: null, msg: "" });
  const [hostMessage, setHostMessage] = useState("");

  const __getChatState = useCallback(async () => {
    const { data } = await instance.get(`/room/${roomKey}`);
    setRoomInfo(data.result);
    setChat(data.loadChat);
  }, [roomKey]);

  useEffect(() => {
    __getChatState();

    socket.current = io(process.env.REACT_APP_SOCKET);
    socket.current.emit("join-room", { roomKey, userKey });

    return () => {
      socket.current.disconnect();
    };
  }, [__getChatState, roomKey, userKey, socket]);

  useEffect(() => {
    socket.current.on("message", (data) => {
      setChat((prev) => [
        ...prev,
        {
          chat: data.message,
          userKey: data.userKey,
          User: { nickname: data.nickname, point: data.point },
          createdAt: data.time,
        },
      ]);
    });

    socket.current.on("welcome", (data) => {
      setChat((prev) => [
        ...prev,
        {
          chat: `${data.nickname}님이 입장했습니다.`,
          userKey: 12,
          User: { nickname: "admin99" },
        },
      ]);
    });

    socket.current.on("bye", (data) => {
      setChat((prev) => [
        ...prev,
        {
          chat: `${data.nickname}님이 퇴장했습니다.`,
          userKey: 12,
          User: { nickname: "admin99" },
        },
      ]);
    });

    socket.current.on("expulsion", (data) => {
      if (data.userKey === userKey) {
        setChat([]);
        setKickMessage((prev) => ({
          ...prev,
          key: data.userKey,
          msg: `${data.nickname}님이 강퇴됐습니다.`,
        }));
      } else {
        setChat((prev) => [
          ...prev,
          {
            chat: `${data.nickname}님이 강퇴됐습니다.`,
            userKey: 12,
            User: { nickname: "admin99" },
          },
        ]);
      }
    });

    socket.current.on("byeHost", () => {
      setChat([]);
      setHostMessage("호스트가 채팅방을 삭제했습니다.");
    });
  }, [socket, userKey]);

  return { roomInfo, chat, kickMessage, hostMessage };
};

export default useChatState;
