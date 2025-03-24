import React from "react";
import { Card, CardContent, Typography, Stack, Button, TextField, Box, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import WbSunny from "@mui/icons-material/WbSunny";
import Yard from "@mui/icons-material/Yard";
import WaterDrop from "@mui/icons-material/WaterDrop";
import Grass from "@mui/icons-material/Grass";
import Forest from "@mui/icons-material/Forest";
import productImage from "../Imgs/samambaia.jpg";
import Header from '../Components/header';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import PlantaService from "../Services/plantasService";

export default function VerPlanta() {
    const { id } = useParams();
    const [planta, setPlanta] = useState([]);
    const [qrCodeUrl, setQrCodeUrl] = useState(""); // Novo estado para armazenar o QR code

    const handlePlanta = async () => {
        const response = await PlantaService.getPlanta(id);
        setPlanta(response);
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

    useEffect(() => {
        handlePlanta();
    }, []);

    return (
        <>
            <Header />
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={8} sx={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 16, paddingRight: 16 }}>
                {/* Primeira Parte */}
                <Box flex={1}>
                    <Box component="img" src={`data:image/png;base64,${planta?.imagem}`} width="100%" height="700px" mb={2} borderRadius={2} boxShadow={1} />
                    <Card>
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Box>
                                    <Typography variant="h4">Descrição do Produto</Typography>
                                    <Typography variant="h6" color="textSecondary">{planta?.descricao}</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" flexWrap="wrap" gap={2}>
                                <Box width={{ xs: "100%", sm: "48%" }} justifyContent="center">
                                    {[{ label: "Necessidade de Poda", value: planta?.necessidadePoda, icon: Forest }, { label: "Umidade do Solo", value: planta?.umidadeSolo, icon: Grass }, { label: "Necessidade de Água", value: planta?.necessidadeAgua, icon: WaterDrop }]
                                        .map((item, index) => (
                                            <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                                                <CardContent textAlign="center">
                                                    <Box key={index} textAlign="center">
                                                        <item.icon sx={{ verticalAlign: "middle" }} />
                                                        <Typography mb={2} mt={2} variant="h5" fontWeight="bold">
                                                            {item.value}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" display="block">
                                                            {item.label}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </Box>
                                <Box width={{ xs: "100%", sm: "48%" }} justifyContent="center">
                                    {[{ label: "Necessidade de Luz", value: planta?.necessidadeLuz, icon: WbSunny }, { label: "Epoca de Floração", value: planta?.epocaFloracao, icon: Yard }, { label: "Medicinal", value: planta?.medicinal ? "Sim" : "Não", icon: Grass }]
                                        .map((item, index) => (
                                            <Card variant="outlined" key={index} sx={{ mb: 2 }}>
                                                <CardContent textAlign="center">
                                                    <Box key={index} textAlign="center">
                                                        <item.icon sx={{ verticalAlign: "middle" }} />
                                                        <Typography mb={2} mt={2} variant="h5" fontWeight="bold">
                                                            {item.value}
                                                        </Typography>
                                                        <Typography variant="h6" color="textSecondary" display="block">
                                                            {item.label}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        ))}
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
                
                {/* Segunda Parte */}
                <Box flex={1}>
                    <Typography variant="h4" gutterBottom>{planta?.nomePopular}</Typography>
                    <Typography variant="h5" color="textSecondary" gutterBottom>R$ {planta.preco}</Typography>
                    <TextField label="Quantidade" type="number" fullWidth variant="outlined" sx={{ mb: 2 }} />
                    <Button variant="contained" sx={{ mb: 2 }} fullWidth>Reservar</Button>
                    <Stack direction="row" spacing={1} mb={2} justifyContent="space-between">
                        {[{ label: "Porte", value: planta?.porte }, { label: "Categoria", value: planta?.categoriaGeral }, { label: "Ambiente", value: planta?.ambiente }, { label: "Pet Friendly", value: planta.toxidade ? 'Não' : 'Sim' }]
                            .map((item, index) => (
                                <Box key={index} textAlign="left" justifyContent="space-between" width="23%">
                                    <Typography variant="h8" display="block">{item.label}</Typography>
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
                            <Typography variant="subtitle1" gutterBottom>Como Cuidar</Typography>
                        </Box>
                        <Typography ml={5} sx={{ textAlign: "justify" }} variant="h6">{planta?.cicloVida}</Typography>
                    </Box>

                    {/* Botão para gerar e mostrar o QR Code */}
                    <Box mt={2} textAlign="center">
                        <Button variant="contained" onClick={handleGenerateQRCode}>Gerar QR Code</Button>
                        {qrCodeUrl && (
                            <Box mt={2}>
                                <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: "200px" }} />
                                <Button variant="outlined" onClick={handleDownloadQRCode} sx={{ mt: 2 }}>Baixar QR Code</Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
}
