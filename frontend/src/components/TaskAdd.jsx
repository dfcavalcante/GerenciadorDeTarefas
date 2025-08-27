import React from "react";
import { Container, Box, Stack, Typography, FormControl, TextField, Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from "@mui/material";
import { useState } from "react";

//adicionar as Tasks
const TaskAdd = ({open, onClose}) =>{

    //variavel pra guardar os valores do form
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Normal"
    });

    //salvar as mudancas
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // isso aq q manda pro backend dps
  const handleSave = () => {
    console.log("Dados salvos:", formData);
    onClose(); 
  };

    return(
        <Dialog open={open} onClose={onClose}> 
            <DialogContent>
                <Typography variant="h5" sx={{padding:'10px'}}>
                    Adicionar tarefa
                </Typography>
                <Stack>
                    <FormControl>
                        <TextField name="title" label="Título" value={formData.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                        <TextField name="description" label="Descrição" value={formData.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                        <TextField
                            name="priority"
                            label="Prioridade"
                            value={formData.priority}
                            onChange={handleChange}
                            select
                            fullWidth
                        >
                            <MenuItem value="Baixa">Baixa</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="Alta">Alta</MenuItem>
                        </TextField>

                    </FormControl>
                </Stack>

                <DialogActions sx={{ pr: 5, pb: 1, pt:3 }}>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Adicionar
                    </Button>
                    <Button onClick={onClose} color="inherit">
                        Cancelar
                    </Button>
                    
                </DialogActions>

            </DialogContent>
        </Dialog>
    );  

};

export default TaskAdd;