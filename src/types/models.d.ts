// Models
export type AuthToken = {
  token: string,
  expiration: Date | string,
};

export type Token = {
  token: string,
  expiration: Date | string,
  device: string
};

export type User = {
  uuid?: string,
  admin?: boolean,
};

export type UserData = {
  tokens: Token[],
  email: string,
};

// State & Actions types //
// State
export type State = {
  user: User
  userData: UserData
};

// Actions
export type ModelsActions = {
  user: 'SET_USER'
  userData: 'UPDATE_USER_DATA'
};
