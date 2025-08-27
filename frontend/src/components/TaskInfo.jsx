import React from "react";
import { Container, Box, Stack, Typography, FormControl, TextField, Button, MenuItem } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {useState} from 'react';
import { DoneAll } from "@mui/icons-material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

//Essa página vai ser tipo a parte mais detalhada da task
//pro mano q usar poder modificar o nome, tempo, status, vencimento etc
const TaskInfo = ({open, onClose}) =>{
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
        date:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                <Button color="success" variant="contained">
                    Salvar alterações
                </Button>

                <Button color="error" variant="contained" >
                    Remover
                </Button>
            </Box>

            </DialogContent>
        </Dialog>
    );
}

export default TaskInfo;