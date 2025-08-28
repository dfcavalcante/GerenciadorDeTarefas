// src/pages/Cadastro.jsx

import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Vamos usar para a integração

const Cadastro = () => {
  const navigate = useNavigate();
  
  // Estados para guardar os valores dos campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro

  // Função chamada quando o formulário é enviado
  const handleSubmit = async (event) => {
    event.preventDefault(); // Impede o recarregamento padrão da página
    setError(''); // Limpa erros anteriores

    // Validação simples
    if (!nome || !email || !senha) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      // --- INTEGRAÇÃO COM O BACKEND ---
      // Faz a chamada POST para a rota de registro do seu backend
      const response = await axios.post('http://localhost:5000/api/auth/registrar', {
        nome: nome,
        email: email,
        senha: senha,
      });

      // Se o cadastro for bem-sucedido...
      console.log('Usuário cadastrado:', response.data);
      
      // Redireciona o usuário para a página de login
      navigate('/login');

    } catch (err) {
      // Se o backend retornar um erro (ex: email já existe)
      console.error('Erro no cadastro:', err);
      setError(err.response?.data?.message || 'Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper 
        elevation={6} 
        sx={{ 
          marginTop: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: 4 
        }}
      >
        <Typography component="h1" variant="h5">
          Criar Conta
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Nome Completo"
            name="nome"
            autoComplete="name"
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Senha"
            type="password"
            id="senha"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {/* Exibe a mensagem de erro, se houver */}
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Box textAlign="center">
            <Link href="/login" variant="body2">
              {"Já tem uma conta? Faça login"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cadastro;