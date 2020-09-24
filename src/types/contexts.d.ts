import { User, AuthToken } from 'types';

// AuthContext ///

// import { User, AuthToken } from 'types';

// State
export type AuthContextState = {
  user: {
    uuid: string,
    admin: boolean,
  },
  isAuthenticated: boolean
};

// Functions
type Login = ({ user, token }: {user: User, token: AuthToken}) => void;

export type SetToken = ({ user, token }: {user: User, token: AuthToken}) => void;

export type RemoveUserCookie = () => void;

export type UnsetToken = () => void;

export type LogOut = (
  { tokenToRevoke, logOutUser, authToken }:
  { tokenToRevoke?: string, logOutUser?: boolean, authToken?: string }
) => Promise<void>;

// AuthContext
export type AuthContextType = AuthContextState & {
  logIn: Login
  logOut: LogOut
};
