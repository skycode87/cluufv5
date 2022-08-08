import { useState, useEffect } from 'react'
import NextLink from "next/link"
import { PeopleOutline } from '@mui/icons-material'
import moment from "moment";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Link, Button, Chip, Alert, CircularProgress } from '@mui/material';

import { userSearchByRole } from '../../handlers/user'
import { AdminLayout } from '../../components/layouts/AdminLayout'
import ClientSearchByText from '../../components/forms/clientSearchByText'
import { Typography } from 'antd';


interface FormData {
    searchText    : string;
}

const mantenimientoFormat = (valors) => {
    switch (valors) {

        case true:
            return <Chip  size="small" label="Si" color="success" />;
            break;

        case false:
           return <Chip  size="small" label="No" color="error" />;
           break;

        default:
           break;

    }     
}

const softwareFormat = (valors) => {
    switch (valors.active) {

        case true:
            return <Chip  variant="outlined" size="small" label={valors.software} color="success" />;
            break;

        case false:
           return <Chip   variant="outlined" size="small" label={valors.software} color="error" />;
           break;

        default:
           break;

    }     
}


const ClientsList = () => {

    const [clients, setClients] = useState([]);

    const [isLoading, setLoading] = useState(false);

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
                tag: user.tag
            })));
            return users;
        }
    }

    const columns: GridColDef[] = [
        { field: 'active', headerName: 'Mantenimiento', width: 100,  renderCell: ({row}: GridValueGetterParams) => {
            return (
                mantenimientoFormat(row.active)
            )
        } },
        { field: 'company', headerName: 'Company', width: 250,  renderCell: ({row}: GridValueGetterParams) => {
            return (
                <NextLink href={`/client/${ row.id }`} passHref>
                    <Link underline='always'>
                         <Typography >{row.company}</Typography>
                    </Link>
                </NextLink>
            )
        } },
        { field: 'software', headerName: 'Software', width: 150,  renderCell: ({row}: GridValueGetterParams) => {
            return (
                softwareFormat(row)
            )
        } },
        { field: 'expired', headerName: 'Fecha de expiración', width: 300, renderCell: ({row}: GridValueGetterParams) => {
            return (
                moment(row.expired).format("LL")
            )
        } },
        { field: 'email', headerName: 'Correo', width: 250 },
         {
            field: 'Ticket', 
            headerName: 'Acciones', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => {
                return (
                   <NextLink passHref href={`/task/client-${row.id}`}>
                       <Link>
                        <Button>Nuevo Ticket</Button>
                       </Link>
                   </NextLink>
                )
            }
        },
       

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

        <Grid container className='fadeIn'>
        <Grid item xs={12} md={4} sx={{ padding: "30px 0", width: '100%' }}>
            <ClientSearchByText setClients={setClients} setLoading={setLoading}  initialData={initialData} />
        </Grid>


       { clients.length > 0 ?   <Grid item xs={12} sx={{ height:650, width: '100%' }}>
       {
                    !isLoading ? <DataGrid 
                    rows={ clients }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />: <CircularProgress /> 
            }
            </Grid>: 
            <Grid item xs={12} sx={{ height:50, width: '100%' }}>
                  <Alert variant="outlined" severity="info">
                        This is an info alert — check it out!
                    </Alert>
            </Grid> 
        }

            
        </Grid>


    </AdminLayout>
  )
}

export default ClientsList