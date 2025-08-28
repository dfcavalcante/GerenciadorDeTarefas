import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProductivityChart = ({ data }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        backgroundColor: 'white',
        borderRadius: 3,
        height: 300, // Altura fixa para o gráfico
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Produtividade Semanal
      </Typography>
      {/* O ResponsiveContainer faz o gráfico ocupar todo o espaço do Paper */}
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10, // Ajuste para o eixo Y ficar mais próximo
            bottom: 5,
          }}
          barSize={20} // Largura das barras
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#e0e0e0' }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: 'rgba(37, 99, 235, 0.1)' }} // Cor ao passar o rato
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              borderColor: '#e0e0e0',
            }}
          />
          <Bar dataKey="pomodoros" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default ProductivityChart;