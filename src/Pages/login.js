import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert,Button,Card,CardContent   } from '@mui/material';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { login } from '../Store/authSlice';
import { useNavigate } from 'react-router-dom';
import "../Styles/login.css";
import LoginService from '../Services/loginService';

export default function Login({planta, setUpdatePage}) {

     const [open, setOpen] = useState(false)
     const [message, setMessage] = useState('')


     const dispatch = useDispatch();
     const navigate = useNavigate();

      const handleSubmit = async (submitedData) => {
        // const fakeToken = '1234567890abcdef';
        const credentials = {email:submitedData.login,senha:submitedData.senha}
        const response =  await LoginService.login(credentials)
        if(response?.token){
           dispatch(login(response.token));
            navigate('/admin');
        }
        else{ 
          setOpen(true)
          setMessage("Login ou Senha incorretos")
        }
       
      };
      return (
        <Box className="container">
        <Box className="form-section full-width">
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}   anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ mt: 6 }}>
                    {message}
                </Alert>
          </Snackbar>
          <Card className="card full-height wider-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                    Entrar
              </Typography>
              <EntityForm 
                detailsFields="formLogin" 
                handleSubmitForm={handleSubmit} 
                isBackButton={false} 
                handleBackButton={() => {}} 
              />
            </CardContent>
          </Card>
        </Box>
        <Box className="image-section"></Box>
      </Box>
  );
  }
  