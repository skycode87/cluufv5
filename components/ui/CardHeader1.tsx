import {FC} from 'react'
import { Grid, Typography, Avatar } from '@mui/material';

interface Props{
    title: string;
    avatar?: any;
}


export const  CardHeader1:FC<Props> = ({ title, avatar  }) => {
  return (
    <Grid
    container
    direction="row"
    justifyContent="flex-star"
    alignItems="center"
    spacing={2}
  >
      <Grid item >
         {avatar}
      </Grid>
      <Grid item >
          <Typography variant="h6" gutterBottom component="div" sx={{ marginTop:1 }}>
              {title}
          </Typography>
      </Grid>
  </Grid>
  )
}

