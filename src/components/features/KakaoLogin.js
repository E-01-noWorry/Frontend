import { KAKAO_AUTH_URL } from "./Oauth";
import { kakaoLoginThunk } from "../../app/module/kakaoSlice";
import { useDispatch } from "react-redux";

const KakaoLogin = () => {

const dispatch = useDispatch();
const onClickKakao = () => {
    dispatch(kakaoLoginThunk());
}

    return(
        <a href='http://jolee.shop/api/auth/kakao' target='_blank'>
	<button onClick={()=>onClickKakao()}>카카오계정 로그인</button>
</a>

    );
};
export default KakaoLogin;




