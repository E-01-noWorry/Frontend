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
  console.log(userInfo);
  const [editNickname, setEditNickname] = useState({
    nickname: '',
  });

  useEffect(() => {
    dispatch(kakaoLoginThunk(code));
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
      {localStorage.getItem('userKey') ? (
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
                localStorage.setItem('accessToken', userInfo.accessToken);
                localStorage.setItem('refreshToken', userInfo.refreshToken);
                localStorage.setItem('userKey', userInfo.userKey);
                window.location.replace('/');
              }}
            >
              {successModal}
            </ModalBasic>
          )}
          <Container>
            <Main>닉네임을 설정해주세요.</Main>
            <Main2>닉네임 설정 완료 시 메인 페이지로 이동합니다.</Main2>
            <Objects>
              <form onSubmit={onClickEditNickName}>
                <NicknameInput
                  name="nickname"
                  onChange={onChangeEditNickName}
                  placeholder="닉네임 입력"
                ></NicknameInput>
                <SubmitButton onClick={onClickEditNickName}>저장</SubmitButton>
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
  @media ${({ theme }) => theme.device.PC} {
    position: absolute;
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};

    width: ${({ theme }) => theme.style.width};
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;
const Main = styled.div`
  ${fontLarge}
  margin-bottom: 0.8rem;
`;

const Main2 = styled.div`
  ${fontSmall}
`;
const Sub = styled.div`
  ${fontSmall}
  margin-top: 1rem;
  color: #95918c;
`;
const Objects = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;
const NicknameInput = styled.input`
  border: none;
  border-radius: 2rem;
  width: 22.1rem;
  height: 56px;
  padding: 0.8rem 1.2rem;
  margin-top: 2rem;
  margin-right: 1rem;
  ::placeholder {
    font-size: 1.4rem;
  }
`;
const SubmitButton = styled.button`
  border: none;
  border-radius: 2rem;
  height: 56px;
  width: 10.6rem;
  background-color: ${({ theme }) => theme.main1};
  color: #fff;
`;
