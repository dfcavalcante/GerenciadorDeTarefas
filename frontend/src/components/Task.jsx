import React from "react";
import { Container, Box, Stack, Typography, FormControl, TextField, Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import {useState} from 'react';
import { DoneAll } from "@mui/icons-material";

//toast pra notificar mudancas no form

//Essa página vai ser tipo a parte mais detalhada da task
//pro mano q usar poder modificar o nome, tempo, status, vencimento etc
const Task = () =>{
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return(
        <Dialog>
            <DialogContent>
                <Stack>
                    <FormControl>
                        <TextField name="title" label="Título" value={formData.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                        <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                        <TextField name="priority" label="Priority" value={formData.category} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
                    </FormControl>
                </Stack>

                <Button

                >
                    Salvar alterações
                </Button>

                <Button
                
                >
                    Remover
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default Task;