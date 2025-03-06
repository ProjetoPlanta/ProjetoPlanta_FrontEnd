import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert,Button } from '@mui/material';
import { useState, useEffect } from "react";
import PlantaService from "../Services/plantasService"
import DragImage from "../Components/dragImage"

export default function UpdatePlanta({planta, setUpdatePage}) {

     const [imagem, setImagem] = useState(null)

      const handleSubmit = async (submitedData) => {
        if(imagem){
          submitedData =  {...submitedData, imagem:imagem, caminhoImagem:'dqwdqwdqwdqwdwq'}
        }
       const response =  await PlantaService.updatePlanta(submitedData.id,submitedData)
        if(response === 200){
            setUpdatePage(true)
        } 
      };

      const handleGoBack = () => {
        setUpdatePage(false)
      }

    return (
    <Box>
          <Typography  sx={{ marginBottom: 2 }}>
           Atualizar Planta
          </Typography>
          <Box mb={5}>
            <DragImage
            handleUpload={setImagem}
            previewImage={planta.imagem}
            />
          </Box>
          <EntityForm
            detailsFields='formCadastroPlanta'
            handleSubmitForm={handleSubmit}
            entityValue={planta}
            isBackButton={true}
            handleBackButton={handleGoBack}
          />
      
        </Box>
     
    );
  }
  