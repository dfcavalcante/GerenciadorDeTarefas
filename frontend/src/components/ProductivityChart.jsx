import React from 'react';
import { Box, Typography } from '@mui/material';

// Componente placeholder para o nosso futuro gráfico
function ProductivityChart() {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'white',
        borderRadius: 3,
        boxShadow: 3,
        textAlign: 'center',
        width: '100%' // Ocupa a largura do painel direito
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Productivity
      </Typography>
      <Typography variant="body2" color="textSecondary">
        (O gráfico aparecerá aqui em breve)
      </Typography>
    </Box>
  );
}

// A linha que estava faltando para resolver o erro!
export default ProductivityChart;