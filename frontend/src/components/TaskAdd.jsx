import React from "react";
import { Container, Box, Stack, Typography, FormControl, TextField, Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from "@mui/material";
import { useState } from "react";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


//adicionar as Tasks
const TaskAdd = ({open, onClose}) =>{

    //variavel pra guardar os valores do form
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "Normal",
        date:"",
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
                <Button
                    variant="outlined"
                    startIcon={<KeyboardReturnIcon />}
                    onClick={onClose}
                    sx={{ mb: 3 }}
                >
                    Retornar 
                </Button>
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
                            sx={{ mb: 2 }}
                            fullWidth
                        >
                            <MenuItem value="Baixa">Baixa</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="Alta">Alta</MenuItem>
                        </TextField>

                        <TextField name="date" label="Data de validade" value={formData.date} onChange={handleChange} fullWidth sx={{ mb: 2 }} />

                    </FormControl>
                </Stack>

                <Box sx={{ display: 'flex', gap: '12px' }}>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Adicionar tarefa
                    </Button>
                    <Button onClick={onClose}  color="error" variant="contained" >
                        Cancelar
                    </Button>
                    
                </Box>

            </DialogContent>
        </Dialog>
    );  

};

export default TaskAdd;