import {  FC, useState } from 'react';

import { useForm } from 'react-hook-form';

import { TextField } from '@mui/material';

import  { axiosApi } from '../../axios'


import  {ToastSuccessServer, ToastErrorServer }  from "../ui/toast";
import { API_ROUTER } from "../../config";


import { IUser  } from '../../interfaces';

interface FormData {
    _id?       : string;
    company    : string;
    email?     : string;
    software?  : string;
    tags       : string[];
    title?     : string;
    type       : string;
    active     : boolean | any;
    user       : string;
    code?      : string;
    expired?   : string;
    password?  : string;
    tickets?   : string;
    domain?    : string;
    tag?       : string;
}

interface Props {  clientId: string | string[];  client: IUser | null }



const ClientUpdateDomain:FC<Props> = ({  client }) => {
    
    const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: client
    })

    const [isSaving, setIsSaving] = useState(false);
    const [isReload, setIsReload] = useState(false);
    
    const handleChange = ({ target } ) => {
       const {  value, name } = target;
      console.log(target);
    }

    const onSubmit = async( form: any ) => {   
        try {
            setIsSaving(true);
         
            const { data, status } = await axiosApi({
                url: API_ROUTER.USER.userTag,
                method: 'PUT',
                data: form
            });

            if(status === 200){
               data.tag ? ToastSuccessServer(data.tag) : ToastSuccessServer(`Error`);
            }
               
            
        } catch (err) {
            ToastErrorServer(err)
        } finally{
            setIsSaving(false);
        }
    }

    return (<form onSubmit={ handleSubmit( onSubmit ) }>
                            <TextField
                                variant="filled"
                                { ...register('tag')}
                                error={ !!errors.tag }
                                helperText={ errors.tag?.message }
                            />
            </form>)
}

export default ClientUpdateDomain