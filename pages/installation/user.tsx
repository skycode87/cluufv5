/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'
import NextLink from 'next/link';
import useSWR from "swr";
import { useRouter } from 'next/router';


import { axiosApi } from "../../axios"

import { CategoryOutlined } from '@mui/icons-material';
import { Box, Grid, Link, CircularProgress,  Alert, Avatar, Chip, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { taskByUserLoadGrid, installationsTotalByStatusByUser } from '../../handlers/task'
import { AuthContext } from '../../context/auth'
import CardNumber from '../../components/ui/cardNumber'
import TaskSearchByText from '../../components/forms/taskSearchByText'
import { AdminLayout } from '../../components/layouts/AdminLayout'

import { API_ROUTER } from "../../config";


const statusFormat = (valors) => {
    switch (valors) {

        case 'open':
            return <Chip   size="small" label="Abierto" color="success" />;
            break;

        case 'onhold':
           return <Chip    size="small" label="En espera" color="error" />;
           break;

        case 'close':
            return <Chip  size="small" label="Cerrado" color="primary" />;
            break;
        
        case 'cancel':
            return <Chip   size="small" label="Cancelado" color="default" />;
            break;
        

        default:
           break;

    }     
}

const priorityFormat = (valors) => {
    switch (valors) {

        case 'high':
            return <Chip  variant="outlined" size="small" label="Alto" color="error" />;
            break;

        case 'mid':
           return <Chip  variant="outlined"  size="small" label="Normal" color="default" />;
           break;

        case 'low':
            return <Chip variant="outlined" size="small" label="Bajo" color="warning" />;
            break;
        

        default:
           return <Chip  variant="outlined" size="small" label="Cancelado" color="default" />;
           break;

    }     
}

const columns:GridColDef[] = [
    { 
        field: 'serial', 
        headerName: 'serial', 
        width: 120,
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink href={`/task/${ row._id }`} passHref>
                    <Link underline='always'>
                         <Chip 
                         avatar={<Avatar alt={row._id} src={row.avatar} />}
                         label={ row.serial} variant="outlined" />
                    </Link>
                </NextLink>
            )
        }
    },
    { field: 'status', headerName: 'Estatus',  width: 120,  renderCell: ({row}: GridValueGetterParams) => {
        return (
            statusFormat(row.status)
        )
    } },
   
    { field: 'company', headerName: 'Compañia',  width: 150 },
    { field: 'software', headerName: 'Software',  width: 150 },
    { field: 'message', headerName: 'Detalle',  width: 200 },

    { field: 'priority', headerName: 'Prioridad',  width: 150,  renderCell: ({row}: GridValueGetterParams) => {
        return (
            priorityFormat(row.priority)
        )
    } },
    { field: 'createdAt', headerName: 'Creada en',  width: 200 },
    { field: 'tickets', headerName: 'Tickets',  width: 50, renderCell: ({row}: GridValueGetterParams) => {
        return row.tickets || 1
    }},
    { field: 'email', headerName: 'Correo',  width: 200 },

];


const ListsTaskPage = () => {
    const { user, isLoggedIn, isAdmin, isRoot, isUser } = useContext(AuthContext);
    const router = useRouter();

    const [tasks, setTasks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isSearch, setSearch] = useState(false);


    const initialData = async ( userId ) => {
        setLoading(true);
        try{
            const { tasks, okTasks } = await taskByUserLoadGrid({ filter: { userId, type: "installation" } });  
            if(okTasks) {           
                setTasks( tasks.map( item => ({ ...item })));
                return tasks;
            }
         }catch(err){
            console.log(err);
         }finally{
            setLoading(false);
         }
    }


useEffect(()=>{
   // !isLoggedIn && router.push(`/auth/login`);
    user?._id && initialData(user?._id);
},[user, isLoggedIn])  
  

const address = API_ROUTER.TICKET.ticketGetReport;
const fetcher = async (url) => await axiosApi.put(url).then((res) => res.data);
const { data, error } = useSWR(address, fetcher);


const openTask = async(param) => {
    setLoading(true);
    try{
    const data1 = await installationsTotalByStatusByUser(param);
     if(data1 && data1.okMetrics){
        setTasks( data1.metrics );
     } else{
        setTasks([]);
     } 

    }catch(err){
        console.log(err)
    }finally{
        setLoading(false);
    }
}


  return (
    <AdminLayout 
        title={`Tickets (${ tasks?.length })`} 
        subTitle={'Mantenimiento de Tickets'}
        icon={ <CategoryOutlined /> }
    >
        <Box className="card">
                <Typography className='Maintitle'>Mis Instalaciones</Typography>
                <Grid container className='fadeIn'>
                            
                            <Grid item xs={6} md={2}>
                                <Link onClick={ () => openTask("open")} >
                                    <CardNumber  title={data?.installation?.open || 0 } subtitle="En progreso" clase="successGradient pointer" />
                                </Link>
                            </Grid>  

                        <Grid item xs={6} md={2}>
                                <Link onClick={ () => openTask("onhold")} >
                                    <CardNumber title={data?.installation?.onhold || 0 } subtitle="En Espera" clase="errorGradient pointer" />
                                </Link>
                            </Grid>  

                            <Grid item xs={6} md={2}>
                            <Link onClick={ () => openTask("close")} >
                                <CardNumber title={data?.installation?.close || 0 } subtitle="Cerrados" clase="warningGradient pointer"/>
                                </Link>
                            </Grid>

                            <Grid item xs={6} md={2}>
                            <Link onClick={ () => initialData(user?._id)} >
                            <CardNumber title={ parseInt(data?.installation?.close || 0) + parseInt(data?.installation?.open|| 0 ) + parseInt(data?.installation?.onhold || 0)} subtitle="Todos" clase="infoGradient pointer"/>
                                </Link>
                            </Grid>


                            <Grid item xs={6} md={2}>      
                                        <Link onClick={()=> setSearch(!isSearch)} >
                                        <CardNumber title={ !isSearch ? "+" : "-" } subtitle="Filtros" clase="defaultGradient pointer" />
                                        </Link>
                            </Grid> 
                    
                        
                            <Grid item xs={6} md={2}>
                                <Link href="/client/listMini" >
                                <CardNumber title="+" subtitle="Ticket" clase="defaultGradient pointer" />
                                </Link>
                            </Grid>   
                </Grid>
                <Grid container className='fadeIn'>
                    

                { isSearch &&   <Grid item xs={12} md={12} sx={{ padding: 3, width: '100%', background: "#DFE2E3",  borderRadius: 3, mb: 2 }}>
                    <TaskSearchByText setTasks={setTasks} setLoading={setLoading}  initialData={initialData} />
                </Grid> }

                {  
                tasks.length > 0 ?  <Grid item xs={12} sx={{ height:350, width: '100%' }}>
                            {
                            !isLoading ? 
                            <DataGrid 
                                    getRowId={(row) => row._id} 
                                    rows={ tasks }
                                    columns={ columns }
                                    pageSize={ 100 }
                                    rowsPerPageOptions={ [20] }
                                />  : <CircularProgress /> 
                                
                            }
                    </Grid> : 
                    <Grid item xs={12} sx={{ height:50, width: '100%' }}>
                        <Alert variant="outlined" >
                               No hay registros
                            </Alert>
                    </Grid> 
                }

                </Grid>   
        </Box>

    </AdminLayout>
  )
}

export default ListsTaskPage;