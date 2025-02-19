import React, { useState, useEffect  } from "react";
import { TextField, Checkbox, FormControlLabel, Button, Container, Box, MenuItem } from "@mui/material";
import entityForms from '../Utils/formsConfiguration'
const EntityForm = ({detailsFields, handleSubmitForm}) => {
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
      const formNewData  = formData.map(el => el.id == name ? type === "checkbox" ? {...el, value : checked} : {...el, value :value } : el)
      setFormData(formNewData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      let submitedData = {}
        formData.forEach(el => {
            submitedData[el.id] = el.value
        });

        handleSubmitForm(submitedData)
  };

  useEffect(() => {
    Object.keys(entityForms).forEach(key =>{
        if (key === detailsFields){
            setFormData(entityForms[key].formFields)
        }
    })

  }, []);

  return (
     <form onSubmit={handleSubmit}>
             <Box display="flex" flexDirection="column" gap={2}>
               {formData.map((formField) => { 
                 if(formField.type === 'checkbox'){
                 return(    
                   <FormControlLabel
                     key={formField.id}
                     control={<Checkbox name={formField.id} 
                     checked={formField.value}
                     onChange={handleChange} />}
                     label={formField.name}
                   />
                 )} 
                 if(formField.type === 'text' ||  formField.type === 'number'){
                 return(
                   <TextField
                     key={formField.id}
                     label={formField.name}
                     name={formField.id}
                     value={formField.value}
                     onChange={handleChange}
                     required={formField.required}
                     type={formField.type}
                   />        
                 )}
                 if(formField.type === 'description'){
                   return(
                     <TextField
                       key={formField.id}
                       rows={8}
                       multiline
                       label={formField.name}
                       name={formField.id}
                       value={formField.value}
                       onChange={handleChange}
                       required={formField.required}
                       type={formField.type}
                     />        
                   )}
                 if(formField.type === 'select'){
                   return(
                     <TextField
                       key={formField.id}
                       select
                       label={formField.name}
                       name={formField.id}
                       value={formField.value}
                       onChange={handleChange}
                       required={formField.required}
                       type={formField.type}
                   >     
                    {formField.options.map(option =>   
                       <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem> 
                    )} 
                   </TextField>
                   )}
               })}
               <Button type="submit" variant="contained" color="primary">Enviar</Button>
             </Box>
           </form>

  );
};

export default EntityForm;