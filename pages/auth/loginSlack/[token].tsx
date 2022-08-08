import { useEffect, useContext,  } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { withRouter } from 'next/router';

import { loginSlackAdmin  } from '../../../handlers/auth'


const LoginSlackPage = ({ router }) => {


            const { token } = router.query;
           loginSlackAdmin(token);
        
    
 return (
                <Box sx={{ width: 350, padding:'10px 20px', background: "#000" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' sx={{ color:"#fff" }} component="h1">Iniciando sesión con slack</Typography>
                        </Grid>
                    </Grid>
                </Box>
  )
}

export default withRouter(LoginSlackPage);
