// src/components/TaskInfo.jsx

import React, { useState, useEffect } from 'react';
import { Box, FormControl, TextField, Button, MenuItem, Dialog, DialogContent, Stack } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

// Recebe a tarefa e as funções de onSave e onDelete
const TaskInfo = ({ open, onClose, task, onSave, onDelete }) => {
    const [formData, setFormData] = useState({ title: '', priority: '', date: '' });
    
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.titulo || '',
                priority: task.prioridade || 'media',
                date: task.data_de_vencimento || '',
            });
        }
    }, [task, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // ALTERAÇÃO PRINCIPAL AQUI
    const handleSaveChanges = () => {
        onSave(task.id, formData); // Chama a função 'handleUpdateTask' do TaskList
        onClose();
    };

    const handleDelete = () => {
        onDelete(task.id); // Chama a função 'handleDeleteTask' do TaskList
        onClose();
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
                            name="priority"
                            label="Prioridade"
                            value={formData.priority}
                            onChange={handleChange}
                            select
                            sx={{ mb: 2 }}
                            fullWidth
                        >
                            <MenuItem value="baixa">Baixa</MenuItem>
                            <MenuItem value="media">Média</MenuItem>
                            <MenuItem value="alta">Alta</MenuItem>
                        </TextField>
                        <TextField 
                            name="date" 
                            label="Data de validade" 
                            type="date"
                            value={formData.date} 
                            onChange={handleChange} 
                            fullWidth sx={{ mb: 2 }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Stack>
                <Box sx={{ display: 'flex', gap: '12px' }}>
                    {/* O botão de Salvar agora chama a função correta */}
                    <Button onClick={handleSaveChanges} color="success" variant="contained">
                        Salvar alterações
                    </Button>
                    {/* O botão de Remover agora chama a função correta */}
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Remover
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default TaskInfo;