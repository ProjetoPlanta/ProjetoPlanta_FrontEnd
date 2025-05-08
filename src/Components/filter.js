import * as React from 'react';
import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Button,
  Slider,
  Box,
} from '@mui/material';
 import CampanhaService from '../Services/campanhaService';

export default function Filter({ plantasList, setFilteredPlantas }) {
  const [filters, setFilters] = useState({});
  const [maxPrice, setMaxPrice] = useState(0);
  const [campanhas, setCampanhas] = useState([]);
  const [campanhasSelecionadas, setCampanhasSelecionadas] = useState([]);

  useEffect(() => {
    if (plantasList.length) {
      const maxVal = Math.max(...plantasList.map(el => el.preco || 0));
      setMaxPrice(maxVal);
    }
  }, [plantasList]);

  useEffect(() => {
    const buscarCampanhasAtivas = async () => {
      const response = await CampanhaService.getAllcampanhas();
      if (!response.error) {
        const campanhasAtivas = response.filter(c => c.isAtivo);
        setCampanhas(campanhasAtivas);
      } else {
        console.error(response.message);
      }
    };

    buscarCampanhasAtivas();
  }, []);

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

    if (campanhasSelecionadas.length > 0) {
      filtered = filtered.filter(planta =>
        Array.isArray(planta.tags) &&
        campanhasSelecionadas.every(id => planta.tags.includes(id))
      );
    }

    setFilteredPlantas(filtered);
  }, [filters, plantasList, setFilteredPlantas, campanhasSelecionadas]);

  const handleFilterChange = (id, value) => {
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  const handleCampanhaToggle = (id) => {
    setCampanhasSelecionadas(prev =>
      prev.includes(id)
        ? prev.filter(campanhaId => campanhaId !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setFilters({});
    setCampanhasSelecionadas([]);
  };

  const formCadastroPlanta = [
    { id: 'ambiente', name: 'Ambiente', options: [{ label: 'Interno 🏠', value: 'Interno' }, { label: 'Externo 🌱', value: 'Externo' }] },
    { id: 'epocaFloracao', name: 'Época de Floração', options: [
      { label: 'Inverno ❄️', value: 'Inverno' },
      { label: 'Verão ☀️', value: 'Verão' },
      { label: 'Outono 🍂', value: 'Outono' },
      { label: 'Primavera 🌷', value: 'Primavera' }] },
    { id: 'frequenciaPoda', name: 'Frequência de Poda', options: [
      { label: 'Baixa ✂️', value: 'Baixa' },
      { label: 'Média ✂️✂️', value: 'Média' },
      { label: 'Alta ✂️✂️✂️', value: 'Alta' }] },
    { id: 'necessidadeAgua', name: 'Necessidade de Água', options: [
      { label: 'Baixa 💧', value: 'Baixa' },
      { label: 'Média 💦', value: 'Média' },
      { label: 'Alta 🌊', value: 'Alta' }] },
    { id: 'porte', name: 'Porte', options: [
      { label: 'Pequeno 🌱', value: 'Pequeno' },
      { label: 'Médio 🌿', value: 'Médio' },
      { label: 'Grande 🌳', value: 'Grande' }] },
    { id: 'necessidadeLuz', name: 'Necessidade de Luz', options: [
      { label: 'Baixa 🔅', value: 'Baixa' },
      { label: 'Media 🔆', value: 'Media' },
      { label: 'Alta ☀️', value: 'Alta' }] },
    { id: 'umidadeSolo', name: 'Umidade do Solo', options: [
      { label: 'Baixa 💧', value: 'Baixa' },
      { label: 'Média 💦', value: 'Média' },
      { label: 'Alta 🌊', value: 'Alta' }] },
    { id: 'petFriendly', name: 'Pet Friendly 🐶🐱', type: 'checkbox' },
    { id: 'atraiAbelha', name: 'Atrai Abelha 🐝', type: 'checkbox' }
  ];

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '250px' },
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        p: 2,
        flexShrink: 0,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
        Filtros
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <List>
        {formCadastroPlanta.map(field => (
          <ListItem key={field.id} disablePadding sx={{ mb: 2 }}>
            {field.type === 'checkbox' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!filters[field.id]}
                    onChange={e => handleFilterChange(field.id, e.target.checked)}
                  />
                }
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
                  {field.options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </ListItem>
        ))}

        {/* Campanhas */}
        {campanhas.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Campanhas 
            </Typography>
            {campanhas.map(campanha => (
              <ListItem key={campanha.id} disablePadding>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={campanhasSelecionadas.includes(campanha.id)}
                      onChange={() => handleCampanhaToggle(campanha.id)}
                    />
                  }
                  label={campanha.nome || `Campanha #${campanha.id}`}
                />
              </ListItem>
            ))}
          </>
        )}

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
