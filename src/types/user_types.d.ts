export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export type UserInfo = {
  name: string;
  email: string;
  password: string;
}