

import { createContext } from 'react';
import { IUser } from '../../interfaces';


interface ContextProps {
    isLoggedIn: boolean;
    isAdmin: boolean;
    isRoot: boolean;
    isUser: boolean;
    user?: IUser;
    allUsers: IUser[];
    loginUser: (email: string, password: string, instance: string) => Promise<boolean>;
    loginSlackAdmin: (token: string | any) => Promise<boolean>;
    //registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}


export const AuthContext = createContext({} as ContextProps );