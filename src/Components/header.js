
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './styles/header.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar({open, handleDrawerOpen}) {
  return (
    // <AppBar position="fixed" open={open}>
    <Toolbar className='bar' >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={[
          {
            marginRight: 5,
          },
          open && { display: 'none' },
        ]}
      >
        <MenuIcon />
        
      </IconButton>
         <img
            src={require('../Imgs/logo-escuro.jpg')} 
            alt="logo"
            height='70px'
            loading="lazy"
          />
    </Toolbar>
  // </AppBar>
  );
}
