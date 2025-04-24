import React from "react";
import { Box, Card, CardContent, Typography, IconButton, Link, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CardList = ({ 
  items, 
  custom, 
  showDeleteButton, 
  handleDeleteButton, 
  qrCode, 
  clickCard, 
  cardsPerRow = 4, 
  handleGenerateQRCode, 
  containerWidth = "100%"  // Adicionando a prop containerWidth com valor default '100%'
}) => {
  return (
    <Box mt={4} display="grid" gridTemplateColumns={`repeat(${cardsPerRow}, 1fr)`} gap={2} width={containerWidth}>
      {items.map((item, index) => (
        <Card 
        key={index} 
        sx={{ 
          padding: 2, 
          height: 380, // Altura fixa
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "space-between", 
          alignItems: "center", 
          textAlign: "center"
        }}
      >
        <CardContent 
          sx={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: 1, 
            height: "100%", 
            width: "100%",
            padding: 0
          }}
        >
          {custom ? custom(item) : (
        <>
          <Box 
            component="img"
            src={`data:image/png;base64,${item?.imagem}`}
            alt={item.nome}
            sx={{ 
              width: 120, 
              height: 120, 
              objectFit: "cover", 
              borderRadius: 2, 
              cursor: 'pointer' 
            }}
            onClick={() => clickCard(item)}
          />
      
          {/* Nome */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: "bold", 
              mt: 1,
              minHeight: 56, // Ajusta para caber 2 linhas sem cortar
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 1
            }}
          >
            <Link 
              href="#" 
              underline="hover" 
              onClick={() => clickCard(item)}
              sx={{ color: "inherit", textDecoration: "none" }}
            >
              {item.nome}
            </Link>
          </Typography>
      
          {/* Descrição */}
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              flexGrow: 1, 
              overflow: "auto", 
              px: 1,
              mb: 1
            }}
          >
            {item.descricao}
          </Typography>
      
          {/* Preço */}
          <Typography 
            variant="body1" 
            fontWeight="bold"
          >
            R$ {item.preco}
          </Typography>
      
          {/* Ações */}
          {qrCode && (
            <Button variant="contained" size="small" onClick={() => handleGenerateQRCode(item)}>
              Gerar QR Code
            </Button>
          )}
          {showDeleteButton && (
            <IconButton color="error" onClick={() => handleDeleteButton(item)}>
              <DeleteIcon sx={{ fontSize: 24 }} />
            </IconButton>
          )}
           </>
      )}
          
        </CardContent> 
      </Card>
      
      
      ))}
    </Box>
  );
};

export default CardList;