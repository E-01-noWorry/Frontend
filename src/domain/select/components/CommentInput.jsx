import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { __postComment } from "app/module/commentSlice";
import FooterInput from "common/components/FooterInput";
import IconSend from "static/icons/Variety=send, Status=untab, Size=L.svg";
import { userStorage } from "shared/utils/localStorage";

const CommentInput = ({ selectKey, handleLoginModal, handleModal }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handlePostComment = (event) => {
    event.preventDefault();

    if (!userStorage.getToken()) {
      handleLoginModal();
      return;
    }

    if (!comment.trim().length) {
      handleModal("내용을 입력해주세요.");
    } else {
      dispatch(__postComment({ selectKey, comment }));
    }

    setComment("");
  };

  return (
    <FooterInput>
      <form onSubmit={handlePostComment}>
        <input value={comment} onChange={handleChange} placeholder="더 좋은 의견을 남겨주세요." />
        <img onClick={handlePostComment} src={IconSend} alt="IconSend" />
      </form>
    </FooterInput>
  );
};

export default CommentInput;
