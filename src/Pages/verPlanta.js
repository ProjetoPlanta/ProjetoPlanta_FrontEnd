import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  TextField,
  Box,
  IconButton,
  Snackbar
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WbSunny from "@mui/icons-material/WbSunny";
import Yard from "@mui/icons-material/Yard";
import WaterDrop from "@mui/icons-material/WaterDrop";
import Grass from "@mui/icons-material/Grass";
import Forest from "@mui/icons-material/Forest";
import PlantaService from "../Services/plantasService";
import Header from "../Components/header";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlanta } from "../Store/cartSlice";

export default function VerPlanta() {
  const { id } = useParams();
  const [planta, setPlanta] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const dispatch = useDispatch();

  const handlePlanta = async () => {
    const response = await PlantaService.getPlanta(id);
    setPlanta(response);
  };

  useEffect(() => {
    handlePlanta();
  }, []);

  const handleReservar = () => {
    if (quantidade <= planta?.estoque && quantidade > 0) {
      dispatch(addPlanta({ ...planta, quantidade, id }));
      setOpenSnackbar(true);
    } else {
      alert("Quantidade excede o estoque disponível");
    }
  };

  const handleGenerateQRCode = async () => {
    try {
      const qrCodeUrl = await PlantaService.getQRCode(id);
      if (qrCodeUrl.error) {
        throw new Error(qrCodeUrl.message);
      }
      setQrCodeUrl(qrCodeUrl);
    } catch (error) {
      console.error("Erro ao gerar o QR Code:", error);
    }
  };

  const handleDownloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `${planta.nomePopular}-qrcode.png`;
    link.click();
  };

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={8}
        sx={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 16, paddingRight: 16 }}
      >
        {/* Lado esquerdo - infos e ações */}
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>
            {planta?.nomePopular}
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            R$ {planta.preco}
          </Typography>
          <TextField
            label="Quantidade"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            slotProps={{ htmlInput: { maxLength: planta?.estoque } }}
          />
          <Button variant="contained" sx={{ mb: 2 }} fullWidth onClick={handleReservar}>
            Reservar
          </Button>
          <Stack direction="row" spacing={1} mb={2} justifyContent="space-between">
            {[
              { label: "Porte", value: planta?.porte },
              { label: "Estoque", value: planta?.estoque },
              { label: "Ambiente", value: planta?.ambiente },
              { label: "Pet Friendly", value: planta.petFriendly ? "Não" : "Sim" },
            ].map((item, index) => (
              <Box key={index} textAlign="left" width="23%">
                <Typography variant="h8" display="block">
                  {item.label}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Box border={1} borderRadius={2} p={2} mt={5}>
            <Box display="flex" alignItems="center">
              <IconButton>
                <InfoIcon />
              </IconButton>
              <Typography variant="subtitle1" gutterBottom>
                Como Cuidar
              </Typography>
            </Box>
            <Typography ml={5} sx={{ textAlign: "justify" }} variant="h6">
              {planta?.comoCuidar}
            </Typography>
          </Box>
        </Box>

        {/* Lado direito - imagem e descrição */}
        <Box flex={1}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Box
              component="img"
              src={`data:image/png;base64,${planta?.imagem}`}
              width="50%"
              height="auto"
              borderRadius={2}
              boxShadow={1}
            />
          </Box>

          <Card sx={{ minHeight: 180 }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Box>
                  <Typography variant="h4">Descrição do Produto</Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {planta?.descricao}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={2}>
                <Box width={{ xs: "100%", sm: "48%" }}>
                  {[
                    { label: "Necessidade de Poda", value: planta?.frequenciaPoda, icon: Forest },
                    { label: "Umidade do Solo", value: planta?.umidadeSolo, icon: Grass },
                    { label: "Necessidade de Água", value: planta?.necessidadeAgua, icon: WaterDrop },
                  ].map((item, index) => (
                    <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <item.icon sx={{ verticalAlign: "middle" }} />
                        <Typography mb={2} mt={2} variant="h5" fontWeight="bold">
                          {item.value}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          {item.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>

                <Box width={{ xs: "100%", sm: "48%" }}>
                  {[
                    { label: "Necessidade de Luz", value: planta?.necessidadeLuz, icon: WbSunny },
                    { label: "Epoca de Floração", value: planta?.epocaFloracao, icon: Yard },
                    { label: "Medicinal", value: planta?.medicinal ? "Sim" : "Não", icon: Grass },
                  ].map((item, index) => (
                    <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <item.icon sx={{ verticalAlign: "middle" }} />
                        <Typography mb={2} mt={2} variant="h5" fontWeight="bold">
                          {item.value}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          {item.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Planta adicionada com sucesso ao carrinho!"
      />
    </>
  );
}
