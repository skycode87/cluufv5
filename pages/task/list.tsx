import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

import NextLink from 'next/link';
import {  CategoryOutlined } from '@mui/icons-material';
import { Box,  Grid, Link, CircularProgress,  Alert, Avatar, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { taskLoadGrid, taskTotalByStatus } from '../../handlers/task'

import TaskSearchByText from '../../components/forms/taskSearchByText'

import { AdminLayout } from '../../components/layouts/AdminLayout'
import CardNumber from '../../components/ui/cardNumber'
import { AuthContext } from "../../context/auth";

import Chip from '@mui/material/Chip';

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
    { field: 'company', headerName: 'Compañia',  width: 200 },
    { field: 'software', headerName: 'Software',  width: 150 },
    { field: 'priority', headerName: 'Prioridad',  width: 150,  renderCell: ({row}: GridValueGetterParams) => {
        return (
            priorityFormat(row.priority)
        )
    } },
    { field: 'createdAt', headerName: 'Creada en',  width: 200 },
    { field: 'email', headerName: 'Correo',  width: 200 }

];


const ListsTaskPage = () => {

    const [tasks, setTasks] = useState([]);
    const router = useRouter();

    const { isLoggedIn } = useContext(AuthContext);

    const [isLoading, setLoading] = useState(false);
    const [isSearch, setSearch] = useState(false);

    const initialData = async () => {
        setLoading(true);

        try{
        const { tasks, okTasks } = await taskLoadGrid({ filter: 'all' });  
    
        if(okTasks) {    
            setTasks( tasks.map( item => ({ ...item })));
            return tasks;
        }
    }catch(err){
        console.log(err)
    }finally{
        setLoading(false);
    }
}


  useEffect(() => {
    !isLoggedIn && router.push(`/auth/login`);
    initialData();
  }, []);


  const address = API_ROUTER.TICKET.ticketGetReport;
  const fetcher = async (url) => await axios.post(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);


const openTask = async(param) => {
    setLoading(true);
    try{
    const data1 = await taskTotalByStatus(param);
     data1 && data1.okMetrics && setTasks( data1.metrics );
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
                <Typography className='Maintitle'>Todas las Tareas</Typography>
                <Grid container className='fadeIn'>
                    
                    <Grid item xs={6} md={2}>
                        <Link onClick={ () => openTask("open")} >
                            <CardNumber  title={data?.status?.open || 0 } subtitle="En progreso." clase="successGradient pointer" />
                        </Link>
                    </Grid>  

                 <Grid item xs={6} md={2}>
                        <Link onClick={ () => openTask("onhold")} >
                            <CardNumber title={data?.status?.onhold || 0 } subtitle="En Espera" clase="errorGradient pointer" />
                        </Link>
                    </Grid>  

                      <Grid item xs={6} md={2}>
                      <Link onClick={ () => openTask("close")} >
                        <CardNumber title={data?.status?.close || 0 } subtitle="Cerrados" clase="warningGradient pointer"/>
                        </Link>
                    </Grid>

                    <Grid item xs={6} md={2}>
                    <Link onClick={ () => initialData()} >
                    <CardNumber title={ parseInt(data?.status?.close || 0) + parseInt(data?.status?.open|| 0 ) + parseInt(data?.status?.onhold || 0)} subtitle="Todos" clase="infoGradient pointer"/>
                        </Link>
                    </Grid>

                    <Grid item xs={6} md={2}>      
                                <Link onClick={()=> setSearch(!isSearch)} >
                                  <CardNumber title={ !isSearch ? "+" : "-" } subtitle="Filtros" clase="defaultGradient" />
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
                tasks.length > 0 ? <Grid item xs={12} sx={{ height:500, width: '100%' }}>
                            {
                            !isLoading ? <DataGrid 
                                    getRowId={(row) => row._id} 
                                    rows={ tasks }
                                    columns={ columns }
                                    pageSize={ 100 }
                                    rowsPerPageOptions={ [20] }
                                /> : <CircularProgress /> 
                                
                            }
                    </Grid> : 
                    <Grid item xs={12} sx={{ height:50, width: '100%' }}>
                        <Alert variant="outlined" severity="info">
                                This is an info alert — check it out!
                            </Alert>
                    </Grid> 
                }

                </Grid>   
            </Box>

    </AdminLayout>
  )
}

export default ListsTaskPage;