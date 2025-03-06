import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PedidoService from "../Services/pedidosService";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const atualizarStatus = async (id, novoStatus) => {
    console.log("dqwdqwdqw",id,novoStatus)
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: novoStatus } : pedido
      )
    );
    await PedidoService.updatePedido(id, novoStatus);
    setOpenSnackbar(true);
  };

  const handlePlanta = async () => {
    const response = await PedidoService.getAllPedidos();
    setPedidos(response);
  };

  useEffect(() => {
    handlePlanta();
  }, []);

  return (
    <div>
      <Typography variant='h5' sx={{fontFamily: "Qeilab",  marginBottom: 2 }}>Pedidos</Typography>
      {pedidos.filter((p) => p.status === "pendente").map((pedido, indexPedido) => {
        const totalPedido = pedido.plantas.reduce(
          (acc, planta, index) => acc + planta.quantidade * pedido.plantasDetalhadas[index].preco,
          0
        );
        
        return (
          <Card className="mb-5" key={indexPedido} style={{ marginBottom: 10, marginTop: 10 }}>
            <CardContent>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Email: <span style={{ fontWeight: 'normal' }}>{pedido.emailUsuario}</span></Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Telefone: <span style={{ fontWeight: 'normal' }}>{pedido.telefoneUsuario}</span></Typography>
    <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Status: <span style={{ fontWeight: 'normal' }}>{pedido.status}</span></Typography>
    
    <Typography variant="h6" sx={{ fontWeight: 'bold'}}>Plantas:</Typography>
    <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
      {pedido.plantas.map((planta, index) => {
        const detalhes = pedido.plantasDetalhadas[index];
        const valorTotal = detalhes.preco * planta.quantidade;
        return (
          <li key={index}>
            <Typography variant="body1" sx={{ fontWeight: 'bold'}}>
              {detalhes.nomePopular}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'gray' }}>
              Quantidade: {planta.quantidade}
            </Typography>            
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'green' }}>
              Valor: R${valorTotal.toFixed(2)}
            </Typography>
          </li>
        );
      })}
    </ul>
    
    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
      Total do Pedido: R${totalPedido.toFixed(2)}
    </Typography>

    <Box mt={2} display="flex" gap={2}>
      <Button
        variant="contained"
        color="success"
        onClick={() => atualizarStatus(pedido.id, "aprovado")}
        sx={{ flex: 1 }}
      >
        Aprovar
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => atualizarStatus(pedido.id, "nao efetuado")}
        sx={{ flex: 1 }}
      >
        Deletar
      </Button>
    </Box>
  </CardContent>
          </Card>
        );
      })}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Histórico</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {pedidos.filter((p) => p.status !== "pendente").map((pedido, indexPedido) => {
            const totalPedido = pedido.plantas.reduce(
              (acc, planta, index) => acc + planta.quantidade * pedido.plantasDetalhadas[index].preco,
              0
            );
            
            return (
              <Card
                key={indexPedido}
                style={{
                  marginBottom: 10,
                  backgroundColor: pedido.status === "aprovado" ? "#d4edda" : "#f8d7da",
                }}
              >
                <CardContent>
                  <Typography>Email: {pedido.emailUsuario}</Typography>
                  <Typography>Telefone: {pedido.telefoneUsuario}</Typography>
                  <Typography>Status: {pedido.status}</Typography>
                  <Typography>Plantas:</Typography>
                  {pedido.plantas.map((planta, index) => {
                    const detalhes = pedido.plantasDetalhadas[index];
                    const valorTotal = detalhes.preco * planta.quantidade;
                    return (
                      <div key={index} style={{ marginBottom: '12px' }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {detalhes.nomePopular}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'normal', marginLeft: 1 }}>
                        Quantidade: {planta.quantidade}
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'normal', marginLeft: 1 }}>
                        Valor: R${valorTotal.toFixed(2)}
                      </Typography>
                    </div>
                    );
                  })}
                  <Typography variant="h6">Total do Pedido: R${totalPedido.toFixed(2)}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="O status do pedido foi atualizado com sucesso!"
      />
    </div>
  );
};

export default Pedidos;