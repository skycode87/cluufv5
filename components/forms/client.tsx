import {  FC, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import NextLink from "next/link"
import Swal from 'sweetalert2'

import { LoadingButton } from '@mui/lab';
import { Link, Box, Zoom, Button, capitalize, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField, Typography, Avatar } from '@mui/material';
import { SaveOutlined,  ArrowBackIos, DeleteForever, Person } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers';

import ClienteAutocomplete from "./clientAutocomplete"

import moment from 'moment';

const validSoftware  = ['Via-Control','TopSolid V7','TopSolid V6','Especial','CNC·Creator','ARDIS Stock','ARDIS Optimizer','3CAD']
const validStatus = [true,false]

import { IUser  } from '../../interfaces';
import { green } from '@mui/material/colors';
import { CardHeader1 } from '../ui';

const colorText = { color: "#294595"}


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
    owners?    : any;
    domain?    : string;
    owner?     : string;
}

interface Props { owners?: any;  onSubmit: any; clientId?: string | string[]; isSaving: boolean; client?: IUser | null }


const ClientForm:FC<Props> = ({ onSubmit, isSaving = false, client, owners }) => {

    const [ newTagValue, setNewTagValue ] = useState('');
    const [ clientAutocomplete, setClientAutocomplete ] = useState([]);

    

    const { register, control, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: client
    })
    
    const handleChange = ({ target } ) => {
       const {  value, name } = target;
      console.log(target);
    }


    const onDelete = () => {
       
        const { code } = getValues();

        Swal.fire({
            title: 'Deseas confirmar la eliminación?',
            text: `Codigo #${code}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si, deseo eliminarlo',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                // setValue('isDelete',true);
                handleSubmit(onSubmit)();
            } else if (result.isDenied) {

            }
          })
    }



    return (<form onSubmit={ handleSubmit( onSubmit ) }>

              

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 12 }>
                    <Zoom in style={{ transitionDelay: '500ms'}} >
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
                            // loading={ isRemove }
                                color="secondary"
                                startIcon={ <DeleteForever /> }
                                sx={{ width: '100px' }}
                                type="button"
                                onClick={onDelete}
                                // disabled={ isRemove }
                                >
                                Eliminar
                            </LoadingButton>
                            <LoadingButton 
                                loading={ isSaving }
                                color="secondary"
                                startIcon={ <SaveOutlined /> }
                                sx={{ width: '100px' }}
                                type="submit"
                                disabled={ isSaving }>
                                Guardar
                            </LoadingButton>
                   
                        </Box>
                    </Zoom>
                    </Grid>   
                    <Grid item xs={12} sm={ 12 }>
                    <Zoom in style={{ transitionDelay: '500ms'}} >
                        <Box className="card">

                
                            <CardHeader1  
                            title={client?.company}
                            avatar={ 
                                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                                <Person />
                                </Avatar>} 
                            />
                                    
                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Nombre de la Compañia</Typography>
                            </FormLabel>
                            <TextField
               
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('company')}
                                error={ !!errors.company }
                                helperText={ errors.company?.message }
                            />

                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Dominio de la empresa</Typography>
                            </FormLabel>
                            <TextField
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('domain')}
                                error={ !!errors.domain }
                                helperText={ errors.domain?.message }
                            />


                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Email del contacto</Typography>
                            </FormLabel>
                            <TextField
                                variant="filled"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('email')}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                            />

                            <Divider sx={{ my: 1 }} />

                            <Grid item xs={12}>
                                <FormControl sx={{ mb: 1 }}>
                                <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Padrino de la empresa</Typography>
                            </FormLabel>
                                    <RadioGroup
                                        row
                                        value={ getValues('owner') }
                                        onChange={ ({ target })=> setValue('owner', target.value, { shouldValidate: true }) }
                                    >
                                        {
                                            owners.map( option => (
                                                <FormControlLabel 
                                                    key={ option._id }
                                                    value={ option._id }
                                                    control={ <Radio color='secondary' /> }
                                                    label={<> <Avatar alt={option.name } sx={{ display:"inline-block",  width: 32, height: 32  }}  src={option.avatar} /> {option.name } </> } 
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            
                            </Grid>
                         
                            <Divider sx={{ my: 1 }} />

                            <FormControl sx={{ mb: 1 }}>
                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Licencia de Software adquirida</Typography>
                            </FormLabel>
                                <RadioGroup
                                    row
                                    value={ getValues('software') }
                                    onChange={ ({ target })=> setValue('software', target.value, { shouldValidate: true }) }
                                >
                                    {
                                        validSoftware.map( option => (
                                            <FormControlLabel 
                                                key={ option }
                                                value={ option }
                                                control={ <Radio color='secondary' /> }
                                                label={ capitalize(option) }
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                            <Divider sx={{ my: 1 }} />

                            <FormControl sx={{ mb: 1 }}>
                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Mantenimiento</Typography>
                            </FormLabel>
                                                <RadioGroup
                                                    row
                                                    value={ getValues('active') }
                                                    onChange={ ({ target })=> setValue('active', target.value, { shouldValidate: true }) }
                                                >
                                                    {
                                                        validStatus.map( option => (
                                                            <FormControlLabel 
                                                                key={ String(option) }
                                                                value={ option }
                                                                control={ <Radio color='secondary' /> }
                                                                label={ option ? "Si" : "No" }
                                                            />
                                                        ))
                                                    }
                                                </RadioGroup>
                            </FormControl>
                            
                            { getValues("active")  ? <FormGroup>
                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Fecha de vencimiento</Typography>
                            </FormLabel>
                                    <Controller
                                            control={control}
                                            name="expired"
                                            rules={{ required: true }} //optional
                                            render={({
                                                field: { onChange, name, value },
                                                fieldState: { invalid, isDirty }, //optional
                                                formState: { errors }, //optional, but necessary if you want to show an error message
                                            }) => (
                                                <>
                                                <MobileDatePicker
                                                    value={ getValues('expired') }
                                                    inputFormat="MM/dd/yyyy"
                                                    renderInput={(params) => <TextField           
                                                    {...params} />}  
                                                    onChange={ (valos:any) => { handleChange; setValue('expired', moment(valos).format('MM/DD/YYYY')) } }
                                                    onAccept={ (valos:any) => { setValue('expired',valos); console.log(valos) } }                                                           
                                                />
                                                {errors && errors[name] && errors[name].type === "required" && (
                                                    //if you want to show an error message
                                                    <span>your error message !</span>
                                                )}
                                                </>
                                            )}
                                            />
                            </FormGroup> :<>Sin fecha</>}

                            <FormControl sx={{ mb: 1 }}>
                            <FormLabel>
                               <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Ticket Atendidos</Typography>
                            </FormLabel>
                                <TextField
                                    variant="filled"
                                    fullWidth 
                                    sx={{ mb: 1 }}
                                    { ...register('tickets')}
                                    error={ !!errors.tickets }
                                    helperText={ errors.tickets?.message }
                                />
                            </FormControl>
                       
                          {/*  <FormControl sx={{ mb: 1 }}>
                                <FormLabel>
                                        <Typography variant="subtitle1" component="div">
                                           Tickets atendidos
                                        </Typography>
                                </FormLabel>
                                
                            <ClienteAutocomplete setClientAutocomplete={setClientAutocomplete} /> 
                        </FormControl>*/}
                        </Box>
                    </Zoom>
                    </Grid>

                </Grid>
            </form>)
}

export default ClientForm