import React from "react";

import { Box, Card, CardContent, Typography, IconButton, Link } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CardList = ({ items, showDeleteButton, handleDeleteButton, clickCard }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center" mt={4} sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
  {items.map((item, index) => (
    <Card
      key={index}
      sx={{
    
        flex: "1 0 21%", // 4 cards por linha, considerando espaçamento
        maxWidth: 280,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        /*width: 300,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2, // Mantém espaçamento uniforme*/
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <Box display="flex" justifyContent="center">
          <img
            src={`data:image/png;base64,${item?.imagem}`}
            alt="logo"
            height="100px"
            width="100px"
            loading="lazy"
          />
        </Box>
        <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
          <Link href="#" underline="hover" onClick={() => clickCard(item)}>
            {item.nome}
          </Link>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", flexGrow: 1 }}>
          {item.descricao}
        </Typography>

        <Typography fontWeight="bold" variant="body1" color="text.secondary" sx={{ textAlign: "center", flexGrow: 1 }}>
          R$ {item.preco}
        </Typography>

        {showDeleteButton && (
          <IconButton color="error" onClick={() => handleDeleteButton(item)}>
            <DeleteIcon sx={{ fontSize: 32 }} />
          </IconButton>
        )}
      </CardContent>
    </Card>
  ))}
</Box>
  );
};

export default CardList;