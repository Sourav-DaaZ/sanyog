export const API = {
  currentEnv: 'dev', //   api server environment : <dev/qa/prod>
  baseUrls: {
    dev: 'http://localhost:5000/api',
    qa: '',
    uat: '',
    prod: '',
  },
  noAuthUrls: {
      loginUser: '/login',
      otpVerify: '/email_varification',
      registerUser: '/register_user',
      verifyUserName: '/check_username',
      findUser: '/find_user',
  },
  authUrls: {
    // add the new api urls here which are inside the authentication
  },
};
