import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert,Button } from '@mui/material';
import { useState, useEffect } from "react";
import PlantaService from "../Services/plantasService"


export default function UpdatePlanta({planta, setUpdatePage}) {

     const [open, setOpen] = useState(false)


      const handleSubmit = async (submitedData) => {
       const response =  await PlantaService.updatePlanta(submitedData.nomePopular,submitedData)
        if(response === 200){
            setOpen(true)
        } 
      };
    return (
    <Box>
          <Typography  sx={{ marginBottom: 2 }}>
           atualize uma Planta
          </Typography>
          
          <EntityForm
            detailsFields='formCadastroPlanta'
            handleSubmitForm={handleSubmit}
            entityValue={planta}
          />
           <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}   anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity="success"   sx={{ mt: 6 }}>
                    Planta atualzada com sucesso!
                </Alert>
            </Snackbar>
            <Button className='mt-5' type="submit" variant="contained" color="primary" onClick={ () => setUpdatePage()}>Voltar</Button>
        </Box>
     
    );
  }
  