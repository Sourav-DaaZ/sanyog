export const API = {
  currentEnv: 'dev', //   api server environment : <dev/qa/prod>
  baseUrls: {
    dev: 'http://192.168.29.36:5000/api',
    qa: '',
    uat: '',
    prod: '',
  },
  noAuthUrls: {
      loginUser: '/login',
      otpVerify: '/email_varification',
      registerUser: '/register_user',
  },
  authUrls: {
    // add the new api urls here which are inside the authentication
  },
};
