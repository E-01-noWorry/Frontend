import React from "react";

const CLIENT_ID = "8801c8d86f9616eeff8e8b3de693f546";
const REDIRECT_URI =  "http://localhost:3000/api/autho/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;