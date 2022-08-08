import { FC } from 'react';

import { useForm } from 'react-hook-form';

import { taskSearchByText } from '../../handlers/task'
import TaskSearchByDate from '../../components/forms/taskSearchByDate';


import {  Button, Grid, TextField,Typography, FormLabel } from '@mui/material';
import {  SaveOutlined } from '@mui/icons-material';

import moment from 'moment';

import { toastInfo, toastWarning } from '../ui/toast'

interface FormData {
    searchText    : string;
    from  : string;
    to : string;
}
interface Props { setTasks?: any; initialData?: any, setLoading?: any }


const TaskSearchByText:FC<Props> = ({ setTasks, initialData, setLoading }) => {

    const { register, handleSubmit, setValue, getValues,formState:{ errors } } = useForm<FormData>({  defaultValues: { searchText: ""} })

    const rangeDatesValues = (value) => {
        if(value && moment(value[0]).isValid() && moment(value[1]).isValid() ){
            setValue("from",value[0]);
            setValue("to",value[1]);
        }else{
            setValue("from", undefined);
            setValue("to", undefined);
        }
       
    }

    const onSubmit = async( form: FormData ) => {   
    
        try {          
        setLoading(true);

            if(form.searchText.length > 2 && form.from !== undefined && form.to !== undefined ){
                
                const { tasks, okTasks } = await taskSearchByText({ text: form.searchText, from: form.from, to: form.to  });  
                if(okTasks) {
                    let rowTemp = tasks.map( item => ({...item}))
                    setTasks(rowTemp);                    
                    toastInfo({ title: `${rowTemp.length} registros encontrados para ${form.searchText}` })
                }else{
                    toastWarning({ title: `No se encontraron registros para ${form.searchText}` })
                }
           
            }else if(form.searchText.length > 2 && form.from === undefined && form.to === undefined ){

                const { tasks, okTasks } = await taskSearchByText({ text: form.searchText, from: form.from, to: form.to  });  
                if(okTasks) {
                    let rowTemp = tasks.map( item => ({...item}))
                    setTasks(rowTemp);                    
                    toastInfo({ title: `${rowTemp.length} registros encontrados para dicha busqueda` })
                }else{
                    toastWarning({ title: `No se encontraron registros para ${form.searchText}` });
                    setTasks([]);   
                }
          
          
            }else if(form.searchText.length < 2 && form.from !== undefined && form.to !== undefined ){

                const { tasks, okTasks } = await taskSearchByText({ text: form.searchText, from: form.from, to: form.to  });  
                if(okTasks) {
                    let rowTemp = tasks.map( item => ({...item}))
                    setTasks(rowTemp);                    
                    toastInfo({ title: `${rowTemp.length} registros encontrados para ${form.searchText} \n ${moment(form.from).format("LL")} \n y ${moment(form.to).format("LL")}`  });
                }else{
                    toastWarning({ title: `No se encontraron registros para el rango de  \n ${moment(form.from).format("LL")} y  \n ${moment(form.to).format("LL")}` });
                    setTasks([]);   
                }
          
          
            }else{
                toastInfo({ title: `Se mostraran todos los registros` })
            }
           
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }


    return (
        <form onSubmit={ handleSubmit( onSubmit ) }>
            <Grid container spacing={2}   direction="row" justifyContent="center" alignItems="center">
                        <Grid xs={12} md={4} item>
                           <FormLabel>
                           <Typography variant="button" display="block"  gutterBottom>Ingrese un Serial, Email o Compañia</Typography>
                            </FormLabel>
                            <TextField
                                    fullWidth
                                    variant="filled"
                                    sx={{ mb: 1 }}
                                    { ...register('searchText')}
                                    error={ !!errors.searchText }
                                    helperText={ errors.searchText?.message }
                                />
                        </Grid>
                    
                        <Grid  xs={12} md={4} item>
                            <TaskSearchByDate initialDatesValues={{}} rangeDatesValues={rangeDatesValues} />
                        </Grid>
                
                        <Grid xs={12} md={4} item>
                            <Button 
                                color="secondary"
                                startIcon={ <SaveOutlined /> }
                                sx={{ width: '150px' }}
                                type="submit"
                                //disabled={ isSaving }
                                >
                                Buscar 
                            </Button>
                        </Grid>
            </Grid>
        </form>
    )
}

export default TaskSearchByText