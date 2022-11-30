const userIdRegEx = /^[A-Za-z0-9]{6,20}$/;
const passwordRegEx = /^[A-Za-z0-9]{6,20}$/;
const nicknameRegEx = /^[가-힣,A-Za-z0-9]{2,10}$/;

const isValidateUserId = (value) => {
  if (!value) return;

  if (userIdRegEx.test(value)) {
    return "*사용 가능한 아이디 입니다";
  } else {
    return "*영문과 숫자만 사용하여 6~12자의 아이디를 입력해주세요";
  }
};

const isValidatePassword = (value) => {
  if (!value) {
    return;
  } else if (value.length < 6) {
    return "*6자리 이상 입력해주세요";
  } else if (value.length > 20) {
    return "*비밀번호는 최대 20자입니다";
  }

  if (passwordRegEx.test(value)) {
    return "*사용가능한 비밀번호 입니다";
  } else {
    return "*영문, 숫자로만 입력해주세요";
  }
};

const isValidateConfirm = (password, value) => {
  if (!value) return;

  if (password === value) {
    return "*비밀번호와 일치합니다";
  } else {
    return "*비밀번호가 일치하지 않습니다";
  }
};

const isValidateNickname = (value) => {
  if (!value) {
    return "*익명으로 안심하고 고민을 이야기할 수 있어요";
  }

  if (nicknameRegEx.test(value)) {
    return "*사용 가능한 닉네임 입니다";
  } else {
    return "*한글, 영문, 숫자로만 2~10자로 입력해주세요";
  }
};

export { isValidateUserId, isValidatePassword, isValidateConfirm, isValidateNickname };
