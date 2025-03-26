import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../Components/header';
import { AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Container, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Typography, Divider, Button, Slider } from '@mui/material';
import CardList from '../Components/cardList';
import PlantaService from "../Services/plantasService"; 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from '../Components/filter';

export default function Plantas() {
  const [open, setOpen] = useState(false);
  const [plantasList, setPlantasList] = useState([]);
  const [filteredPlantas, setFilteredPlantas] = useState([]);
 
  const navigate = useNavigate();

  useEffect(() => {
    const handlePlantas = async () => {
      const response = await PlantaService.getAllPlantas();
      if (response.length) {
        setPlantasList(response.map(el => ({ ...el, nome: el.nomePopular })));
      }
    };
    handlePlantas();
  }, []);

  const handleNavigate = async (data) =>{
    navigate(`/ver-planta/${data.id}`);
  }

  

  return (
    <>
     <Box sx={{ display: 'flex', width: "100%" }}>
       <AppBar position="fixed">
        <Header open={open} />
       </AppBar>
     
       <Box sx={{ display: 'flex' }}>
       <Filter marginTop={8} plantasList={plantasList} setFilteredPlantas={setFilteredPlantas} />
         <Box  sx={{ marginLeft: 5, paddingTop: 2, marginTop: 10, marginRight: 5}}>
           <Typography variant="h5" gutterBottom>
            Todas as Plantas
           </Typography>
           <Divider sx={{ marginBottom: 2 }} /> 
          <CardList
                 items={filteredPlantas}
                  showDeleteButton={false} 
                  clickCard={handleNavigate} 
                  cardsPerRow={5}  
            />

          </Box>
      </Box>
     </Box> 
    </>
  );
}
