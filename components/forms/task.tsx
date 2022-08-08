import { ChangeEvent, FC, useMemo, useRef, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import NextLink from "next/link"
import Swal from 'sweetalert2'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { LoadingButton } from '@mui/lab';
import { Link, Box, Button, capitalize, Zoom, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, ListItem, Paper, Radio, RadioGroup, TextField, Typography, Avatar } from '@mui/material';
import { SaveOutlined, UploadOutlined, ArrowBackIos, DeleteForever, Person,  Email, Forum, DynamicForm, Android, AccessibilityNew, PermPhoneMsg } from '@mui/icons-material';
import { MobileDatePicker } from '@mui/x-date-pickers';


import  { axiosApi } from '../../axios'
import { API_ROUTER } from "../../config";

import { userById } from '../../handlers/user'

import moment from 'moment';

const validSoftware  = ['Via-Control','TopSolid V7','TopSolid V6','Especial','CNC·Creator','ARDIS Stock','ARDIS Optimizer','3CAD']
const colorText = { color: "#294595"}


import { ITask  } from '../../interfaces';
import {  blueGrey } from '@mui/material/colors';
import { CardHeader1 } from '../../components/ui';

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
    status     : string;
    user       : any;
    phone      : string;
    duration   : number;
    serial?    : string;
    closuredate: string;
    mode?      : string;
    isDelete   : boolean;
}

interface Props { ownersArray: any; taskId?: string | string[];  onSubmit: any; isSaving: boolean; task?: ITask | null }


const TaskForm:FC<Props> = ({ onSubmit, isSaving = false, task, ownersArray }) => {


    const fileInputRef = useRef<HTMLInputElement>(null)
    const [ newTagValue, setNewTagValue ] = useState('');


    const { register, control, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: task
    })
    
    const handleChange = ({ target } ) => {
       const {  value, name } = target;
      console.log(target);
    }
    
    const onChangeOwner = ( owner: string ) => {
        const currentOwners = getValues('owners');
        if ( currentOwners.includes( owner ) ) {
            getValues('owners').length === 1 && setValue('status','onhold');            
            return setValue('owners', currentOwners.filter( s => s !== owner ), { shouldValidate: true } );
        }
        setValue('owners', [ ...currentOwners, owner ], { shouldValidate: true });
        setValue('status','open');
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

    useMemo(() => {
        (async () => {
            try{
                
                let clientId = task?.user || false;

                if(task?.new && task?.client){
                       const { company, email, phone, software } = task.client;
                       setValue("company", company);
                       setValue("email", email || "", { shouldValidate: true });
                       setValue("phone", phone || "", { shouldValidate: true });
                       setValue("software", software, { shouldValidate: true });
                       setValue("priority", "mid", { shouldValidate: true });

                }
                
            }catch(err){
                console.log(err);
            }
          })();
  }, [task?.user])

  

    return (<form onSubmit={ handleSubmit( onSubmit ) }>

                <Zoom in style={{ transitionDelay: '300ms'}} >
                    <Box className="card-style01" display='flex' justifyContent='end' sx={{ mb: 1 }}>
                            <NextLink passHref href={`/task/list`}>
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

                <Grid container spacing={2}>

                <Grid item xs={12} sm={ 6 }>
                            <Zoom in style={{ transitionDelay: '550ms'}} >
                                <Box className="card">

                                <CardHeader1  
                                    title="Acerca de la asignación" 
                                    avatar={ 
                                        <Avatar sx={{ bgcolor: blueGrey[900] }} variant="rounded">
                                        <AssignmentIcon />
                                        </Avatar>} 
                                />
                                

                                    <FormControl sx={{ mb: 1 }}>
                                    <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }}  gutterBottom>Software::</Typography>
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
                                    <Divider sx={{ my: 1 }} />


                                    <FormControl sx={{ mb: 1 }}>
                                            <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Descripción breve de la tarea</Typography>
                                            </FormLabel>
                                        <TextField
                                                variant="filled"
                                                fullWidth 
                                                multiline
                                                sx={{ mb: 1 }}
                                                { ...register('message', {
                                                    required: 'Este campo es requerido',
                                                })}
                                                error={ !!errors.message }
                                                helperText={ errors.message?.message }
                                            />
                                    </FormControl>
                                    <Divider sx={{ my: 1 }} />

                                    <FormGroup>
                                      

                                        <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Asignación</Typography>
                                            </FormLabel>
                                    
                                    { ownersArray && ownersArray?.length > 0 ?  
                                    
                                        <Grid container spacing={2}>
                                            {
                                                ownersArray.map(owner => (
                                                <Grid key={owner._id} item xs={6} sm={4}>
                                                
                                                    <FormControlLabel
                                                        key={owner._id}
                                                        control={ <Checkbox  checked={ getValues('owners') &&  getValues('owners').includes(owner._id) } />} 
                                                        label={<> <Avatar alt={owner.name } sx={{ display:"inline-block",  width: 32, height: 32  }}  src={owner.avatar} />{owner.name }</> } 
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
                                    <Divider sx={{ my: 1 }} />



                                    <Grid container spacing={2}>
                                        
                                                    <Grid item xs={12} sm={6}>
                                                        
                                    <FormGroup>

                                        <FormLabel>
                                                <Typography variant="button" display="block" sx={{ ...colorText }} gutterBottom>Fecha de Expiración</Typography>
                                            </FormLabel>
                                        


            <Controller
                    control={control}
                    name="closuredate"
                    rules={{ required: true }} //optional
                    render={({
                        field: { onChange, name, value },
                        fieldState: { invalid, isDirty }, //optional
                        formState: { errors }, //optional, but necessary if you want to show an error message
                    }) => (
                        <>
                        <MobileDatePicker
                            value={ getValues('closuredate') }
                            inputFormat="MM/dd/yyyy"
                            renderInput={(params) => <TextField           
                            {...params} />}                                
                            onChange={ (valos:any) => { handleChange; setValue('closuredate', moment(valos).format('MM/DD/YYYY')) } }
                            onAccept={ (valos:any) => { setValue('closuredate',moment(valos).format('MM/DD/YYYY')) } }
                        />
                        {errors && errors[name] && errors[name].type === "required" && (
                            //if you want to show an error message
                            <span>your error message !</span>
                        )}
                        </>
                    )}
                    />


                                    </FormGroup>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>


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
                                                                
                                            <Grid item xs={6}>
                                                    <FormControlLabel
                                                        key="onhold"    
                                                        value="onhold"                                                                                        
                                                        control={ <Radio color='secondary' /> }
                                                        label={<><BookmarkIcon color="error" /> En Espera</>}
                                                    />
                                            </Grid>

                                            <Grid item xs={6}>
                                                { getValues("owners").length > 0 && <FormControlLabel 
                                                    key="open"         
                                                    value="open"
                                                    control={ <Radio color='secondary' /> }
                                                    label={<><BookmarkIcon color="success" /> Abierto</>}
                                                />
                                                }
                                            </Grid>

                                            <Grid item xs={6}>
                                            <FormControlLabel 
                                             
                                                key="close" 
                                                value="close"                                                                                        
                                                control={ <Radio color='secondary' /> }
                                                label={<><BookmarkIcon color="secondary" />Solventado</>}
                                            />
                                             </Grid>
                                    
                                             <Grid item xs={6}>
                                            <FormControlLabel 
                                                key="cancel"       
                                                value="cancel"                                                                                     
                                                control={ <Radio color='secondary' /> }
                                                label={<><BookmarkIcon color="disabled" />Cancelado</>}
                                            />
                                            </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>

                                </Box>
                            </Zoom>
                        
                   
                        </Grid>


                        <Grid item xs={12} sm={ 6 }>

                            <Zoom in style={{ transitionDelay: '400ms'}} >
                                <Box className="card">

                        
                                    <CardHeader1  
                                    title="Acerca del contacto" 
                                    avatar={ 
                                        <Avatar sx={{ bgcolor: blueGrey[900] }} variant="rounded">
                                        <Person />
                                        </Avatar>} 
                                    />
                                        
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