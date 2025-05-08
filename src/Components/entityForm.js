import React, { useState, useEffect } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  ListItemText,
} from "@mui/material";
import entityForms from "../Utils/formsConfiguration";

const EntityForm = ({
  detailsFields,
  handleSubmitForm,
  entityValue,
  isBackButton,
  handleBackButton,
  customOptions,
}) => {
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updated = formData.map((col) => ({
      formFields: col.formFields.map((field) => {
        if (field.id === name) {
          return {
            ...field,
            value: type === "checkbox" ? checked : value,
          };
        }
        return field;
      }),
    }));

    setFormData(updated);
  };

  const handleToggleMultipleSelect = (fieldId, optionValue) => {
    const updated = formData.map((col) => ({
      formFields: col.formFields.map((field) => {
        if (field.id === fieldId) {
          const currentValue = Array.isArray(field.value) ? field.value : [];
          const selected = currentValue.includes(optionValue)
            ? currentValue.filter((val) => val !== optionValue)
            : [...currentValue, optionValue];

          return {
            ...field,
            value: selected,
          };
        }
        return field;
      }),
    }));
    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submission = {};
    formData.forEach((col) => {
      col.formFields.forEach((field) => {
        submission[field.id] = field.value;
      });
    });

    if (entityValue) {
      submission.id = entityValue.id;
    }

    handleSubmitForm(submission);

    const cleared = formData.map((col) => ({
      formFields: col.formFields.map((field) => ({
        ...field,
        value:
          field.type === "checkbox"
            ? false
            : field.multiple
            ? []
            : field.type === "select" && field.options?.length
            ? field.options[0].value
            : "",
      })),
    }));

    setFormData(cleared);
  };

  useEffect(() => {
    Object.keys(entityForms).forEach((key) => {
      if (key === detailsFields) {
        let forms = entityForms[key];

        forms = forms.map((col) => ({
          formFields: col.formFields.map((field) => ({
            ...field,
            value:
              entityValue?.[field.id] ??
              (field.multiple
                ? []
                : field.type === "checkbox"
                ? false
                : ""),
          })),
        }));

        setFormData(forms);
      }
    });
  }, [entityValue]);

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        {formData.map((col, colIdx) => (
          <Box key={colIdx} display="flex" gap={2}>
            {col.formFields.map((field) => (
              <Box key={field.id} flex={1}>
                {field.type === "checkbox" ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={field.id}
                        checked={field.value}
                        onChange={handleChange}
                      />
                    }
                    label={field.name}
                  />
                ) : field.type === "select" && field.multiple ? (
                  <FormControl fullWidth>
                    <InputLabel>{field.name}</InputLabel>
                    <Select
                      multiple
                      value={Array.isArray(field.value) ? field.value : []}
                      input={<OutlinedInput label={field.name} />}
                      renderValue={(selected) =>
                        customOptions
                          ?.filter((opt) => selected.includes(opt.id))
                          .map((opt) => opt.name)
                          .join(", ")
                      }
                    >
                      {customOptions?.map((opt) => (
                        <MenuItem
                          key={opt.id}
                          value={opt.id}
                          onClick={() =>
                            handleToggleMultipleSelect(field.id, opt.id)
                          }
                        >
                          <Checkbox
                            checked={
                              Array.isArray(field.value) &&
                              field.value.includes(opt.id)
                            }
                          />
                          <ListItemText primary={opt.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : field.type === "select" ? (
                  <TextField
                    select
                    label={field.name}
                    name={field.id}
                    value={field.value}
                    onChange={handleChange}
                    required={field.required}
                    fullWidth
                  >
                    {field.options.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    label={field.name}
                    name={field.id}
                    value={field.value}
                    onChange={handleChange}
                    required={field.required}
                    type={field.type}
                    fullWidth
                    multiline={field.type === "description"}
                    rows={field.type === "description" ? 4 : 1}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}

        <Box display="flex" justifyContent="space-between" mt={3}>
          {isBackButton && (
            <Button variant="outlined" onClick={handleBackButton}>
              Voltar
            </Button>
          )}
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default EntityForm;
