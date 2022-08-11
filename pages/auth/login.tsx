import { useState, useEffect, useContext } from 'react';

import NextLink from 'next/link';

import { Box, Button, Chip, Divider, Grid, Link, TextField, Typography } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts'
import { validations } from '../../utils';
import { useRouter } from 'next/router';

import { AuthContext } from '../../context/auth'


type Inputs = {
    email   : string,
    password: string,
  };

const showError = false;

const LoginPage = () => {

    const router = useRouter();
    const { loginUser, user, isLoggedIn } = useContext(AuthContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [ showError, setShowError ] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async ( data ) => {
        const { email, password } = data;   
        const isValidLogin = await loginUser( email, password, null );
      
        if ( !isValidLogin ) {
                 setShowError(true);
                 setTimeout(() => setShowError(false), 3000);
                 return;
        }

        const destination = router.query.p?.toString() || '/plan/list';
         router.replace(destination);

    };
  
  
 return (
        <AuthLayout title={'Ingresar'}>
             <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ width: 350, padding:'10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' sx={{ color:"#fff",  display: "block", margin: "auto", textAlign: "center" }} component="h1">Walter</Typography>

                            <img  style={{ display: "block", margin: "auto", marginBottom: 20  }} alt="Logo" src="/walter.gif" width="120px" /> 

                            <Typography variant='h2' sx={{ color:"#fff" }} component="h1">Iniciar Sesión</Typography>
                            <Chip 
                                label="No reconocemos ese usuario / contraseña"
                                color="error"
                                icon={ <ErrorOutline /> }
                                className="fadeIn"
                                sx={{ display: showError ? 'flex': 'none' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type="text"
                                label="Correo"
                                variant="filled"
                                fullWidth 
                                { ...register('email', {
                                    required: 'Este campo es requerido',
                                    
                                    
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                                sx={{ background: "#fff" }}
                            />
                                  
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth 
                                { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                                sx={{ background: "#fff" }}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth>
                                Ingresar
                            </Button>
                        </Grid>

                    {/*
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink 
                                href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' } 
                                passHref>
                                <Link underline='always'>
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>

                    */}
                   

                    </Grid>
                </Box>
            </form>
        </AuthLayout>
  )
}


export default LoginPage

/*

     setShowError(false);
            try {
                const isValidLogin = await axios.post( process.env.BACKEND_URL || '', { email, password });
                console.log(isValidLogin);

                if ( !isValidLogin ) {
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000);
                return;
                }
            // // Todo: navegar a la pantalla que el usuario estaba
                const destination = router.query.p?.toString() || '/';
                router.replace(destination);

            //  return data;
            } catch (error) {
                if ( axios.isAxiosError(error) ) {
                    console.log(error.response?.data);
                } else {
                    console.log(error);
                }

                return null;
            }
*/