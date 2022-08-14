/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect} from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Box, Button, Link, Toolbar, Tooltip, Avatar } from '@mui/material';
import { AuthContext } from '../../context/auth'
import { UiContext } from '../../context';
import {  getSession } from "../../handlers/user";



export const AdminNavbar = () => {
    
    const router = useRouter();
    
    const { toggleSideMenu } = useContext( UiContext );
    const [user,setUser] = useState(null);

    useEffect(()=>{
     setUser(getSession())
    },[])
    
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center' sx={{ color: "#fff", fontWeight: 200 }}>
                    <Avatar alt="Walter app" src="/walter.gif"  sx={{  width: 26, height: 26 }} />
                    &nbsp; Cluuf
                    </Link>  
                </NextLink>

               <Box flex={ 1 } />

                   {user?._id &&  <Box className="fadeIn">

                        { user.firstname || "" }
                         {/*   <Avatar src={user?.avatar} sx={{ display: "inline-flex", mt:1, width: 26, height: 26, borderRadius: 2, marginRight: 2 }}  /> */}            
        </Box> }


                 <Box flex={ 1 } />

                <Button onClick={ toggleSideMenu }>
                    Menú
                </Button>

            </Toolbar>
        </AppBar>
    )
}
