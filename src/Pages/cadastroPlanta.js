import * as React from 'react';
import Box from '@mui/material/Box';
import EntityForm from '../Components/entityForm'
import {Typography,Snackbar,Alert } from '@mui/material';
import { useState, useEffect } from "react";
import PlantaService from "../Services/plantasService"
import DragImage from "../Components/dragImage"
import CampanhaService from '../Services/campanhaService';

export default function CadastroPlanta({handlechangePage}) {

     const [open, setOpen] = useState(false)
     const [imagem, setImagem] = useState(null)
      const [campanhaList, setCampanhaList] = useState([]);

      const handleSubmit = async (submitedData) => {
        if(imagem){
          submitedData =  {...submitedData, imagem:imagem, caminhoImagem:'dqwdqwdqwdqwdwq'}
        }
       const response =  await PlantaService.cadastrarPlanta(submitedData)
        if(response === 200){
            setOpen(true)
            handlechangePage('Plantas')
        } 
      };

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
          <Typography variant='h5' sx={{fontFamily: "Qeilab",  marginBottom: 2 }}>
           Cadastrar uma Planta
          </Typography>
          <Box mb={5}>
            <DragImage
            handleUpload={setImagem}
            />
          </Box>
          <EntityForm
            detailsFields='formCadastroPlanta'
            handleSubmitForm={handleSubmit}
            customOptions={campanhaList}
          />
           <Snackbar open={open} autoHideDuration={1000} onClose={() => setOpen(false)}   anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={() => setOpen(false)} severity="success"   sx={{ mt: 6 }}>
                    Planta cadastrada com sucesso!
                </Alert>
            </Snackbar>
        </Box>
     
    );
  }
  