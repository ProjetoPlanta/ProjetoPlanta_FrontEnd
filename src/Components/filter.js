import * as React from 'react';
import { useState, useEffect } from "react";
import { List, ListItem, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Typography, Divider, Button, Slider, Box, Paper } from '@mui/material';

export default function Filter({ plantasList, setFilteredPlantas, marginTop, marginLeft }) {
  const [filters, setFilters] = useState({});
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    if (plantasList.length) {
      const maxVal = Math.max(...plantasList.map(el => el.preco || 0));
      setMaxPrice(maxVal);
    }
  }, [plantasList]);

  useEffect(() => {
    let filtered = plantasList;
    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'preco') {
        filtered = filtered.filter(planta => planta[key] === value);
      }
    });
    if (filters.preco !== undefined) {
      filtered = filtered.filter(planta => planta.preco <= filters.preco);
    }
    setFilteredPlantas(filtered);
  }, [filters, plantasList, setFilteredPlantas]);

  const handleFilterChange = (id, value) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const formCadastroPlanta = [
    { id: 'ambiente', name: 'Ambiente', options: ['Interno 🏠', 'Extern 🌱'] },
    { id: 'epocaFloracao', name: 'Época de Floração', options: ['Inverno ❄️', 'Verão ☀️', 'Outono 🍂', 'Primavera 🌷'] },
    { id: 'frequenciaPoda', name: 'Frequência de Poda', options: ['Baixa ✂️', 'Média ✂️✂️', 'Alta ✂️✂️✂️'] },
    { id: 'necessidadeAgua', name: 'Necessidade de Água', options: ['Baixa 💧', 'Média 💦', 'Alta 🌊'] },
    { id: 'porte', name: 'Porte', options: ['Pequeno 🌱', 'Médio 🌿', 'Grande 🌳'] },
    { id: 'necessidadeLuz', name: 'Necessidade de Luz', options: ['Baixa 🔅', 'Media 🔆', 'Alta ☀️'] },
    { id: 'umidadeSolo', name: 'Umidade do Solo', options: ['Baixa 💧', 'Média 💦', 'Alta 🌊'] },
    { id: 'petFriendly', name: 'Pet Friendly 🐶🐱', type: 'checkbox' },
    { id: 'atraiAbelha', name: 'Atrai Abelha 🐝', type: 'checkbox' }
  ];

  return (
      <Box
            sx={{
              width: { xs: '100%', md: '250px' }, // Responsivo
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              p: 2,
              flexShrink: 0,
            }}
        >      
          <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, marginLeft: 3, marginTop: 5 }}>
            Filtros
          </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {formCadastroPlanta?.map(field => (
          <ListItem key={field.id} disablePadding sx={{ mb: 2 }}>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={<Checkbox onChange={e => handleFilterChange(field.id, e.target.checked)} />}
                label={field.name}
              />
            ) : (
              <FormControl fullWidth>
                <InputLabel id={`label-${field.id}`}>{field.name}</InputLabel>
                <Select
                  labelId={`label-${field.id}`}
                  id={field.id}
                  value={filters[field.id] || ''}
                  label={field.name}
                  onChange={e => handleFilterChange(field.id, e.target.value)}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {field?.options?.map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </ListItem>
        ))}
        <ListItem sx={{ flexDirection: 'column', alignItems: 'stretch', mb: 2 }}>
          <Typography gutterBottom>Preço Máximo</Typography>
          <Slider
            value={filters.preco || maxPrice}
            min={0}
            max={maxPrice}
            step={1}
            onChange={(e, newValue) => handleFilterChange('preco', newValue)}
            valueLabelDisplay="auto"
          />
        </ListItem>
        <ListItem sx={{ justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" onClick={clearFilters} fullWidth>
            Limpar Filtros
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
