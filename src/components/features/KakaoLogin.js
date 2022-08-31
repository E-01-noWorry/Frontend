import { KAKAO_AUTH_URL } from "./Oauth";

const KakaoLogin = () => {
    return(
        <button href={KAKAO_AUTH_URL}>
	<img></img>
	<span>카카오계정 로그인</span>
</button>

    );
};
export default KakaoLogin;




