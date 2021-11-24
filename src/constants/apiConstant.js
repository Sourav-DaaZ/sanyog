export const API = {
  currentEnv: 'dev', //   api server environment : <dev/qa/prod>
  baseUrls: {
    // dev: 'https://project-management-system-app.herokuapp.com/api',
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
      getTagTask: '/get_tag_task',
      createProject: '/create_project',
      createTask: '/create_task',
      editTask: '/edit_task',
      assignTask: '/assign_task',
      assignProject: '/assign_project',
      getTaskStatus: '/get_task_status',
      getAssignedMembers: '/get_assigned_members',
  },
  authUrls: {
    // add the new api urls here which are inside the authentication
  },
};
