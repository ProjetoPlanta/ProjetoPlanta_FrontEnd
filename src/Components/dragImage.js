import { Box, Button, Typography, CircularProgress } from "@mui/material";
import  { useState, useEffect  } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DragDropUpload = ({handleUpload, previewImage}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
   const [imagemPreview, setImagemPreview] = useState(null)
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file)
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file)
  }

    const handleFileUpload = (file) => {
      if (file && file.type.startsWith("image/")) {
        setImage(file);
        handleFileBase(file)
      }
    };


    const handleFileBase = (image) =>{
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        handleUpload(reader.result.replace(/^data:image\/[a-z]+;base64,/, ''))
        setImagemPreview(reader.result);
    };
    }

    useEffect( () => { 
                if(previewImage){
                  setImagemPreview(`data:image/png;base64,${previewImage}`)
                  handleUpload(previewImage)
                }
              }, [previewImage]);

  return (
    <Box
    sx={{
      border: "2px dashed #4CAF50",
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: "#f9f9f9",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
  
    <label htmlFor="fileInput" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CloudUploadIcon color="primary" sx={{ fontSize: 50 }} />
  
      <Typography variant="h6">Arraste e solte uma imagem aqui</Typography>
      <Typography variant="body2">Ou clique para selecionar</Typography>
  
      <Button variant="contained" component="span" sx={{ mt: 2 }}>
        Escolher Arquivo
      </Button>
  
      {imagemPreview && (
        <img
          src={imagemPreview}
          alt="Preview"
          height="100px"
          width="100px"
          loading="lazy"
          style={{ marginTop: "16px" }} // Adiciona espaçamento entre os elementos
        />
      )}
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
