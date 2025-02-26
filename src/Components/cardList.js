import React from "react";
import { Card, CardContent, Typography, Box, Button, Link } from "@mui/material";

const CardList = ({ items, showDeleteButton, handleDeleteButton, clickCard }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={4}>
    {items.map((item, index) => (
      <Card key={index} sx={{ width: 300, padding: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" } } >
        <CardContent>
        <Box display="flex" justifyContent="center">

                <img
                  src={require('../Imgs/samambaia.jpg')} 
                  alt="logo"
                  height='100px'
                  width='100px'
                  loading="lazy"
            />
            </Box>
            <Typography variant="h6" component="div"  mb={2} sx={{ textAlign: "center" }}>
              <Link href="#" underline="hover" onClick={ () => clickCard(item)}>
                {item.nome}
              </Link>
            </Typography>
         
          <Typography variant="body2" color="text.secondary" mb={2}  
          sx={{ textAlign: "center" }}>
            {item.descricao}
          </Typography>
          {showDeleteButton && (
            <Button variant="contained" color="secondary"  sx={{ backgroundColor: "red", color: "white" }} fullWidth onClick={ () => handleDeleteButton(item)}>
              Deletar
            </Button>
          )}
        </CardContent>
      </Card>
    ))}
  </Box>
  );
};

export default CardList;