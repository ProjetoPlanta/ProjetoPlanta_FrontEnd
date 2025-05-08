import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/header';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"; 
import CampanhaService from "../Services/campanhaService";
import { useState, useEffect } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CarouselImg1 from '../Imgs/carrossel-bege.png';
import CarouselImg2 from '../Imgs/carrossel-buque.png';
import CarouselImg3 from '../Imgs/carrossel-cacto.png';
import CarouselImg4 from '../Imgs/carrossel-rosa.png';

export default function Home({ planta, setUpdatePage }) {
  const [open, setOpen] = useState(false);
  const [plantasList, setPlantasList] = useState([]);
  const [allPlantas, setAllPlantas] = useState([]);
  const [campanhasAtivas, setCampanhasAtivas] = useState([]);
  const [selectedCampanhaId, setSelectedCampanhaId] = useState(null);
  const navigate = useNavigate();

  const imagensFixas = [
    { src: CarouselImg2, alt: "Planta 2" },
    { src: CarouselImg3, alt: "Planta 3" },
    { src: CarouselImg4, alt: "Planta 4" },
    { src: CarouselImg1, alt: "Planta 1" },
  ];

  const handlePlantas = async () => {
    const response = await PlantaService.getAllPlantas();
    if (Array.isArray(response)) {
      const lista = response.map(el => ({ ...el, nome: el.nomePopular }));
      setAllPlantas(lista);
      setPlantasList(lista);
    }
  };

  const handleCampanhas = async () => {
    const response = await CampanhaService.getAllcampanhas();
    if (Array.isArray(response)) {
      const ativas = response.filter(campanha => campanha.isAtivo);
      setCampanhasAtivas(ativas);
    }
  };

  useEffect(() => {
    handlePlantas();
    handleCampanhas();
  }, []);

  const handleCampanhaClick = (campanhaId) => {
    setSelectedCampanhaId(campanhaId);
    if (campanhaId === null) {
      setPlantasList(allPlantas);
    } else {
      const filtradas = allPlantas.filter(planta =>
        Array.isArray(planta.tags) && planta.tags.includes(campanhaId)
      );
      setPlantasList(filtradas);
    }
  };

  const imagensCarrossel = [
    ...imagensFixas,
    ...campanhasAtivas
      .filter(campanha => campanha.imagem)
      .map(campanha => ({
        src: `data:image/jpeg;base64,${campanha.imagem}`,
        alt: campanha.nome,
      }))
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleNavigate = (data) => {
    navigate(`/ver-planta/${data.id}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="fixed" open={open}> 
        <Header open={open} />
      </AppBar>
      <Toolbar/>

      <Box sx={{ width: '100%' }}>
        <Slider {...sliderSettings}>
          {imagensCarrossel.map((item, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
                loading="lazy"
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Nossas Plantas
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
          <Button
            variant={selectedCampanhaId === null ? 'contained' : 'outlined'}
            onClick={() => handleCampanhaClick(null)}
          >
            Todas
          </Button>
          {campanhasAtivas.map((campanha) => (
            <Button
              key={campanha.id}
              variant={selectedCampanhaId === campanha.id ? 'contained' : 'outlined'}
              onClick={() => handleCampanhaClick(campanha.id)}
            >
              {campanha.nome}
            </Button>
          ))}
        </Box>

        <CardList
          items={plantasList}
          showDeleteButton={false}
          clickCard={handleNavigate}
          cardsPerRow={4}
        />
      </Container>
    </Box>
  );
}
