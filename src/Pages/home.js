import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert,Button,Card,CardContent , AppBar
  } from '@mui/material';
import { useState, useEffect } from "react";
import "../Styles/login.css";
import Header from '../Components/header'

export default function Home({planta, setUpdatePage}) {

     const [open, setOpen] = useState(false)
     const [message, setMessage] = useState('')

      const handleSubmit = async (submitedData) => {
     
      };
      return (
    <Box className="container">
        <AppBar position="fixed" open={open}>
            <Header 
               open={open}
              
            />
             </AppBar>
      </Box>
  );
  }
  