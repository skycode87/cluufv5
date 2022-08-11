import { FC, useReducer, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import axiosApi from '../../axios/axiosApi'

import { AuthContext, authReducer } from './'

import { API_ROUTER } from '../../config'

import { IUser } from '../../interfaces'
import { useRouter } from 'next/router';

export interface AuthState {
    isLoggedIn: boolean;
    isAdmin: boolean;
    isRoot: boolean;
    isUser: boolean;
    allUsers: IUser[];
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
    isAdmin: false,
    isRoot: false,
    allUsers: [],
    isUser: false,
}


export const AuthProvider:FC = ({ children }) => {
  
    const router = useRouter();

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const [login, setLogin] = useState( false );

    const checkToken = async() => {

        if ( !Cookies.get('token') ) {
            return;
        }

        try {
            const { data } = await axiosApi(API_ROUTER.USER.userValidateToken);
            const { token, user } = data;

            if(token && token.length > 15){
                Cookies.set('token', token );
                assignRole(user);
                setLogin(true);
                return true;
            }else{
                setLogin(false);
                return false;
            }
            
        } catch (error) {
            Cookies.remove('token');
            return false;
        }
    }

    const assignRole = (user) => {
        switch (user.role) {
            case 'admin':
                dispatch({ type: '[Auth] - LoginAdmin', payload: user, isAdmin: true });
                break;

            case 'root':
                dispatch({ type: '[Auth] - LoginRoot', payload: user, isRoot: true  });
                break;
                
            default:
                dispatch({ type: '[Auth] - Login', payload: user, isUser: true });            
                break;
        }
    }

    const loginUser = async( email, password, instance ) => {
        try {
            const { data } = await axios.post(API_ROUTER.signin, { email, password, instance });
            const { token, user } = data;
            Cookies.set('token', token );                 
            assignRole(user);
            return true;
        } catch (error) {
            return false;
        }
    }

    const loginSlackAdmin = async( slackToken: string): Promise<boolean> => {
        try {
            const { data } = await axios.post(API_ROUTER.signinSlack, { token: slackToken  });
            const { token, user } = data;
            Cookies.set('token', token );                 
            assignRole(user);
            return true;
        } catch (error) {
            return false;
        }
    }


    const allUsers = async() => {
        try {
            const { data } = await axios.get(`${API_ROUTER.USER.userGetUsersByRole}/all`);
            Cookies.set('users', data );                 
            return true;
        } catch (error) {
            return false;
        }
    }


    const logout = () => {
        Cookies.remove('cart');
        Cookies.remove('firstName');
        Cookies.remove('lastName');
        Cookies.remove('address');
        Cookies.remove('address2');
        Cookies.remove('zip');
        Cookies.remove('city');
        Cookies.remove('country');
        Cookies.remove('phone');
        
         // signOut();
        router.replace("/auth/login");
        Cookies.remove('token');
    }

    useEffect(() => {
        (async () => {
            try{
             
              await checkToken();

            }catch(err){
                console.log(err);
            }
          })();
       
    }, [])
    

    return (
        <AuthContext.Provider value={{
            ...state,
            // Methods
            loginUser,
            loginSlackAdmin,
            logout,
        }}>
        { children }
        </AuthContext.Provider>
    )
};