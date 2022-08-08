import { FC } from 'react';

import { useForm } from 'react-hook-form';
import { userSearchByText } from '../../handlers/user'

import {  Button, Grid, TextField } from '@mui/material';
import {  SaveOutlined } from '@mui/icons-material';

import { toastInfo, toastWarning } from '../../components/ui/toast'

interface FormData {
    searchText    : string;
}
interface Props { setClients?: any; initialData?: any, setLoading?: any }


const ClientSearchByText:FC<Props> = ({ setClients, initialData, setLoading }) => {

    const { register, handleSubmit, formState:{ errors } } = useForm<FormData>({  defaultValues: { searchText: ""} })

    const onSubmit = async( form: FormData ) => {   
    
        try {          
            setLoading(true);
            if(form.searchText.length > 2){
                const { users, okUsers } = await userSearchByText({ text: form.searchText });  
                if(okUsers) {
                    let rowTemp = users.map( user => ({
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        company: user.company,
                        role: user.role,
                        software:  user.software,
                        active:  user.active,
                        expired:  user.expired,
                        code:  user.code,
                        domain: user.domain,
                        tag: user.tag
                    }))
                    setClients(rowTemp);                    
                    toastInfo({ title: `${rowTemp.length} registros encontrados para ${form.searchText}` })
                }else{
                    toastWarning({ title: `No se encontraron registros para ${form.searchText}` })
                }
            }else{
                toastInfo({ title: `Se mostraran todos los registros` })
                initialData();
            }

        } catch (error) {
            console.log(error);
            setLoading(false);
        }finally{
            setLoading(false);
        }
    }

   

    return (
        <form onSubmit={ handleSubmit( onSubmit ) }>

<Grid container className='fadeIn'   sx={{ mb: 4 }} >
                <Grid item xs={12} md={8}>
                         <TextField
                            label="Ingrese un Nombre, Email o Compañia:"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1, height: 5,  }}
                            { ...register('searchText')}
                            error={ !!errors.searchText }
                            helperText="Presione ENTER, ingrese más de 3 Caracteres"
                        />
                </Grid>
                <Grid item xs={12} md={4} >
                <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px',  mt: 0, ml: 1 }}
                        type="submit"
                        
                        //disabled={ isSaving }
                        >
                    
                    </Button>
                </Grid>
</Grid>    

                  

                   
        </form>
    )
}

export default ClientSearchByText