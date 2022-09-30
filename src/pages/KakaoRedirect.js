import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { kakaoLoginThunk } from '../app/module/kakaoSlice';
import axios from 'axios';
import { ModalBasic } from '../components/common/Modal';
import { fontLarge, fontSmall } from '../shared/themes/textStyle';
import Loading from './Loading';

const KakaoRedirect = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.kakao);
  const [modal, setModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  let params = new URL(document.URL).searchParams;
  let code = params.get('code');

  const [editNickname, setEditNickname] = useState({
    nickname: '',
  });

  useEffect(() => {
    dispatch(kakaoLoginThunk(code)).then(() => {
      if (localStorage.getItem('nickname')) {
        window.location.replace('/');
      }
    });
  }, [dispatch]);

  const onClickEditNickName = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.put(
        `${process.env.REACT_APP_API}/user/nickname`,
        editNickname,
        {
          headers: {
            accessToken: `Bearer ${userInfo.accessToken}`,
            refreshToken: `Bearer ${userInfo.refreshToken}`,
          },
        },
      );
      localStorage.setItem('nickname', data.data.nickname);
      localStorage.setItem('accessToken', userInfo.accessToken);
      localStorage.setItem('refreshToken', userInfo.refreshToken);
      localStorage.setItem('userKey', userInfo.userKey);
      setSuccessModal('닉네임 설정에 성공하였습니다.');
    } catch (error) {
      setModal(error.response.data.errMsg);
    }
  };

  const onChangeEditNickName = (event) => {
    const { name, value } = event.target;
    setEditNickname({ [name]: value });
  };

  return (
    <>
      {localStorage.getItem('nickname') ? (
        <Loading />
      ) : (
        <>
          {modal && (
            <ModalBasic
              setter={() => {
                setModal('');
              }}
            >
              {modal}
            </ModalBasic>
          )}

          {successModal && (
            <ModalBasic
              setter={() => {
                setSuccessModal('');
                window.location.replace('/');
              }}
            >
              {successModal}
            </ModalBasic>
          )}
          <Container>
            <Main>닉네임을 설정해주세요.</Main>
            <Sub></Sub>
            <Objects>
              <form onSubmit={onClickEditNickName}>
                <NicknameInput
                  name="nickname"
                  onChange={onChangeEditNickName}
                  placeholder="2~10자 한글,영어,숫자로만 입력해주세요."
                ></NicknameInput>
                <SubmitButton onClick={onClickEditNickName}>제출</SubmitButton>
              </form>
            </Objects>
            <Sub>*익명으로 안심하고 고민을 이야기할 수 있어요. </Sub>
            <Sub>*닉네임은 마이페이지에서 변경이 가능합니다.</Sub>
          </Container>
        </>
      )}
    </>
  );
};

export default KakaoRedirect;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Main = styled.div`
  ${fontLarge}
  margin-top: 10rem;
`;
const Sub = styled.div`
  ${fontSmall}
  margin-top: 1rem;
  color: gray;
`;
const Objects = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const NicknameInput = styled.input`
  border: none;
  border-radius: 2rem;
  height: 35px;
  padding: 0.5rem;
  margin-top: 2rem;
  margin-right: 1rem;
  ::placeholder {
    font-size: 1rem;
  }
`;
const SubmitButton = styled.button`
  border: none;
  border-radius: 2rem;
  height: 30px;
  background-color: ${({ theme }) => theme.main1};
  color: #fff;
`;
