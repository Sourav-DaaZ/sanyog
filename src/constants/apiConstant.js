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
      allProject: '/all_project',
      allTask: '/all_task',
      createProject: '/create_project',
      createTask: '/create_task',
      editTask: '/edit_task',
      assignTask: '/assign_task',
      getTaskStatus: '/get_task_status',
      getAssignedMembers: '/get_assigned_members',
  },
  authUrls: {
    // add the new api urls here which are inside the authentication
  },
};
