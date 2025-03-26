import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  AppBar,
  Box,
  Toolbar,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import PedidoService from "../Services/pedidosService";
import Header from "../Components/header";

const PedidosSearch = () => {
  const [pedidos, setPedidos] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchType, setSearchType] = useState("email");
  const [searchValue, setSearchValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleSearch = async () => {
    let newErrors = {};
    if (searchType === "email" && !searchValue.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.searchValue = "E-mail inválido!";
    }
    if (searchType === "telefone" && !searchValue.match(/^\d{10,11}$/)) {
      newErrors.searchValue = "Telefone deve conter 10 ou 11 números!";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const response = await PedidoService.getByParameter(searchType, searchValue);
      setPedidos(response);
    } catch (error) {
      setPedidos([]);
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex", width: "100%" }}>
        <AppBar position="fixed">
          <Header open={open} />
        </AppBar>
        <Toolbar />
      </Box>
      <Box sx={{ margin: 5 }}>
        <Typography variant="h5" sx={{ fontFamily: "Qeilab", marginBottom: 2 }}>Buscar Pedidos</Typography>
        <RadioGroup row value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <FormControlLabel value="email" control={<Radio />} label="E-mail" />
          <FormControlLabel value="telefone" control={<Radio />} label="Telefone" />
        </RadioGroup>
        <TextField
          label={searchType === "email" ? "E-mail" : "Telefone"}
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          error={!!errors.searchValue}
          helperText={errors.searchValue}
          sx={{ marginTop: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth onClick={handleSearch} disabled={!searchValue} sx={{ marginTop: 2 }}>
          Pesquisar
        </Button>
      </Box>
      {pedidos.length > 0 && (
        <Box sx={{ margin: 5 }}>
          <Typography variant="h5" sx={{ fontFamily: "Qeilab", marginBottom: 2 }}>Pedidos</Typography>
          {pedidos.map((pedido, indexPedido) => {
            const totalPedido = pedido.plantas.reduce(
              (acc, planta, index) => acc + planta.quantidade * pedido.plantasDetalhadas[index].preco,
              0
            );

            return (
              <Card key={indexPedido} sx={{ marginBottom: 2, marginTop: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Email: <span style={{ fontWeight: "normal" }}>{pedido.emailUsuario}</span></Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Telefone: <span style={{ fontWeight: "normal" }}>{pedido.telefoneUsuario}</span></Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Status: <span style={{ fontWeight: "normal" }}>{pedido.status}</span></Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>Plantas:</Typography>
                  <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                    {pedido.plantas.map((planta, index) => {
                      const detalhes = pedido.plantasDetalhadas[index];
                      const valorTotal = detalhes.preco * planta.quantidade;
                      return (
                        <li key={index}>
                          <Typography variant="body1" sx={{ fontWeight: "bold" }}>{detalhes.nomePopular}</Typography>
                          <Typography variant="body1" sx={{ fontStyle: "italic", color: "gray" }}>
                            Quantidade: {planta.quantidade} - Em Estoque: {detalhes.estoque}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: "bold", color: "green" }}>
                            Valor: R${valorTotal.toFixed(2)}
                          </Typography>
                        </li>
                      );
                    })}
                  </ul>
                  <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>
                    Total do Pedido: R${totalPedido.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </div>
  );
};

export default PedidosSearch;