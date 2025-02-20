import * as React from 'react';
import Box from '@mui/material/Box';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"
import Divider from '@mui/material/Divider';
import  { useState, useEffect  } from "react";
import {Typography,Snackbar,Alert } from '@mui/material';
import UpdatePlanta from './updatePlanta';


export default function VisualizarPlanta() {

    const [plantas, setPlantas] = useState([]);

    const [selectedPlanta, setSelectedPlanta] = useState();

    const [isUpdate, setIsUpdate] = useState(false)

    const [open, setOpen] = useState(false)

    const handlePlantas = async () => {
        const response =  await PlantaService.getAllPlantas()
        setPlantas(response.map(el =>( {...el, nome: el.nomePopular})))
    }

    const handleUpdatePlanta = (planta) =>{
        setSelectedPlanta(planta)
        setIsUpdate(true)
    }

    const handleDeletePlantas = async (item) => {
        const response =  await PlantaService.deletePlanta(item.nome)
        if(response === 200){
            setOpen(true)
            handlePlantas()
        } 
    }

    const handleGoBack = async () => {
       setIsUpdate(false)
    }

    useEffect( () => { 
        handlePlantas()
      }, []);
    
return (
    <Box>
        { !isUpdate ? (
            <>
          <Typography  sx={{ marginBottom: 2 }}>
           Visualizar Plantas
          </Typography>
          <Divider />
          <CardList
            items={plantas}
            showDeleteButton={true}
            handleDeleteButton={handleDeletePlantas}
            clickCard={handleUpdatePlanta}
          />

           <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}   anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity="success"   sx={{ mt: 6 }}>
                    Planta Deletada com sucesso!
                </Alert>
        </Snackbar>
        </>
     ) : <UpdatePlanta
            planta={selectedPlanta}
            setUpdatePage={handleGoBack}
            />
            }
     </Box>
     
    );
  }
  