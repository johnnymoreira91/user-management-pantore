interface IUser {
  id: number,
  name: string,
  email: string,
  roleId: number
}

export interface ISigninReturn {
  accessToken: string
  user: IUser
}