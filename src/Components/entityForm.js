import React, { useState, useEffect  } from "react";
import { TextField, Checkbox, FormControlLabel, Button, Container, Box, MenuItem } from "@mui/material";
import entityForms from '../Utils/formsConfiguration'
const EntityForm = ({detailsFields, handleSubmitForm, entityValue, isBackButton, handleBackButton}) => {
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
      const formNewData  = formData.map(el =>({ formFields: el.formFields.map(formField =>  
        formField.id == name ? type === "checkbox" ?
         {...formField, value : checked} : {...formField, value :value } 
         : formField
      )}))
      setFormData(formNewData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      let submitedData = {}
        formData.forEach(el => {
          el.formFields.forEach(formField =>{
            submitedData[formField.id] = formField.value
          })
            
        });

        if(entityValue){
          submitedData = {...submitedData, id:entityValue.id }
        }

        handleSubmitForm(submitedData)
  };

  useEffect(() => {
    Object.keys(entityForms).forEach(key =>{
        if (key === detailsFields){
          let forms = entityForms[key]

            if(entityValue){
              forms = forms.map(el =>({ formFields : el.formFields.map( formField => ({...formField, value: entityValue[formField.id]}))}))
            }
            setFormData(forms)
        } 
    })

  }, []);

  return (
    <form onSubmit={handleSubmit}>
    <Box display="flex" flexDirection="column" gap={2}>
      {formData.map((formCol, colIndex) => (
        <Box key={colIndex} display="flex" gap={2} width="100%">
          {formCol.formFields?.map((formField) => (
            <Box key={formField.id} flex={1} minWidth={0}>
              {formField.type === "checkbox" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={formField.id}
                      checked={formField.value}
                      onChange={handleChange}
                    />
                  }
                  label={formField.name}
                />
              ) : formField.type === "select" ? (
                <TextField
                  select
                  label={formField.name}
                  name={formField.id}
                  value={formField.value}
                  onChange={handleChange}
                  required={formField.required}
                  fullWidth
                >
                  {formField.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  label={formField.name}
                  name={formField.id}
                  value={formField.value}
                  onChange={handleChange}
                  required={formField.required}
                  type={formField.type}
                  fullWidth
                  multiline={formField.type === "description"}
                  rows={formField.type === "description" ? 4 : 1}
                />
              )}
            </Box>
          ))}
        </Box>
      ))}
  
      {/* Botões */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        {isBackButton && (
          <Button variant="outlined" onClick={handleBackButton}>
            Voltar
          </Button>
        )}
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </Box>
  </form>

  );
};

export default EntityForm;