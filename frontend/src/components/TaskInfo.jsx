// src/components/TaskInfo.jsx

import React, { useState, useEffect } from 'react';
// --- CORREÇÃO AQUI ---
import { Box, FormControl, TextField, Button, MenuItem, Dialog, DialogContent, Stack } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

//Essa página vai ser tipo a parte mais detalhada da task
//pro mano q usar poder modificar o nome, tempo, status, vencimento etc
const TaskInfo = ({ open, onClose, task, onSave, onDelete }) => {
    const [formData, setFormData] = useState({ title: '', priority: 'Normal', date: '' });
    
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.titulo || '',
                priority: task.prioridade || 'Normal',
                date: task.data_de_vencimento || '',
            });
        }
    }, [task, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = () => {
        onSave(task.id, formData);
        onClose();
    };

    const handleDelete = () => {
        if(window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            onDelete(task.id);

            onClose();
        }
    };

    return(
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Button variant="outlined" startIcon={<KeyboardReturnIcon />} onClick={onClose} sx={{ mb: 3 }}>
                    Retornar 
                </Button>

                <Stack>
                    <FormControl>
                        <TextField name="title" label="Título" value={formData.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                        <TextField
                            name="priority" label="Prioridade" value={formData.priority}
                            onChange={handleChange} select sx={{ mb: 2 }} fullWidth
                        >
                            <MenuItem value="baixa">Baixa</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="alta">Alta</MenuItem>
                        </TextField>
                        <TextField 
                            name="date" label="Data de validade" type="date"
                            value={formData.date} onChange={handleChange} fullWidth sx={{ mb: 2 }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Stack>

                <Box sx={{ display: 'flex', gap: '12px' }}>
                    <Button onClick={handleSaveChanges} color="success" variant="contained">
                        Salvar alterações
                    </Button>

                    <Button onClick={handleDelete} color="error" variant="contained">
                        Remover
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default TaskInfo;