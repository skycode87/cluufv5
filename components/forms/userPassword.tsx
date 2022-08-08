import {  FC, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import NextLink from "next/link"
import Swal from 'sweetalert2'


import { LoadingButton } from '@mui/lab';
import { Link, Box, Button, Grid, TextField, Avatar } from '@mui/material';
import { SaveOutlined,  ArrowBackIos, DeleteForever, Person } from '@mui/icons-material';


import { IUser  } from '../../interfaces';
import { green } from '@mui/material/colors';
import { CardHeader1 } from '../ui';

interface FormData {
    _id?       : string;
    password1? : string;
    password2? : string;
}

interface Props {  onSubmit: any; clientId?: string | string[]; isSaving: boolean; client?: IUser | null }


const ClientForm:FC<Props> = ({ onSubmit, isSaving = false, client }) => {


    const { register, control, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: client
    })
    
    const handleChange = ({ target } ) => {
       const {  value, name } = target;
      console.log(target);
    }
    

    return (<form onSubmit={ handleSubmit( onSubmit ) }>

            
                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 12 }>
                        <Box  className="card-style01" display='flex' justifyContent='end' sx={{ mb: 1 }}>
                                <NextLink passHref href={`/client/list`}>
                                    <Link>
                                    <Button 
                                        color="secondary"
                                        className="circular-btn"
                                        startIcon={ <ArrowBackIos /> }
                                        sx={{ width: '150px' }}
                                        type="button"
                                        >
                                        Volver átras
                                    </Button>
                                    </Link>
                                </NextLink>
                         
                            <LoadingButton 
                                loading={ isSaving }
                                color="secondary"
                                startIcon={ <SaveOutlined /> }
                                sx={{ width: '200px', ml: 2 }}
                                type="submit"
                                disabled={ isSaving }>
                                Guardar cambios
                            </LoadingButton>
                   
                        </Box>
                    </Grid>   
                    <Grid item xs={12} sm={ 12 }>
                        <Box className="card">

                
                            <CardHeader1  
                            title={client?.company}
                            avatar={ 
                                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                                <Person />
                                </Avatar>} 
                            />
                                    

                            <TextField
                                label="Nueva Contraseña"
                                variant="filled"
                                fullWidth 
                                type="password"
                                sx={{ mb: 1 }}
                                { ...register('password1')}
                                error={ !!errors.password1 }
                                helperText={ errors.password1?.message }
                            />

                            <TextField
                                label="Repetir la nueva contraseña"
                                variant="filled"
                                fullWidth 
                                type="password"
                                sx={{ mb: 1 }}
                                { ...register('password2')}
                                error={ !!errors.password2 }
                                helperText={ errors.password2?.message }
                            />

                        </Box>
                    </Grid>

                </Grid>
            </form>)
}

export default ClientForm