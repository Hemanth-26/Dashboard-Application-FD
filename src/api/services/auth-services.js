import httpClient from "../http-client";
import {
  LOGIN,
  REGISTER,
  VERIFY_OTP,
  RESEND_OTP,
  FORGOT_PASSWORD,
  CONFIRM_PASSWORD,
  DASHBOARD,
  TODOS,
  ALL_TODOS,
  REMOVE_TODOS,
  UPDATE_TODOS,
  USER,
  USER_EDIT,
} from "../config";

const AuthServices = {
  /** Pre-Login Routes */
  register: (data) =>
    httpClient.post(REGISTER, data).then((response) => response.data),
  verifyOtp: (data) =>
    httpClient.post(VERIFY_OTP, data).then((response) => response.data),
  resendOtp: (data) =>
    httpClient.post(RESEND_OTP, data).then((response) => response.data),
  forgotPassword: (data) =>
    httpClient.post(FORGOT_PASSWORD, data).then((response) => response.data),
  confirmPassword: (data) =>
    httpClient.post(CONFIRM_PASSWORD, data).then((response) => response.data),
  login: (data) =>
    httpClient.post(LOGIN, data).then((response) => response.data),

  /** Dashboard Routes */
  dashboard: () => httpClient.get(DASHBOARD).then((response) => response.data),

  /** Todo Routes */
  getTodos: () => httpClient.get(TODOS).then((response) => response.data),
  getAllTodos: () => httpClient.get(ALL_TODOS).then((response) => response.data),
  addTodos: (data) =>
    httpClient.post(TODOS, data).then((response) => response.data),
  updateTodo: (todoId, data) =>
    httpClient
      .post(`${UPDATE_TODOS}/${todoId}`, data)
      .then((response) => response.data),
  removeTodo: (todoId) =>
    httpClient
      .post(`${REMOVE_TODOS}/${todoId}`)
      .then((response) => response.data),

  /** User Routes */
  getUser: () => httpClient.get(USER).then((response) => response.data),
  editUser: (data) =>
    httpClient.post(USER_EDIT, data).then((response) => response.data),
};

export default AuthServices;
