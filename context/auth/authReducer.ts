import { AuthState } from './';
import { IUser } from '../../interfaces';


type AuthActionType = 
   | { type: '[Auth] - Login', payload: IUser, isUser: boolean } 
   | { type: '[Auth] - LoginAdmin', payload: IUser, isAdmin: boolean }  
   | { type: '[Auth] - LoginRoot', payload: IUser, isRoot: boolean }  
   | { type: '[Auth] - Logout' } 


export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

   switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
                isLoggedIn: true,
                isUser: true,
                user: action.payload
            }

        case '[Auth] - LoginAdmin':
            return {
                ...state,
                isLoggedIn: true,
                isAdmin: true,
                user: action.payload
            }
            
        case '[Auth] - LoginRoot':
            return {
                ...state,
                isLoggedIn: true,
                isRoot: true,
                user: action.payload
            }            

        case '[Auth] - Logout':
            return {
                ...state,
                isLoggedIn: false,
                user: undefined,
                isRoot: false,
                isAdmin: false,
                isUser: false,
            }


       default:
          return state;
   }

}