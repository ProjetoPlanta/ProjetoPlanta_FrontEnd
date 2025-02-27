
import * as React from 'react';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import './styles/header.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box'
import { logout } from '../Store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../Hooks/useAuth';


export default function ButtonAppBar({open, handleDrawerOpen, isAdmin}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };


  return (
    <Toolbar className='bar' >
      {isAdmin && 
        <>
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
        </>
      }
     
         <img
            src={require('../Imgs/logo-escuro.jpg')} 
            alt="logo"
            height='70px'
            loading="lazy"
          />
       
        <Button sx={[{color: 'white'}]} onClick={() => navigate("/")}>Home</Button>
        { isAuthenticated && (
        <Button sx={[{color: 'white'}]} onClick={() => navigate("/admin")}>Admin</Button>
        )
        }
        {/* <Button color="inherit" onClick={() => navigate("/about")}>Sobre</Button>
        <Button color="inherit" onClick={() => navigate("/contact")}>Contato</Button> */}
       {isAdmin && (
        <IconButton color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto' }}>
          <LogoutIcon />
        </IconButton>
      )}
    </Toolbar>

  );
}
