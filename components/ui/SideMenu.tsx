import { useContext, useState } from 'react';

import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { MonetizationOn, AddBox, AdminPanelSettings, FormatListNumbered, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined, DashboardOutlined } from '@mui/icons-material';

import { UiContext, AuthContext } from '../../context';
import { useRouter } from 'next/router';


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext( UiContext );
    const { user, isLoggedIn, logout } = useContext(  AuthContext );

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/search/${ searchTerm }`);
    }

    
    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }


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
                    isLoggedIn && (

                    <>
                            <ListItem button onClick={ logout }>
                                    <ListItemIcon>
                                        <LoginOutlined/>
                                    </ListItemIcon>
                                    <ListItemText primary={'Cerrar sesión'} />
                            </ListItem>
                    
                     
                          
                        </>
                    )
                }


                {
                    !isLoggedIn 
                    && (
                        <ListItem 
                            button
                            onClick={ () => navigateTo(`/auth/login`) }
                        >
                            <ListItemIcon>
                                <VpnKeyOutlined/>
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>
                    )
                }


            
            {
                    user?.role === 'root' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
                            <ListItem button
                                      onClick={ () => navigateTo('/task/list') }>
                                <ListItemIcon>
                                    <CategoryOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Todos los Tickets'} />
                            </ListItem>   
                            <ListItem 
                                button 
                                onClick={() => navigateTo('/configurator/inicio') }
                            >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined/>
                                </ListItemIcon>
                                <ListItemText primary={'Configurador'} />
                            </ListItem>    
                            <ListItem 
                                button 
                                onClick={() => navigateTo('/configurator/play') }
                            >
                                <ListItemIcon>
                                    <MonetizationOn/>
                                </ListItemIcon>
                                <ListItemText primary={'Presupuestador'} />
                            </ListItem>    

                        
                        </>
                    )
                }
                 
            </List>
        </Box>
    </Drawer>
  )
}