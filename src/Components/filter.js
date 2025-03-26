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
    { id: 'ambiente', name: 'Ambiente', options: ['interno', 'externo'] },
    { id: 'epocaFloracao', name: 'Época de Floração', options: ['inverno', 'verão', 'outono', 'primavera'] },
    { id: 'frequenciaPoda', name: 'Frequência de Poda', options: ['baixa', 'media', 'alta'] },
    { id: 'necessidadeAgua', name: 'Necessidade de Água', options: ['baixa', 'media', 'alta'] },
    { id: 'porte', name: 'Porte', options: ['pequeno', 'media', 'grande'] },
    { id: 'necessidadeLuz', name: 'Necessidade de Luz', options: ['baixa', 'media', 'alta'] },
    { id: 'umidadeSolo', name: 'Umidade do Solo', options: ['baixa', 'media', 'alta'] },
    { id: 'petFriendly', name: 'Pet Friendly', type: 'checkbox' },
    { id: 'atraiAbelha', name: 'Atrai Abelha', type: 'checkbox' }
  ];

  return (
    <Box sx={{ width: 650, marginTop: marginTop, backgroundColor: 'white', borderRadius: 2, boxShadow: 3, marginLeft: marginLeft }}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, marginLeft: 3, marginTop: 5 }}>
        Filtros
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <List>
        {formCadastroPlanta?.map(field => (
          <ListItem key={field.id}>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={<Checkbox onChange={e => handleFilterChange(field.id, e.target.checked)} />}
                label={field.name}
              />
            ) : (
              <FormControl fullWidth>
                <InputLabel>{field.name}</InputLabel>
                <Select
                  value={filters[field.id] || ''}
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
        <ListItem>
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
        <ListItem>
          <Button variant="contained" color="secondary" onClick={clearFilters} fullWidth>
            Limpar Filtros
          </Button>
        </ListItem>
      </List>
    </Box>
  );
}
