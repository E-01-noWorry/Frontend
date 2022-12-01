import React, { useState } from "react";
import {
  isValidateConfirm,
  isValidateNickname,
  isValidatePassword,
  isValidateUserId,
} from "shared/utils/validate";

const initialValue = {
  userId: "",
  password: "",
  confirm: "",
  nickname: "",
};

const useSignUpInput = () => {
  const [signUpInfo, setSignUpInfo] = useState(initialValue);
  const [validateInfo, setValidateInfo] = useState({
    ...initialValue,
    nickname: "*익명으로 안심하고 고민을 이야기할 수 있어요",
  });

  const handleVlidate = (name: string, value: string) => {
    switch (name) {
      case "userId":
        setValidateInfo((prev) => ({ ...prev, userId: isValidateUserId(value) }));
        break;
      case "password":
        setValidateInfo((prev) => ({ ...prev, password: isValidatePassword(value) }));
        break;
      case "confirm":
        setValidateInfo((prev) => ({
          ...prev,
          confirm: isValidateConfirm(signUpInfo.password, value),
        }));
        break;
      case "nickname":
        setValidateInfo((prev) => ({ ...prev, nickname: isValidateNickname(value) }));
        break;
      default:
        break;
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setSignUpInfo({ ...signUpInfo, [name]: value });
    handleVlidate(name, value);
  };

  return { signUpInfo, validateInfo, handleOnChange };
};

export default useSignUpInput;
