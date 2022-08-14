import { useContext, useState, useEffect } from 'react';

import { Box, Divider, Drawer,  List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { MonetizationOn,  CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined, DashboardOutlined } from '@mui/icons-material';

import { UiContext, AuthContext } from '../../context';
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import {  getSession } from "../../handlers/user";

export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const [user, setUser] = useState(null)


    const logout = () => {
        toggleSideMenu();
        router.push(`/auth/capture`);
    }

    
    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    useEffect(()=>{
        setUser(getSession())
    },[])
  
  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
  <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <List>

               

                {
                    user?._id && (

                    <>
                            <ListItem button onClick={ logout }>
                                    <ListItemIcon>
                                        <LoginOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Cerrar sesión'} />
                            </ListItem>
                    
                         
                            <ListItem 
                                button 
                                onClick={() => navigateTo('/plan/list') }
                            >
                                <ListItemIcon>
                                    <MonetizationOn/>
                                </ListItemIcon>
                                <ListItemText primary={'Planes'} />
                            </ListItem>    


                            <ListItem 
                                button 
                                onClick={() => navigateTo('/pack/list') }
                            >
                                <ListItemIcon>
                                    <MonetizationOn/>
                                </ListItemIcon>
                                <ListItemText primary={'Paquetes/Servicios'} />
                            </ListItem>    
                     
                     
                          
                        </>
                    )
                }


                {
                    !user?._id 
                    && (
                        <ListItem 
                            button
                            onClick={ () => navigateTo(`/auth/${Cookies.get("instance")}`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }


            
            {
                   (user?.role === "ADMIN" ||  user?.role === "SUPERADMIN")  && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
                          
                         

  <ListItem 
                                button 
                                onClick={() => navigateTo('/root/list') }
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        
                        </>
                    )
                }
                 
            </List>
        </Box> 

    </Drawer>
  )
}