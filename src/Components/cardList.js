import React from "react";
import { Box, Card, CardContent, Typography, IconButton, Link, Button, Chip } from "@mui/material";
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
  containerWidth = "100%",
  showAtivarCampanha,
  handleAtivarCampanha
}) => {
  return (
    <Box mt={4} display="grid" gridTemplateColumns={`repeat(${cardsPerRow}, 1fr)`} gap={2} width={containerWidth}>
      {items.map((item) => (
        <Card 
          key={item.id} 
          sx={{ 
            padding: 2, 
            height: 380,
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

                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ 
                    fontWeight: "bold", 
                    mt: 1,
                    minHeight: 56,
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
                    onClick={(e) => { e.preventDefault(); clickCard(item); }}
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    {item.nome}
                  </Link>
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    //flexGrow: 1, 
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    px: 1,
                    mb: 1
                  }}
                >
                  {item.descricao}
                </Typography>

                {item.preco && (
                  <Typography variant="body1" fontWeight="bold">
                    R$ {item.preco}
                  </Typography>
                )}

              {showAtivarCampanha && (
                <Chip 
                  label={item.isAtivo ? "Ativa" : "Inativa"} 
                  color={item.isAtivo ? "success" : "default"} 
                  size="small"
                  sx={{ mt: 1 }}
                />
              )
              }
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

                {showAtivarCampanha && (
                  <Button variant="contained" size="small" onClick={() => handleAtivarCampanha(item)}>
                    {item.ativa ? "Desativar" : "Ativar"} Campanha
                  </Button>
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
