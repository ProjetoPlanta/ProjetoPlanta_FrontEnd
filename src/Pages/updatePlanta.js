import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert,Button } from '@mui/material';
import { useState, useEffect } from "react";
import PlantaService from "../Services/plantasService"
import CampanhaService from '../Services/campanhaService';
import DragImage from "../Components/dragImage"

export default function UpdatePlanta({planta, setUpdatePage}) {

     const [imagem, setImagem] = useState(null)
     const [campanhaList, setCampanhaList] = useState([]);

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

      useEffect(() => {
        const fetchCampanhas = async () => {
          const response = await CampanhaService.getAllcampanhas();
          if (Array.isArray(response)) {
            const campanhas = response.map( (el,index) => ({...el, name:el.nome}))
            setCampanhaList(campanhas);
          }
        };
        fetchCampanhas();
      }, []);


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
            customOptions={campanhaList}
            isBackButton={true}
            handleBackButton={handleGoBack}
          />
      
        </Box>
     
    );
  }
  