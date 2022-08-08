import { useState, useEffect, useContext } from 'react'
import NextLink from "next/link"
import { useRouter } from "next/router";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Link, Button, Chip, Alert, CircularProgress, Box, Avatar, Slide } from '@mui/material';
import ApartmentIcon from '@mui/icons-material/Apartment';
import {  PeopleOutline } from '@mui/icons-material'

import { userSearchByRole, userDomainByTag } from '../../handlers/user'
import { AdminLayout } from '../../components/layouts/AdminLayout'
import ClientSearchByText from '../../components/forms/clientSearchByText'
import { Typography } from 'antd';
import { green } from '@mui/material/colors';
import { CardHeader1, showToast, toastWarning } from '../../components/ui';

import { AuthContext } from "../../context/auth";


interface FormData {
    searchText    : string;
}

const softwareFormat = (valors) => {
    switch (valors.active) {

        case true:
            return <Chip   size="small" label={valors.software} color="success" />;
            break;

        case false:
           return <Chip   size="small" label={valors.software} color="error" />;
           break;

        default:
           break;

    }     
}

const ClientsList = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const router = useRouter();

    const [clients, setClients] = useState([]);

    const [isLoading, setLoading] = useState(false);
    const [isLoadingSearch, setLoadingSearch] = useState(false);

    const initialData = async () => {
        const { users, okUsers } = await userSearchByRole({ role: 'client' });  
        if(okUsers) {
            setClients( users.map( user => ({
                id: user._id,
                email: user.email,
                name: user.name,
                company: user.company,
                role: user.role,
                software:  user.software,
                active:  user.active,
                expired:  user.expired,
                code:  user.code,
                tickets:  user.tickets || "---",
                domain: user.domain,
                tag: user.tag
            })));
            return users;
        }
    }

 

    const columns: GridColDef[] = [
     
        { field: 'company', headerName: 'Compañia', width: 300,  renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink  passHref href={`/task/client-${row.id}`}  >
                    <Link underline='always'>
                         <Typography >{row.company} </Typography>
                    </Link>
                </NextLink>
            )
        } },
    
        { field: 'software', headerName: 'Software', width: 150,  renderCell: ({row}: GridValueGetterParams) => {
            return (
                softwareFormat(row)
            )
        } },
     
    ];

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{
    initialData();
},[])

  
  return (
    <AdminLayout 
        title={'Usuarios'} 
        subTitle={'Mantenimiento de usuarios'}
        icon={ <PeopleOutline /> }
    >

    <Box className="card">
    <CardHeader1  
                        title="Compañias" 
                        avatar={ 
                            <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                            <ApartmentIcon />
                            </Avatar>} 
                        />
            <Grid container className='fadeIn'>
            <Grid item xs={12} md={6} sx={{ padding: "30px 0", width: '100%' }}>
                <ClientSearchByText setClients={setClients} setLoading={setLoading}  initialData={initialData} />
            </Grid>


        { clients.length > 0 ?   
 <Grid item xs={12} sx={{ height:1000, width: '100%' }}>
        {
                        !isLoading ? 
                        <DataGrid 
                        rows={ clients }
                        columns={ columns }
                        pageSize={ 30 }
                        rowsPerPageOptions={ [30] }
                    /> : <CircularProgress /> 
                }
                </Grid>: 
                <Grid item xs={12} sx={{ height:50, width: '100%' }}>
                    <CircularProgress />
                </Grid> 
            }

                
            </Grid>
    </Box>

    </AdminLayout>
  )
}

export default ClientsList