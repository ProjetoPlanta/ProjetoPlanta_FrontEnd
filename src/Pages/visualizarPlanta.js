import * as React from 'react';
import Box from '@mui/material/Box';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"
import Divider from '@mui/material/Divider';
import  { useState, useEffect  } from "react";
import {Typography,Snackbar,Alert } from '@mui/material';
import UpdatePlanta from './updatePlanta';
import Modal from "../Components/modal";
import Filter from '../Components/filter';

export default function VisualizarPlanta() {

    const [plantas, setPlantas] = useState([]);


    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedPlanta, setSelectedPlanta] = useState();

    const [isUpdate, setIsUpdate] = useState(false)

    const [open, setOpen] = useState(false)
    const [filteredPlantas, setFilteredPlantas] = useState([]);
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
        if(response.length){
            setPlantas(response?.map(el =>( {...el, nome: el.nomePopular} ?? [])))
        }
        
    }

    const handleUpdatePlanta = (planta) =>{
        setSelectedPlanta(planta)
        setIsUpdate(true)
    }

    const handleGenerateQRCode = async (item) => {
        try {
            const qrCodeUrl = await PlantaService.getQRCode(item.id);
            if (qrCodeUrl.error) {
                throw new Error(qrCodeUrl.message);
            }
            handleDownloadQRCode(qrCodeUrl,item.nomePopular);
        } catch (error) {
            console.error("Erro ao gerar o QR Code:", error);
        }
    };    
    
    const handleDownloadQRCode = (qrCodeUrl,name) => {
        const link = document.createElement("a");
        link.href = qrCodeUrl;
        link.download = `${name}-qrcode.png`;
        link.click();
    };

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
           
                    <Typography variant='h5' sx={{fontFamily: "Qeilab",  marginBottom: 2 }}>
                    Todas as Plantas
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

<Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
  <Box sx={{ flex: 1 }}>
    <CardList
      items={filteredPlantas}
      showDeleteButton={true}
      handleDeleteButton={handleOpenModal}
      clickCard={handleUpdatePlanta}
      cardsPerRow={4} // Agora sim, só 4 por linha
      qrCode={true}
      handleGenerateQRCode={handleGenerateQRCode}
    />
  </Box>

  <Box sx={{ width: 280 }}>
    <Filter
      marginTop={0}
      marginLeft={0}
      plantasList={plantas}
      setFilteredPlantas={setFilteredPlantas}
    />
  </Box>
</Box>
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
                        isDelete={true}
                        textButton="Deletar"
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
  