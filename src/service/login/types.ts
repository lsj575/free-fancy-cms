interface Account {
  username: string
  password: string
  captcha: string
}

interface CaptchaDataType {
  ctoken: string
  captchaImageEncode: string
}

interface LoginResponseDataType {
  user: LoginUserDataType
  Authorization: string
}

interface LoginUserDataType {
  id: number
  gender: number
  username: string
}

interface userRole {
  id: number
  name: string
}

interface UserInfoType {
  id: number
  username: string
  role: userRole
}

export { Account, CaptchaDataType, LoginResponseDataType, UserInfoType }
