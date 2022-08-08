import { FC, useMemo,  useState } from 'react';

import { CircularProgress, Avatar, Box, Grid } from '@mui/material'
import { useRouter } from 'next/router';

import  { axiosApi } from '../../axios'

import { useUsers } from "../../hooks"

import UserPassword from '../../components/forms/userPassword'

import { Person, DriveFileRenameOutline } from '@mui/icons-material';


import { AdminLayout } from '../../components/layouts/AdminLayout'
import { IUser } from '../../interfaces';
import { API_ROUTER } from "../../config";

import  {ToastSuccessServer, ToastErrorServer }  from "../../components/ui/toast";

import  ListByClient from "../client/listByClient"

import { CardHeader1 } from '../../components/ui/CardHeader1';
import { green } from '@mui/material/colors';


 interface Props { }


const TaskPage:FC<Props> = () => {

    const router = useRouter();
    const { clientId = "new" } = router.query;

    const [isSaving, setIsSaving] = useState(false);
    const [ui, setUi] = useState<any >({});
    const [client, setClient] = useState<IUser | null>({ company: "", email: "",  active: false, software: "" });

    const onSubmit = async( form: any ) => {
            
        try {
            setIsSaving(true);

            let method: any = 'POST';
            if(form._id && form.isDelete) method = 'DELETE';
            else if(form._id) method = 'PUT';
                        
            const { data, status } = await axiosApi({
                url: API_ROUTER.USER.userPassword,
                method,
                data: form
            });

            if(status === 200){
               data.serial ? ToastSuccessServer(`Client #${data.code}`) : ToastSuccessServer(`Sin asignación de codigo`);
            }
               
               router.replace(`/client/list`);
            
        } catch (err) {
            ToastErrorServer(err)
        } finally{
            setIsSaving(false);
        }

    }

    useMemo(() => {
        (async () => {
            try{
                if(clientId && clientId === 'new' ){
                    setUi({ ...ui, title: "Nueva Cliente" })
                    setClient({...client });
                } else if(clientId){
                    const response = await axiosApi.get(`${API_ROUTER.USER.userGetClient}/${clientId}`);
                    const { data, status } = response;
                    if(status === 200 ) { 
                        setUi({ ...ui, title: data.company, subtitle: `Codigo # ${data.code}` })
                        setClient({...client, ...data });
                    }
                    else{
                        return null;
                    } 
                }   

            }catch(err){
                console.log(err);
            }
          })();
  }, [clientId])
  
    const { users, isLoadingUsers, okUsers } = useUsers({ role: 'admin' });  
  
    return (
        <AdminLayout 
            title={ui.title} 
            subTitle={ui?.subtitle || ""} 
            icon={ <DriveFileRenameOutline /> }
        >
            
            { ((client?._id && clientId) || (clientId === 'new')) ? <>
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={ 6 }> 
                        <UserPassword  client={client} onSubmit={onSubmit}  isSaving={isSaving}  />
                    </Grid>
             </Grid>
            </> :  
            <CircularProgress /> 
            }


        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


/*
export const getServerSideProps: GetServerSideProps = async ({  query }) => {
   // const { slug } = query;
   // const taskId = slug;
   // return { props: { taskId } }
}
*/


export default TaskPage