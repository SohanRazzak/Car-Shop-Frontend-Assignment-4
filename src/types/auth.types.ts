export type TLoginInput = {
    email: string;
    password: string;
};

export type TRefreshToken = {
    data: {
      accessToken: string;
    };
    message: string;
    success: boolean;
  };