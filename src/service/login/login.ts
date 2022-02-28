import fancyRequest from '../index'
import {
  Account,
  CaptchaDataType,
  LoginResponseDataType,
  UserInfoType,
  RefreshTokenDataType
} from './types'
import { FancyDataReponseType } from '../request/type'
import qs from 'qs'

enum LoginApi {
  GetCaptcha = '/public/captcha',
  AccountLogin = '/public/login',
  RefreshToken = '/public/refreshToken',
  LoginUserInfo = '/sys/user/',
  UserMenus = '/sys/user/menuTree/'
}

function getCaptcha() {
  return fancyRequest.get<FancyDataReponseType<CaptchaDataType>>({
    url: LoginApi.GetCaptcha
  })
}

function accountLoginRequest(account: Account) {
  return fancyRequest.post<FancyDataReponseType<LoginResponseDataType>>({
    url: LoginApi.AccountLogin,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(account)
  })
}

function refreshToken() {
  return fancyRequest.get<FancyDataReponseType<RefreshTokenDataType>>({
    url: LoginApi.RefreshToken
  })
}

function requestUserInfoById(id: number) {
  return fancyRequest.get<FancyDataReponseType<UserInfoType>>({
    url: LoginApi.LoginUserInfo + id
  })
}

function requestUserMenusByUserId(id: number) {
  return fancyRequest.get<FancyDataReponseType>({
    url: LoginApi.UserMenus + id
  })
}

export {
  getCaptcha,
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByUserId,
  refreshToken
}
