import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert,Button,Card,CardContent   } from '@mui/material';
import { useState, useEffect } from "react";
import "../Styles/login.css";

export default function Login({planta, setUpdatePage}) {

     const [open, setOpen] = useState(false)
     const [message, setMessage] = useState('')

      const handleSubmit = async (submitedData) => {
     
      };
      return (
        <Box className="container">
        <Box className="form-section full-width">
          <Card className="card full-height wider-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                    Entrar
              </Typography>
              <EntityForm 
                detailsFields="formLogin" 
                handleSubmitForm={(data) => console.log(data)} 
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
  