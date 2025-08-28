import React, { useState } from "react";
import { Box, Typography, FormControl, TextField, Button, MenuItem, Dialog, DialogContent, Stack } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const TaskAdd = ({ open, onClose, onSave }) => {
    const [formData, setFormData] = useState({ title: "", priority: "Normal", date: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose(); 
        setFormData({ title: "", priority: "Normal", date: "" });
    };

    return (
        <Dialog open={open} onClose={onClose}> 
            <DialogContent>
                <Button variant="outlined" startIcon={<KeyboardReturnIcon />} onClick={onClose} sx={{ mb: 3 }}>
                    Retornar 
                </Button>
                <Typography variant="h5" sx={{padding:'10px'}}>Adicionar tarefa</Typography>
                <Stack>
                    <FormControl>
                        <TextField name="title" label="Título" value={formData.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                        <TextField name="priority" label="Prioridade" value={formData.priority} onChange={handleChange} select sx={{ mb: 2 }} fullWidth >
                            <MenuItem value="Baixa">Baixa</MenuItem>
                            <MenuItem value="Normal">Normal</MenuItem>
                            <MenuItem value="Alta">Alta</MenuItem>
                        </TextField>
                        <TextField name="date" label="Data de validade" type="date" value={formData.date} onChange={handleChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
                    </FormControl>
                </Stack>
                <Box sx={{ display: 'flex', gap: '12px' }}>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Adicionar tarefa
                    </Button>
                    <Button onClick={onClose} color="error" variant="contained">
                        Cancelar
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default TaskAdd;