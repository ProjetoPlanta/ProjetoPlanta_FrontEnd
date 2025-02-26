import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert } from '@mui/material';
import { useState } from "react";
import PlantaService from "../Services/plantasService"


export default function CadastroPlanta({handlechangePage}) {

     const [open, setOpen] = useState(false)


      const handleSubmit = async (submitedData) => {
       const response =  await PlantaService.cadastrarPlanta(submitedData)
        if(response === 200){
            setOpen(true)
            handlechangePage('Plantas')
        } 
      };
    
    return (
    <Box>
          <Typography  sx={{ marginBottom: 2 }}>
           Cadastre uma Planta
          </Typography>
          <EntityForm
            detailsFields='formCadastroPlanta'
            handleSubmitForm={handleSubmit}
          />
           <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}   anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity="success"   sx={{ mt: 6 }}>
                    Planta cadastrada com sucesso!
                </Alert>
            </Snackbar>
        </Box>
     
    );
  }
  