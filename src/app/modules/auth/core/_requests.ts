import axios from 'axios'
import {makeApiCall} from '../../utils/get-url-end-point'
import {
  LoginModel,
  UserModel,
  ResetPasswordModel,
  RegisterModel,
  ResponseUserModel,
} from './_models'
import {PaginationRequest} from '../../utils/pagination-item'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export const loginUser = async (payload: LoginModel): Promise<any> => {
  return await makeApiCall({
    action: 'loginUser',
    body: payload,
  })
}

// Server should return AuthModel
export const registerUser = async (payload: RegisterModel): Promise<any> => {
  return await makeApiCall({
    action: 'registerUser',
    body: payload,
  })
}
// export function register(
//   email: string,
//   firstname: string,
//   lastname: string,
//   password: string,
//   password_confirmation: string
// ) {
//   return axios.post(REGISTER_URL, {
//     email,
//     first_name: firstname,
//     last_name: lastname,
//     password,
//     password_confirmation,
//   })
// }

// Server should return object => { result: boolean } (Is Email in DB)
export const requestPassword = async (payload: {email: string}): Promise<any> => {
  return await makeApiCall({
    action: 'passwordReset',
    body: payload,
  })
}

export const resetPassword = async (payload: ResetPasswordModel): Promise<any> => {
  const {token, password, passwordConfirm} = payload
  return await makeApiCall({
    action: 'resetPassword',
    body: {password, passwordConfirm},
    urlParams: {token},
  })
}

export const getAllUsers = async (
  payload: PaginationRequest
): Promise<{data: ResponseUserModel}> => {
  return await makeApiCall({
    action: 'getUsers',
    queryParams: payload,
  })
}

export const getOneUser = async (payload: {userId: string}): Promise<any> => {
  const {userId} = payload
  return await makeApiCall({
    action: 'getOneUser',
    urlParams: {userId},
  })
}
// export function requestPassword(email: string) {
//   return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
//     email,
//   })
// }

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
