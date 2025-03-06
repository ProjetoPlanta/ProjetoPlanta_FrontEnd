import React, { useState, useEffect } from "react";
import { Box, TextField, IconButton, Typography, Snackbar, Alert, Accordion, AccordionSummary, AccordionDetails, Card, CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardList from "../Components/cardList";
import MovimentacoesService from "../Services/movimentacaoService";
import PlantaService from "../Services/plantasService";

const Movimentacoes = () => {
  const [plantas, setPlantas] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [inputs, setInputs] = useState({});
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchPlantas = async () => {
      const response = await PlantaService.getAllPlantas();
      if (response.length) {
        const formattedPlantas = response.map(el => ({ ...el, nome: el.nomePopular }));
        setPlantas(formattedPlantas);
        setQuantities(
          formattedPlantas.reduce((acc, plant) => ({ ...acc, [plant.id]: plant.estoque }), {})
        );
        setInputs(
          formattedPlantas.reduce((acc, plant) => ({ ...acc, [plant.id]: { add: "", remove: "" } }), {})
        );
      }
    };

    const fetchMovimentacoes = async () => {
      const response = await MovimentacoesService.getAllMovimentacoes();
      // Ordenar as movimentações pela data (da mais recente para a mais antiga)
      const sortedMovimentacoes = response.sort((a, b) => new Date(b.data) - new Date(a.data));
      setMovimentacoes(sortedMovimentacoes);
    };

    fetchPlantas();
    fetchMovimentacoes();
  }, []);

  const handleTransaction = async (id, type) => {
    if (!inputs[id][type]) {
      setSnackbarMessage("Por favor, insira um valor válido.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const quantityChange = parseInt(inputs[id][type], 10);
    const transactionType = type === "add" ? "reabastecimento" : "venda presencial";
    let newQuantity = type === "add" ? quantities[id] + quantityChange : quantities[id] - quantityChange;

    // Validação para não permitir remover mais do que o estoque disponível
    if (type === "remove" && quantityChange > quantities[id]) {
      setSnackbarMessage("Estoque insuficiente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const payload = {
      plantaId: id,
      data: new Date().toISOString(),
      quantidade: quantityChange,
      tipoTransacao: transactionType
    };

    await MovimentacoesService.cadastrarMovimentacoes(payload);
    
    // Adicionar a nova movimentação no topo do histórico
    setMovimentacoes([payload, ...movimentacoes]);
    setQuantities({ ...quantities, [id]: newQuantity });
    setInputs({ ...inputs, [id]: { ...inputs[id], [type]: "" } });
    setSnackbarMessage("Transação registrada com sucesso!");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleChange = (event, id, type) => {
    setInputs({ ...inputs, [id]: { ...inputs[id], [type]: event.target.value } });
  };

  return (
    <>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      {/* Seção de CardList com as plantas */}
      <CardList
        items={plantas}
        custom={(plant) => (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%" textAlign="center">
            <Box display="flex" justifyContent="center">
              <img
                src={`data:image/png;base64,${plant?.imagem}`}
                alt={plant.nome}
                height="100px"
                width="100px"
                loading="lazy"
              />
            </Box>
            <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
              {plant.nome}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Estoque: {quantities[plant.id]}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center" gap={2} width="100%">
              <TextField
                type="number"
                value={inputs[plant.id]?.add || ""}
                onChange={(e) => handleChange(e, plant.id, "add")}
                size="small"
                placeholder="Adicionar"
                sx={{ width: 120, textAlign: "center", fontSize: '1.2rem' }}
              />
              <IconButton
                color="success"
                onClick={() => handleTransaction(plant.id, "add")}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" gap={2} width="100%" mt={1}>
              <TextField
                type="number"
                value={inputs[plant.id]?.remove || ""}
                onChange={(e) => handleChange(e, plant.id, "remove")}
                size="small"
                placeholder="Remover"
                sx={{ width: 120, textAlign: "center", fontSize: '1.2rem' }}
              />
              <IconButton
                color="error"
                onClick={() => handleTransaction(plant.id, "remove")}
              >
                <RemoveIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      />

      {/* Histórico de Movimentações */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Histórico de Movimentações</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {movimentacoes.map((movimentacao, index) => {
            const tipoTransacaoColor = movimentacao.tipoTransacao === "reabastecimento" ? "#d4edda" : "#f8d7da";

            return (
              <Card
                key={index}
                style={{
                  marginBottom: 10,
                  backgroundColor: tipoTransacaoColor,
                }}
              >
                <CardContent>
                  <Typography>ID Planta: {movimentacao.plantaId}</Typography>
                  <Typography>Data: {new Date(movimentacao.data).toLocaleString()}</Typography>
                  <Typography>Quantidade: {movimentacao.quantidade}</Typography>
                  <Typography>Tipo de Transação: {movimentacao.tipoTransacao}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Movimentacoes;
