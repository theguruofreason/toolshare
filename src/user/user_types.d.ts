export type RegisterUserRequest = UserInfo;

export type LoginUserRequest = {
  name: string;
  password: string;
}

export type UserInfo = {
  name: string;
  email: string;
  password: string;
}