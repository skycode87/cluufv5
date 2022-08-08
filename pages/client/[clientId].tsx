/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useMemo,  useState, useContext } from 'react';

import { CircularProgress, Avatar, Box, Grid } from '@mui/material'
import { useRouter } from 'next/router';

import  { axiosApi } from '../../axios'

import { useUsers } from "../../hooks"

import ClientForm from '../../components/forms/client'

import { Person, DriveFileRenameOutline } from '@mui/icons-material';


import { AdminLayout } from '../../components/layouts/AdminLayout'
import { IUser } from '../../interfaces';
import { API_ROUTER } from "../../config";
import  {ToastSuccessServer, ToastErrorServer }  from "../../components/ui/toast";
import { CardHeader1 } from '../../components/ui/CardHeader1';
import  ListByClient from "../../pages/client/listByClient"


import { green } from '@mui/material/colors';
import { AuthContext } from "../../context/auth";


 interface Props { }


const TaskPage:FC<Props> = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();
    const { clientId = "new" } = router.query;

    const [isSaving, setIsSaving] = useState(false);
    const [isReload, setIsReload] = useState(false);

    const [ui, setUi] = useState<any >({});
    const [client, setClient] = useState<IUser | null>({ company: "", email: "",  active: false, software: "" });

    const onSubmit = async( form: any ) => {
            
        try {

         
            setIsSaving(true);

            let method: any = 'POST';
            if(form._id && form.isDelete) method = 'DELETE';
            else if(form._id) method = 'PUT';
                        
            const { data, status } = await axiosApi({
                url: API_ROUTER.USER.userClient,
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

    useEffect(() => {
        !isLoggedIn && router.push(`/auth/login`);

        (async () => {
            try{
                setIsReload(true);
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
            }finally{
                setIsReload(false);
            }

          })();
  }, [clientId, isLoggedIn])
  
    const { users, isLoadingUsers, okUsers } = useUsers({ role: 'admin' });  
  
    return (
        <AdminLayout 
            title={ui.title} 
            subTitle={ui?.subtitle || ""} 
            icon={ <DriveFileRenameOutline /> }
        >
            
            {  (!isReload && ((client?._id && clientId) || (clientId === 'new'))) ? <>
            <Grid container spacing={2}>
                    <Grid item xs={12} sm={ 6 }> 
                        <ClientForm owners={users} client={client} onSubmit={onSubmit}  isSaving={isSaving}  />
                    </Grid>
                    <Grid item xs={12} sm={ 6 }> 
                        <Box className="card">
                            <CardHeader1  
                            title="Todas las licencias de esta empresa" 
                            avatar={ 
                                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                                <Person />
                                </Avatar>} 
                            />
                            <ListByClient clientName={client.company} />
                        </Box>
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