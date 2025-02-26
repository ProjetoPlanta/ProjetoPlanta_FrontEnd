import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DragDropUpload = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      uploadImage(file);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    
    try {
      const response = await fetch("https://api.example.com/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
      
      }
      alert("Imagem enviada com sucesso!");
    } catch (error) {
      alert("Erro ao enviar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        border: "2px dashed #1976d2",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: "#f9f9f9",
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <CloudUploadIcon color="primary" sx={{ fontSize: 50 }} />
        <Typography variant="h6">Arraste e solte uma imagem aqui</Typography>
        <Typography variant="body2">Ou clique para selecionar</Typography>
        <Button variant="contained" component="span" sx={{ mt: 2 }}>
          Escolher Arquivo
        </Button>
      </label>
      {image && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          {image.name}
        </Typography>
      )}
      {loading && <CircularProgress sx={{ mt: 2 }} />}
    </Box>
  );
};

export default DragDropUpload;
