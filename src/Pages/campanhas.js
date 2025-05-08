// Campanhas.jsx
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/header';
import { AppBar, Toolbar, Typography, Divider } from '@mui/material';
import CardList from '../Components/cardList';
import CampanhaService from "../Services/campanhaService";
import { useNavigate } from "react-router-dom";
import EntityForm from '../Components/entityForm';
import DragImage from "../Components/dragImage";

export default function Campanhas() {
  const [open, setOpen] = useState(false);
  const [campanhaList, setCampanhaList] = useState([]);
  const [currentCampanha, setCurrentCampanha] = useState(null);
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampanhas = async () => {
      const response = await CampanhaService.getAllcampanhas();
      if (Array.isArray(response)) {
        setCampanhaList(response);
      }
    };
    fetchCampanhas();
  }, []);

  const handleNavigate = (data) => {
    setCurrentCampanha({...data, name:data.nome});
    setImagem(data.imagem || null);
  };

  const handleSubmit = async (submittedData) => {
    const data = {
      ...submittedData,
      imagem,
      isAtivo: submittedData.isAtivo ?? false,
    };

    let status;
    if (data.id && campanhaList.some(c => c.id === data.id)) {
      status = await CampanhaService.updatecampanha(data.id, data);
      if (status === 200) {
        setCampanhaList(
          campanhaList.map(c => (c.id === data.id ? data : c))
        );
      }
    } else {
      status = await CampanhaService.cadastrarCampanhas(data);
      if (status === 200 || status === 201) {
        const updatedList = await CampanhaService.getAllcampanhas();
        setCampanhaList(updatedList);
      }
    }

    setCurrentCampanha(null);
    setImagem(null);
  };

  const handleDeleteButton = async (item) => {
    const status = await CampanhaService.deletecampanha(item.id);
    if (status === 200) {
      setCampanhaList(campanhaList.filter(c => c.id !== item.id));
    }
  };

  const handleAtivarCampanha = async (item) => {
    const updatedItem = { ...item, isAtivo: !item.isAtivo };
    const status = await CampanhaService.updatecampanha(item.id, updatedItem);
    if (status === 200) {
      setCampanhaList(
        campanhaList.map(c => (c.id === item.id ? updatedItem : c))
      );
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Header open={open} />
      </AppBar>
      <Toolbar />

      <Box>
        <Typography variant="h5" gutterBottom>
          Campanhas
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <DragImage
          className="mb-5"
          previewImage={imagem}
          handleUpload={setImagem}
        />

        <EntityForm
          entityValue={currentCampanha}
          detailsFields='formCampanha'
          handleSubmitForm={handleSubmit}
        />

        <CardList
          items={campanhaList}
          clickCard={handleNavigate}
          cardsPerRow={5}
          showDeleteButton={true}
          handleDeleteButton={handleDeleteButton}
          showAtivarCampanha={true}
          handleAtivarCampanha={handleAtivarCampanha}
        />
      </Box>
    </>
  );
}
