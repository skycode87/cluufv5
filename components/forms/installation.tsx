import { ChangeEvent, FC, useEffect, useRef, useState, useContext } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/router"

import NextLink from "next/link"
import Swal from 'sweetalert2'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import AssignmentIcon from '@mui/icons-material/Assignment'

import { LoadingButton } from '@mui/lab'
import { Link, Box, Button, capitalize, Zoom, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, ListItem, Paper, Radio, RadioGroup, TextField, Typography, Avatar } from '@mui/material';
import { SaveOutlined, UploadOutlined, ArrowBackIos, DeleteForever, Person,  Email, Forum, DynamicForm, Android, AccessibilityNew, PermPhoneMsg } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers'

import TaskSearchByDate from "../forms/taskSearchByDate"


import  { axiosApi } from '../../axios'
import { API_ROUTER } from "../../config"
import { AuthContext } from "../../context/auth";

import moment from 'moment';

const validSoftware  = ['Via-Control','TopSolid V7','TopSolid V6','Especial','CNC·Creator','ARDIS Stock','ARDIS Optimizer','3CAD']
const services  = ['Instalación','Demo','Formación','Asesoramiento','Presupuesto','Otro']

const colorText = { color: "#294595"}


import { ITask  } from '../../interfaces';
import {  blueGrey } from '@mui/material/colors';
import { CardHeader1 } from '../ui';

interface FormData {
    _id?       : string;
    message    : string;
    images     : string[];
    company    : string;
    priority   : string;
    email?     : string;
    software?  : string;
    tags       : string[];
    title?     : string;
    type       : string;
    owners     : string[];
    from?      : string;
    to?        : string;
    status     : string;
    user       : any;
    phone      : string;
    duration   : number;
    serial?    : string;
    closuredate? : string;
    startdate? : string;
    service?   : string;
    mode?      : string;
    isDelete   : boolean;
}

interface Props { ownersArray: any; taskId?: string | string[];  onSubmit: any; isSaving: boolean; task?: ITask | null }


const TaskForm:FC<Props> = ({ onSubmit, isSaving = false, task, ownersArray }) => {

    const { isLoggedIn, user } = useContext(AuthContext);
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [ newTagValue, setNewTagValue ] = useState('');


    const { register, control, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: task
    })
    

    const handleChange = ({ target } ) => {
       const {  value, name } = target;
    }
    
    const onChangeOwner = ( owner: string ) => {
        const currentOwners = getValues('owners');
       
        if(currentOwners.length > 0 && currentOwners[0] === undefined) currentOwners.shift();

        console.log(currentOwners);

        if ( currentOwners.includes( owner ) ) {
            return setValue('owners', currentOwners.filter( s => s !== owner ), { shouldValidate: true } );
        }
        setValue('owners', [ ...currentOwners, owner ], { shouldValidate: true });
    }

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        console.log(newTag);
        setNewTagValue('');

        const currentTags = getValues('tags');

        if ( currentTags?.includes(newTag) ) {
            return;
        }

        currentTags.push(newTag);
    }

    const onFilesSelected = async({ target }: ChangeEvent<HTMLInputElement>) => {
        if ( !target.files || target.files.length === 0 ) {
            return;
        }

        try {
            
            // console.log( file );
            for( const file of target.files ) {
               

                try{
                        const formData = new FormData();
                        formData.append('file', file);
                        const { status, data } = await axiosApi.post(API_ROUTER.TICKET.ticketUploadImage,formData);
                        if(status === 200 ) { 
                            setValue('images', [...getValues('images'), data.message], { shouldValidate: true });
                        }
                        else return null;
    
                }catch(err){
                    alert(err);
                    console.log(err);
                }         
            }


        } catch (error) {
            console.log({ error });
        }
    }

    const onDeleteImage = ( image: string) =>{
        setValue(
            'images', 
            getValues('images').filter( img => img !== image ),
            { shouldValidate: true }
        );
    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( t => t !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }

    const onDelete = () => {
       
        const { serial } = getValues();

        Swal.fire({
            title: 'Deseas confirmar la eliminación?',
            text: `Codigo #${serial}`,
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si, deseo eliminarlo',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setValue('isDelete',true);
                handleSubmit(onSubmit)();
            } else if (result.isDenied) {

            }
          })
    }


    const rangeDatesValues = (value) => {
        if(value && moment(value[0]).isValid() && moment(value[1]).isValid() ){
            setValue("startdate",value[0]);
            setValue("closuredate",value[1]);
        }else{
            setValue("startdate", undefined);
            setValue("closuredate", undefined);
        }
       
    }


    useEffect(() => {
        !isLoggedIn && router.push(`/auth/login`);

        (async () => {
            try{
                
                let clientId = task?.user || false;

                if(task?.new && task?.client){
                       const { company, email, phone, software, service, startdate, closuredate } = task.client;
                       setValue("company", company);
                       setValue("service", service || "", { shouldValidate: true });
                       setValue("phone", phone || "", { shouldValidate: true });
                       setValue("software", software, { shouldValidate: true });
                       setValue("priority", "mid", { shouldValidate: true });
                       setValue("type", "installation");
                       setValue('mode', "Llamada", { shouldValidate: true })

                       if(user.role === "client" || user.role === "root" ){
                        setValue('owners', [ user._id ], { shouldValidate: true });
                        setValue('status','onhold');
                       }


                       if(startdate === undefined) setValue('startdate', String(moment()));
                       if(closuredate === undefined) setValue('closuredate',  String(moment()));

                       
                       
                }else{

                   // setValue('closuredate',startdate);
                   // setValue('startdate',closuredate);
                }
                
                

            }catch(err){
                console.log(err);
            }
          })();
  }, [task?.user])

  

    return (<form onSubmit={ handleSubmit( onSubmit ) }>

                <Zoom in style={{ transitionDelay: '300ms'}} >
                    <Box className="card-style01" display='flex' justifyContent='end' sx={{ mb: 1 }}>
                           
                                <Link>
                                <Button 
                                    onClick={() => router.back()}
                                    color="secondary"
                                    className="circular-btn"
                                    startIcon={ <ArrowBackIos /> }
                                    sx={{ width: '150px' }}
                                    type="button"
                                    >
                                    Volver átras
                                </Button>
                                </Link>
                        
                        <LoadingButton 
                        // loading={ isRemove }
                            color="secondary"
                            startIcon={ <DeleteForever /> }
                            type="button"
                            onClick={onDelete}
                            className="buttonDelete"
                            // disabled={ isRemove }
                            >
                            Eliminar
                        </LoadingButton>
                        <LoadingButton 
                            loading={ isSaving }
                            className="buttonSubmit"
                            color="secondary"
                            startIcon={ <SaveOutlined /> }
                            type="submit"
                            disabled={ isSaving }>
                            Guardar
                        </LoadingButton>
                    </Box>
                </Zoom>

                <Grid container spacing={2}>

                <Grid item xs={12} sm={ 6 }>
                            <Zoom in style={{ transitionDelay: '550ms'}} >
                                <Box className="card">

                                    <FormLabel>
                                        <Typography variant="button" display="block" sx={{ ...colorText }} >Nombre de la Compañia</Typography>
                                    </FormLabel>
                                    <TextField
                                        variant="filled"
                                        fullWidth 
                                        sx={{ mb: 1 }}
                                        { ...register('company')}
                                        error={ !!errors.company }
                                        helperText={ errors.company?.message }
                                    />



                        <FormControl sx={{ mb: 1 }}>
                                            <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom> Información de contacto</Typography>
                                            </FormLabel>
                                        <TextField
                                                variant="filled"
                                                fullWidth 
                                                multiline
                                                sx={{ mb: 1 }}
                                                { ...register('message')}
                                                error={ !!errors.message }
                                                helperText={ errors.message?.message }
                                            />
                                    </FormControl>
                                    <Divider sx={{ my: 1 }} />

                                     <Divider sx={{ my: 1 }} />


                                     <FormLabel>
                                             <Typography variant="button" display="block" sx={{ ...colorText }} >Teléfono de contacto</Typography>
                                            </FormLabel>
                                    <TextField
                                        label=""
                                        variant="filled"
                                        fullWidth 
                                        sx={{ mb: 1 }}
                                        { ...register('phone', {})}
                                        error={ !!errors.phone }
                                        helperText={ errors.phone?.message }
                                    />

                                     <Divider sx={{ my: 1 }} />

                                        <FormLabel>
                                            <Typography variant="button" display="block" sx={{ ...colorText }} >Email del contacto</Typography>
                                        </FormLabel>
                                        <TextField
                                            variant="filled"
                                            fullWidth 
                                            sx={{ mb: 1 }}
                                            { ...register('email')}
                                            error={ !!errors.email }
                                            helperText={ errors.email?.message }
                                        />



                                    <FormControl sx={{ mb: 1 }}>
                                    <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }}  gutterBottom>Tipo de Servicio:</Typography>
                                            </FormLabel>
                                            <Grid container spacing={2} sx={{ pl: 3, pt: 2 }}>
                                                                                
                                        <RadioGroup
                                            row
                                            value={ getValues('service') }
                                            onChange={ ({ target })=> setValue('service', target.value, { shouldValidate: true }) }
                                        >
                                            {
                                                services.map( option => (
                                                    <Grid item xs={6}  key={ option }>
                                                    <FormControlLabel 
                                                        key={ option }
                                                        value={ option }
                                                        control={ <Radio color='secondary' /> }
                                                        label={ capitalize(option) }
                                                    />
                                                    </Grid>
                                                ))
                                            }
                                        
                                        </RadioGroup>
                                        </Grid>
                                    </FormControl>

                                    <Divider sx={{ my: 1 }} />

                        
                                    <FormControl sx={{ mb: 1 }}>
                                    <TaskSearchByDate initialDatesValues={task} rangeDatesValues={rangeDatesValues} text="Rango de fecha"  />
                                    </FormControl>
                                    <Divider sx={{ my: 1 }} />


                                <FormControl sx={{ mb: 1 }}>
                                        <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Estatus:</Typography>
                                            </FormLabel>
                                <RadioGroup
                                    row
                                    value={ getValues('status') }
                                    onChange={ ({ target })=> setValue('status', target.value, { shouldValidate: true }) }
                                >
                                    <Grid container spacing={2}>
                                                                
                                            <Grid item xs={3}>
                                                    <FormControlLabel
                                                        key="onhold"    
                                                        value="onhold"                                                                                        
                                                        control={ <Radio color='secondary' /> }
                                                        label={<><BookmarkIcon color="error" /> Espera</>}
                                                    />
                                            </Grid>

                                            <Grid item xs={3}>
                                                { getValues("owners").length > 0 && <FormControlLabel 
                                                    key="open"         
                                                    value="open"
                                                    control={ <Radio color='secondary' /> }
                                                    label={<><BookmarkIcon color="success" /> Abierto</>}
                                                />
                                                }
                                            </Grid>

                                            <Grid item xs={3}>
                                            <FormControlLabel 
                                             
                                                key="close" 
                                                value="close"                                                                                        
                                                control={ <Radio color='secondary' /> }
                                                label={<><BookmarkIcon color="secondary" /> Cerrar</>}
                                            />
                                             </Grid>
                                    
                                             <Grid item xs={3}>
                                            <FormControlLabel 
                                                key="cancel"       
                                                value="cancel"                                                                                     
                                                control={ <Radio color='secondary' /> }
                                                label={<><BookmarkIcon color="disabled" /> Anulado</>}
                                            />
                                            </Grid>
                                    </Grid>
                                </RadioGroup>
                                </FormControl>
                                <Divider sx={{ my: 1 }} />

                                    <FormControl sx={{ mb: 1 }}>
                                    <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }}  gutterBottom>Software:</Typography>
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
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Prioridad:</Typography>
                                            </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                value={ getValues('priority') }
                                                                onChange={ ({ target })=> setValue('priority', target.value, { shouldValidate: true }) }
                                                            >
                                                            
                                                                        <Grid container spacing={2}>
                                                                
                                                                            <Grid item xs={4}>
                                                                                <FormControlLabel 
                                                                                                        key="low"    
                                                                                                        value="low"                                                                                        
                                                                                                        control={ <Radio color='secondary' /> }
                                                                                                        label="Baja"
                                                                                                    />
                                                                            </Grid>

                                                                            <Grid item xs={4}>
                                                                                    <FormControlLabel 
                                                                                        key="mid" 
                                                                                        value="mid"                                                                                        
                                                                                        control={ <Radio color='secondary' /> }
                                                                                        label="Media"
                                                                                    />
                                                                            </Grid>

                                                                            <Grid item xs={4}>
                                                                                <FormControlLabel 
                                                                                    key="high"       
                                                                                    value="high"                                                                                     
                                                                                    control={ <Radio color='secondary' /> }
                                                                                    label="Alta"
                                                                                />
                                                                            </Grid>

                                                                      </Grid>
                                                            </RadioGroup>
                                    </FormControl>
                                  



                                    <Grid container spacing={2}>
                                        

                                                    <Grid item xs={12} sm={12}>
                                                        <FormGroup>

                                                            <FormLabel>
                                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Tiempo de duración efectiva:</Typography>
                                                            </FormLabel>
                                                                        
                                                            <TextField
                                                                variant="filled"
                                                                fullWidth 
                                                                sx={{ mb: 1 }}
                                                                type="number"
                                                                InputLabelProps={{
                                                                shrink: true,
                                                                }}
                                                                error={ !!errors.duration }
                                                                helperText={ errors.duration?.message }
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end">Horas</InputAdornment>,
                                                                }}
                                                                { ...register('duration')}
                                                            />
                                                        </FormGroup>
                                                    </Grid>
                                    </Grid>

                                


                                    <Divider sx={{ my: 1 }} />

                 

                       


                                </Box>
                            </Zoom>
                        
                   
                </Grid>


                        <Grid item xs={12} sm={ 6 }>

                            <Zoom in style={{ transitionDelay: '400ms'}} >
                                <Box className="card">

                                <FormGroup>
                                      
                                          <Divider sx={{ my: 1 }} /> 
                                             <FormControl sx={{ mb: 1 }}>
                                                            
                                            <FormLabel>
                                             <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Vía de contacto </Typography>
                                            </FormLabel>
                                        <RadioGroup
                                            row
                                            value={ getValues('mode') }
                                            onChange={ ({ target })=> setValue('mode', target.value, { shouldValidate: true }) }
                                        >
                                                           <Grid container spacing={2}>
                                                                
                                                                <Grid item xs={6} md={4}>
                                                                        <FormControlLabel
                                                                            key="Llamada"    
                                                                            value="Llamada"                                                                                        
                                                                            control={ <Radio color='secondary' /> }
                                                                            label={<><PermPhoneMsg color="error" /> Llamada</>}
                                                                        />
                                                                </Grid>
                    
                                                                <Grid item xs={6}  md={4}>
                                                                     <FormControlLabel 
                                                                        key="Email"         
                                                                        value="Email"
                                                                        control={ <Radio color='secondary' /> }
                                                                        label={<><Email color="success" /> Email</>}
                                                                    />
                                                                    
                                                                </Grid>
                    
                                                                <Grid item xs={6}  md={4}>
                                                                <FormControlLabel 
                                                                 
                                                                    key="Chat" 
                                                                    value="Chat"                                                                                        
                                                                    control={ <Radio color='secondary' /> }
                                                                    label={<><Forum color="secondary" /> Chat</>}
                                                                />
                                                                 </Grid>
                                                        
                                                                 <Grid item xs={6}  md={4}>
                                                                    <FormControlLabel 
                                                                        key="Website"       
                                                                        value="Website"                                                                                     
                                                                        control={ <Radio color='secondary' /> }
                                                                        label={<><DynamicForm color="success" />Website</>}
                                                                    />
                                                                </Grid>

                                                                 <Grid item xs={6}  md={4}>
                                                                    <FormControlLabel 
                                                                        key="Insitu"       
                                                                        value="Insitu"                                                                                     
                                                                        control={ <Radio color='secondary' /> }
                                                                        label={<><Android color="secondary" />Insitu</>}
                                                                    />
                                                                </Grid>     

                                                                <Grid item xs={6}  md={4}>
                                                                    <FormControlLabel 
                                                                        key="Otro"       
                                                                        value="Otro"                                                                                     
                                                                        control={ <Radio color='secondary' /> }
                                                                        label={<><AccessibilityNew color="error" />Otro</>}
                                                                    />
                                                                </Grid>                                                             
                                                        </Grid>
                                        </RadioGroup>
                                             </FormControl>


                                      <FormLabel>
                                              <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Asignación</Typography>
                                          </FormLabel>
                                  
                                  { ownersArray && ownersArray?.length > 0 ?  
                                  
                                      <Grid container spacing={2}>
                                          {
                                              ownersArray.map(owner => (
                                              <Grid key={owner._id} item xs={6} sm={6}>
                                              
                                                  <FormControlLabel
                                                      key={owner._id}
                                                      control={ <Checkbox  checked={ getValues('owners') &&  getValues('owners').includes(owner._id) } />} 
                                                      label={<> <Avatar alt={owner.name } sx={{ display:"inline-block",  width: 32, height: 32  }}  src={owner.avatar} /> {owner.name}  </> } 
                                                      onChange={ () => onChangeOwner( owner._id )  }
                                                  />
                                              </Grid> 
                                              ))
                                          }      
                                      </Grid> 
                                      :
                                      <h2>No hay usuarios</h2>
                      
                                  }
                                  
                                </FormGroup>
                             

                                  
                                </Box>
                            </Zoom>

                            <Divider sx={{ my: 1 }} />

                            <Zoom in style={{ transitionDelay: '500ms'}} >
                                <Box className="card">

                                    <CardHeader1  
                                        title="Datos extras" 
                                        avatar={ 
                                            <Avatar sx={{ bgcolor: blueGrey[900] }} variant="rounded">
                                            <Person />
                                            </Avatar>} 
                                    />

                                                     

                                         
                                    <Divider sx={{ my: 1 }} />


                                                        <FormLabel>
                                                            <Typography variant="button" display="block" sx={{ ...colorText }} >Etiquetas</Typography>
                                                        </FormLabel>
                                                       <TextField
                                                            variant="filled"
                                                            fullWidth 
                                                            sx={{ mb: 1 }}
                                                            helperText="Presiona [spacebar] para agregar"
                                                            value={ newTagValue }
                                                            onChange={ ({ target }) => setNewTagValue(target.value) }
                                                            onKeyUp={ ({ code })=> code === 'Space' ? onNewTag() : undefined }
                                                        />
                                                        
                                                        <Box sx={{
                                                            display: 'flex',
                                                            flexWrap: 'wrap',
                                                            listStyle: 'none',
                                                            p: 0,
                                                            m: 0,
                                                        }}
                                                        component="ul">
                                                            {
                                                                getValues('tags') && getValues('tags').map((tag) => {
                                                                        return (
                                                                            <Chip
                                                                                key={tag}
                                                                                label={tag}
                                                                            onDelete={ () => onDeleteTag(tag)}
                                                                                color="primary"
                                                                                size='small'
                                                                                sx={{ ml: 1, mt: 1}}
                                                                            />
                                                                        );
                                                                    })

                                                                
                                                            }
                                                        </Box>


                                                        <Box display='flex' flexDirection="column">
                                        
                                                        <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Adjuntar imagenes:</Typography>
                                            </FormLabel>

                                        <Button
                                            color="secondary"
                                            fullWidth
                                            startIcon={ <UploadOutlined /> }
                                            sx={{ mb: 3 }}
                                            onClick={ () => fileInputRef.current?.click() }
                                        >
                                            Cargar imagen
                                        </Button>
                                        <input 
                                            ref={ fileInputRef }
                                            type="file"
                                            multiple
                                            accept='image/png, image/gif, image/jpeg'
                                            style={{ display: 'none' }}
                                            onChange={ onFilesSelected }
                                        />


                                    
                                        <Grid container spacing={2}>
                                            {
                                                getValues('images').map( img => (
                                                    <Grid item xs={4} sm={3} key={img}>
                                                        <Card>
                                                            <CardMedia 
                                                                component='img'
                                                                className='fadeIn'
                                                                image={ img }
                                                                alt={ img }
                                                            />
                                                            <CardActions>
                                                                <Button 
                                                                    fullWidth 
                                                                    color="error"
                                                                    onClick={()=> onDeleteImage(img)}
                                                                >
                                                                    Borrar
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>

                                    </Box>


                                </Box>
                            </Zoom>

                        </Grid>
                   
                   
                      
                </Grid>
            </form>)
}

export default TaskForm