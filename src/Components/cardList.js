import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";

const CardList = ({ items, showDeleteButton, handleDeleteButton }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={4}>
    {items.map((item, index) => (
      <Card key={index} sx={{ width: 300, padding: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {item.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
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