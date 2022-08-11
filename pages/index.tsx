import { useContext } from 'react'
import type { NextPage } from 'next'
import { Typography, Grid } from '@mui/material'
import { ShopLayout } from '../components/layouts'
import { AuthContext } from '../context/auth'

import UserViewLeft from '../components/user/UserViewLeft'


const HomePage: NextPage = () => {

  const { user, isLoggedIn, isAdmin, isRoot, isUser } = useContext(AuthContext);


  return (
    <ShopLayout title={'Cluuf by Qreatech'} pageDescription={'Cluuf by Qreatech'}>

        <Typography variant='h1' component='h1'></Typography>
     
        <Grid container spacing={6}>
              <Grid item xs={12} md={3}>
                  <UserViewLeft />
              </Grid>
              
        </Grid>
      

    </ShopLayout>
  )
}

export default HomePage
