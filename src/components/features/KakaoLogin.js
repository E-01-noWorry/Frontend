import { KAKAO_AUTH_URL } from './Oauth';
import { kakaoLoginThunk } from '../../app/module/kakaoSlice';
import { useDispatch } from 'react-redux';

const KakaoLogin = () => {
  const dispatch = useDispatch();

  return (
    <a href={KAKAO_AUTH_URL}>
      <button>카카오계정 로그인</button>
    </a>
  );
};
export default KakaoLogin;
