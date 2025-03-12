import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removePlanta } from '../Store/cartSlice';
import Modal from './modal';
import { Button, Menu, MenuItem, Typography, Box, IconButton, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartMenu() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.plantas);
  const plantasDetalhadas = useSelector(state => state.cart.plantasDetalhadas);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [errors, setErrors] = useState({});

  const handleCartClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleRemoveItem = (plantaId) => {
    dispatch(removePlanta({ id: plantaId }));
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const plantaDetalhe = plantasDetalhadas.find(p => p.id === item.plantaId);
      return total + (plantaDetalhe ? plantaDetalhe.preco * item.quantidade : 0);
    }, 0).toFixed(2);
  };

  const handleReservarClick = () => {
    setOpenModal(true);
  };

  const handleReservarPedido = async () => {
    let newErrors = {};
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.email = "E-mail inválido!";
    }
    if (!telefone.match(/^\d{10,11}$/)) {
      newErrors.telefone = "Telefone deve conter 10 ou 11 números!";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setOpenModal(false);
    setEmail('');
    setTelefone('');
    setErrors({});

    try {
      const response = await fetch('https://api.exemplo.com/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, telefone, pedido: cart }),
      });

      if (!response.ok) {
        throw new Error("Erro ao reservar pedido!");
      }

      alert("Pedido reservado com sucesso!");
      dispatch({ type: 'cart/clearCart' });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <IconButton color='inherit' onClick={handleCartClick}>
        <ShoppingCartIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {cart.length === 0 ? (
          <MenuItem onClick={handleClose}>Carrinho vazio</MenuItem>
        ) : (
          cart.map((item) => {
            const plantaDetalhe = plantasDetalhadas.find(p => p.id === item.plantaId);
            return plantaDetalhe ? (
              <MenuItem key={item.plantaId}>
                <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                  <Typography variant='body1'>
                    {plantaDetalhe.nomePopular} ({item.quantidade}x) - R${(plantaDetalhe.preco * item.quantidade).toFixed(2)}
                  </Typography>
                  <IconButton color='error' onClick={() => handleRemoveItem(item.plantaId)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </MenuItem>
            ) : null;
          })
        )}
        {cart.length > 0 && (
          <>
            <MenuItem>
              <Typography variant='h6'>Total: R${getTotal()}</Typography>
            </MenuItem>
            <MenuItem>
              <Button variant="contained" color="primary" fullWidth onClick={handleReservarClick}>
                Reservar Pedido
              </Button>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Modal de Reserva */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Reservar Pedido" textButton="Reservar" onConfirm={handleReservarPedido}>
        <TextField
          label="E-mail"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Telefone"
          fullWidth
          margin="dense"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          error={!!errors.telefone}
          helperText={errors.telefone}
        />
      </Modal>
    </>
  );
}
