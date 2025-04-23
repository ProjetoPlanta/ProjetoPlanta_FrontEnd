import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/header'
import EntityForm from '../Components/entityForm'
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"; 
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


export default function Home({planta, setUpdatePage}) {

     const [open, setOpen] = useState(false)
      const [plantasList, setPlantasList] = React.useState([]);
      const [selectedCategory, setSelectedCategory] = useState('Todas');
       const navigate = useNavigate();
      // Categorias exemplo só
      const categories = ['Todas', 'Flores', 'Decorativas', 'Funcionais'];

      // Carrega plantas
      const handlePlantas = async () => {
        const response = await PlantaService.getAllPlantas();
        if(response.length){
          setPlantasList(response?.slice(0, 8).map(el => ({ ...el, nome: el.nomePopular})))
        }
        
      };
      React.useEffect(() => {
        handlePlantas();
      }, []);
      
     const handleNavigate = async (data) =>{
      navigate(`/ver-planta/${data.id}`);
      }


      //futuro filtro pra eu não me perder
      const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
      };
      const imagensCarrossel = [
        { src: CarouselImg2, alt: "Planta 2" },
        { src: CarouselImg3, alt: "Planta 3" },
        { src: CarouselImg4, alt: "Planta 4" },
        { src: CarouselImg1, alt: "Planta 1" }
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

      return (
        <Box sx={{ width: "100%"}} >
          <AppBar position="fixed" open={open}>
              <Header open={open}
                  />
          </AppBar>
          <Toolbar/>

          <Box sx={{ width: '100%' }}>
            <Slider {...sliderSettings}>
            {imagensCarrossel.map((item, index) => (
              <Box key={index} sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    width: "100%",
                    height: "500px",
                    objectFit: "cover",
                  }}
                  loading="lazy"
                />
          </Box>
          ))}
          </Slider>
        </Box>

            <Container sx={{ textAlign: 'center', mt: 4 }}>
              {/* Lista das Plantas*/}
              <Typography variant="h4" gutterBottom>
                Nossas Plantas
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={cat === selectedCategory ? 'contained' : 'outlined'}
                    onClick={() => handleCategoryClick(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </Box>
      
                <CardList
                  items={plantasList}
                  showDeleteButton={false} 
                  clickCard={handleNavigate} // futuro direcionamento pra pagina planta
                  cardsPerRow={4} 
                />
            </Container>

        </Box>
  );
  }
  