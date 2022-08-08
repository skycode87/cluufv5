import { FC, useEffect,  useState, useContext } from 'react';

import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router';

import  { axiosApi } from '../../axios'

import { useUsers } from "../../hooks"

import TaskForm from '../../components/forms/installation'
import { AuthContext } from "../../context/auth";

import { DriveFileRenameOutline } from '@mui/icons-material';

import { AdminLayout } from '../../components/layouts/AdminLayout'
import { ITask } from '../../interfaces';
import { API_ROUTER } from "../../config";

import  {ToastSuccessServer, ToastErrorServer }  from "../../components/ui/toast";


 interface Props { }


const TaskPage:FC<Props> = () => {
    
    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();
    const { taskId = "new" } = router.query;

    const [isSaving, setIsSaving] = useState(false);
    const [ui, setUi] = useState<any >({});
    const [task, setTask] = useState<ITask | null>({ tags: [], owners: [], images: [], status: 'onhold', software: null, duration: 0, closuredate: '' });

    const onSubmit = async( form: any ) => {
               
        try {

            setIsSaving(true);
            

            let method: any = 'POST';
            if(form._id && form.isDelete) method = 'DELETE';
            else if(form._id) method = 'PUT';
                        
            const { data, status } = await axiosApi({
                url: API_ROUTER.TICKET.ticketFromLocal,
                method,
                data: form
            });
            
            if(status === 200){
                    if(method === 'PUT' && form._id )  ToastSuccessServer(`Actualizacion exitosa`);
                    if(method === 'POST') ToastSuccessServer(`Ticket #${data.serial}`);
                    if(method === 'DELETE') ToastSuccessServer(`Ticket #${data.serial} fue archivado`);
                    if(method === 'POST') {  router.replace(`/installation/${data._id}`);};
            }
            
            if(form.isDelete) {  router.replace(`/installation/list`);};
       

        } catch (err) {
            ToastErrorServer(err.message);
        } finally{
            setIsSaving(false);
        }

    }

    useEffect(() => {

      //  !isLoggedIn && router.push(`/auth/login`);

        (async () => {
            try{
                if(taskId && taskId === 'new' ){
                    setUi({ ...ui, title: "Nueva incidencia" })
                    setTask({...task, new: true });
                }else if(taskId && String(taskId).split('-')[0] === "client" ){
                    let user = String(taskId).split('-')[1];

                    const responseUser = await axiosApi.get(`${API_ROUTER.USER.userGetClient}/${user}`);
                    const { data, status } = responseUser;
                    if(status === 200 ) { 
                        setUi({ ...ui, title: "Nueva incidencia con usuario" })
                        setTask({...task, user: String(user),  new: true, client: data });
                    }else{
                        return null;
                    } 

                } else if(taskId){
                    const response = await axiosApi.get(`${API_ROUTER.ticketGetTicket}/${taskId}`);
                    const { data, status } = response;
                    if(status === 200 ) { 
                        setUi({ ...ui, title: data.company, subtitle: `Codigo # ${data.serial}` })
                        setTask({...task, ...data,  new: false });
                    }
                    else{
                        return null;
                    } 
                }   

            }catch(err){
                console.log(err);
            }
          })();
  }, [taskId])
  
    const { users, isLoadingUsers, okUsers } = useUsers({ role: 'admins' });  
  
    return (
        <AdminLayout 
            title={ui.title} 
            subTitle={ui?.subtitle || ""} 
            icon={ <DriveFileRenameOutline /> }
        >
            
          { ( (task?._id && taskId) || (taskId === 'new' && !isLoadingUsers) || (String(taskId).split('-')[0] === "client")) ? <TaskForm ownersArray={okUsers ? users : []} task={task}  onSubmit={onSubmit}  isSaving={isSaving}  /> :  <CircularProgress /> }
          
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