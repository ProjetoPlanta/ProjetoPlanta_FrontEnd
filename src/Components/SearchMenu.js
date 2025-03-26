import * as React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PedidoService from '../Services/pedidosService';
import Box from '@mui/material/Box';

export default function SearchMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchType, setSearchType] = useState('email');
  const [searchValue, setSearchValue] = useState('');
  const [errors, setErrors] = useState({});
  const [pedidos, setPedidos] = useState([]);

  const handleSearchClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPedidos([]);
  };

  const handleSearch = async () => {
    let newErrors = {};
    if (searchType === 'email' && !searchValue.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      newErrors.searchValue = "E-mail inválido!";
    }
    if (searchType === 'telefone' && !searchValue.match(/^\d{10,11}$/)) {
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
    <>
      <IconButton color='inherit' onClick={handleSearchClick}>
        <SearchIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem disabled>
          <Typography variant='h6'>Pesquise seus pedidos</Typography>
        </MenuItem>
        <MenuItem className='mb-5'>
          <RadioGroup row value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <FormControlLabel value='email' control={<Radio />} label='E-mail' />
            <FormControlLabel value='telefone' control={<Radio />} label='Telefone' />
          </RadioGroup>
        </MenuItem>
        <MenuItem>
          <TextField
            label={searchType === 'email' ? 'E-mail' : 'Telefone'}
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            error={!!errors.searchValue}
            helperText={errors.searchValue}
          />
        </MenuItem>
        <MenuItem>
          <Button variant='contained' color='primary' fullWidth onClick={handleSearch} disabled={!searchValue}>
            Pesquisar
          </Button>
        </MenuItem>
        {pedidos.length > 0 && (
          <Box>
            <MenuItem disabled>
              <Typography variant='h6'>Pedidos</Typography>
            </MenuItem>
            {pedidos.map((pedido) => (
              <Box key={pedido.id}>
                <MenuItem>
                  <Typography variant='body1'>Pedido  - {pedido.status}</Typography>
                </MenuItem>
                {pedido.plantas.map((planta,index) =>{
                
                const plantaDetalhe = pedido?.plantasDetalhadas[index];
                return plantaDetalhe ?  (
                  <MenuItem key={planta.plantaId}>
                  <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                    <Typography variant='body1'>
                      {plantaDetalhe.nomePopular} ({planta.quantidade}x) - R${(plantaDetalhe.preco * planta.quantidade).toFixed(2)}
                    </Typography>
                  </Box>
                </MenuItem>
                
                ): null})}
              </Box>
            ))}
          </Box>
        )}
      </Menu>
    </>
  );
}
