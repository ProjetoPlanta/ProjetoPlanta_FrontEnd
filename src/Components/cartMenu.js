import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { removePlanta, limpaCarrinho } from '../Store/cartSlice';
import { useCart } from '../Hooks/useCart';
import PedidoService from '../Services/pedidosService';
import Modal from './modal';

export default function CartMenu() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.plantas);
  const plantasDetalhadas = useSelector(state => state.cart.plantasDetalhadas);
  const carrinho = useCart();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

    const data = {
      ...carrinho,
      status: "pendente",
      emailUsuario: email,
      telefoneUsuario: telefone,
    };

    try {
      const response = await PedidoService.cadastrarPedido(data);
      
      if (response.status !== 200) {
        throw new Error("Erro ao reservar pedido!");
      }

      setSnackbar({ open: true, message: "Pedido reservado com sucesso!", severity: "success" });
      dispatch(limpaCarrinho());
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    }
  };

  return (
    <>
      <IconButton color='inherit' onClick={handleCartClick} sx={{ marginLeft: 'auto' }}>
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
          <div>
            <MenuItem>
              <Typography variant='h6'>Total: R${getTotal()}</Typography>
            </MenuItem>
            <MenuItem>
              <Button variant="contained" color="primary" fullWidth onClick={handleReservarClick}>
                Reservar Pedido
              </Button>
            </MenuItem>
          </div>
        )}
      </Menu>
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
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
