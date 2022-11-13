import { useState } from "react";

const useModalState = (initialState) => {
  const [modal, setModal] = useState(initialState);
  const [message, setMessage] = useState("");

  const handleModal = (msg) => {
    setModal((prev) => !prev);

    if (msg) {
      setMessage(msg);
    } else {
      setMessage("");
    }
  };

  return [modal, handleModal, message];
};

export default useModalState;
