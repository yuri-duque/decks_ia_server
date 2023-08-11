export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  _id: string;
  name: string;
  email: string;
  token: string;
};
