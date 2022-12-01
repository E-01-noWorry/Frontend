import { useCallback, useState } from "react";

type ReturnTypes = [boolean, (msg?: string) => void, string];

const useModalState = (initialState: boolean): ReturnTypes => {
  const [modal, setModal] = useState(initialState);
  const [message, setMessage] = useState("");

  const handleModal = useCallback((msg = "") => {
    setModal((prev) => !prev);

    if (msg) {
      setMessage(msg);
    } else {
      setMessage("");
    }
  }, []);

  return [modal, handleModal, message];
};

export default useModalState;
