import * as React from 'react';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Store/authSlice';
import { useAuth } from '../Hooks/useAuth';
import CartMenu from './cartMenu';
import SearchMenu from './SearchMenu';
import './styles/header.css';
export default function Header({ open, handleDrawerOpen, isAdmin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Toolbar className='bar'>
      {isAdmin && (
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={[{ marginRight: 5 }, open && { display: 'none' }]}
        >
          <MenuIcon />
        </IconButton>
      )}

      <img src={require('../Imgs/logo-escuro.jpg')} alt='logo' height='70px' loading='lazy' />

      <Button sx={{ color: 'white' }} onClick={() => navigate('/')}>Home</Button>
      {isAuthenticated && (
        <Button sx={{ color: 'white' }} onClick={() => navigate('/admin')}>Admin</Button>
      )}
      
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '50px' }}>
        <SearchMenu />
        <CartMenu />
      </div>

      {isAdmin && (
        <IconButton color='inherit' onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      )}
    </Toolbar>
  );
}