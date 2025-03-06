import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/header'
import EntityForm from '../Components/entityForm'
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"; 
import { useState, useEffect } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import SamambaiaImage from '../Imgs/samambaia.jpg';


export default function Home({planta, setUpdatePage}) {

     const [open, setOpen] = useState(false)
      const [plantasList, setPlantasList] = React.useState([]);
      const [selectedCategory, setSelectedCategory] = useState('Todas');
       const navigate = useNavigate();
      // Categorias exemplo só
      const categories = ['Todas', 'Categoria 1', 'Categoria 2', 'Categoria 3'];

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
        { src: SamambaiaImage, alt: "Planta 1" },
        { src: SamambaiaImage, alt: "Planta 2" },
        { src: SamambaiaImage, alt: "Planta 3" },
      ];

      return (
        <Box sx={{ width: "100%"}} >
          <AppBar position="fixed" open={open}>
              <Header open={open}
                  />
          </AppBar>
          <Toolbar/>

          <Box sx={{ width: '100%' }}>
                <Carousel autoPlay animation="fade" navButtonsAlwaysVisible sx={{ width: '100%' }}>
                  {imagensCarrossel.map((item, index) => (
                    <Box key={index} sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                      <img src={item.src} alt={item.alt} style={{ width: "100%", maxHeight: "400px" }} />
                    </Box>
                  ))}
                </Carousel>
            </Box>

            <Container sx={{ textAlign: 'center', mt: 4 }}>
              {/* Lista das Plantas*/}
              <Typography variant="h5" gutterBottom>
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
                />
            </Container>

        </Box>
  );
  }
  