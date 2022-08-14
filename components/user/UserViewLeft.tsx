import { useContext } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import {  IUser  } from '../../interfaces'

// ** Types
import { Avatar, Link } from '@mui/material'

import { AuthContext } from '../../context/auth'


const UserViewLeft = () => {
 
     const { user } = useContext(AuthContext);

    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ paddingTop: 5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar src={user?.avatar} sx={{ width: 120, height: 120, borderRadius: 4, marginBottom: '10px' }}  />
              <Typography variant='h6' >
              {user?.name}
              </Typography>
              <Typography>
                 {user?.email}
              </Typography>
              <Link href="#" color="inherit">
                Cambiar password
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  
}

export default UserViewLeft
