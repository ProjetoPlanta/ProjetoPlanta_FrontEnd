import * as React from 'react';
import Box from '@mui/material/Box';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"
import Divider from '@mui/material/Divider';
import  { useState, useEffect  } from "react";
import {Typography,Snackbar,Alert } from '@mui/material';
import UpdatePlanta from './updatePlanta';
import Modal from "../Components/modal";


export default function VisualizarPlanta() {

    const [plantas, setPlantas] = useState([]);


    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedPlanta, setSelectedPlanta] = useState();

    const [isUpdate, setIsUpdate] = useState(false)

    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')


    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
      };

      const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedItem(null);
      };

    const handlePlantas = async () => {
        const response =  await PlantaService.getAllPlantas()
        setPlantas(response?.map(el =>( {...el, nome: el.nomePopular} ?? [])))
    }

    const handleUpdatePlanta = (planta) =>{
        setSelectedPlanta(planta)
        setIsUpdate(true)
    }

    const handleDeletePlantas = async () => {
        const response =  await PlantaService.deletePlanta(selectedItem?.id)
        if(response === 200){
            setOpen(true)
            handlePlantas()
            setMessage('Planta Deletada com Sucesso')
        } 

        handleCloseModal()
    }

    const handleGoBack = async (isUpdate) => {
       setIsUpdate(false)
       if(isUpdate){
            setMessage('Planta Atualizada com Sucesso')
            setOpen(true)
            handlePlantas()
       }
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
            handleDeleteButton={handleOpenModal}
            clickCard={handleUpdatePlanta}
          />

           <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}   anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity="success" sx={{ mt: 6 }}>
                    {message}
                </Alert>
            </Snackbar>
            <Modal 
                open={openModal} 
                title="Confirmação de exclusão"
                message="Tem certeza que deseja excluir esse item?"
                onClose={handleCloseModal} 
                onConfirm={handleDeletePlantas} 
            />
        </>
     ) : <UpdatePlanta
            planta={selectedPlanta}
            setUpdatePage={handleGoBack}
            />
            }
     </Box>
     
    );
  }
  