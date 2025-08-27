import React from 'react';
import Header from '../components/Header'
import TaskList from '../components/TaskList';
import PomodoroTimer from '../components/PomodoroTimer';
import ProductivityChart from '../components/ProductivityChart'; // Vamos importar, mas usar depois
import { Box, Container } from '@mui/material'

const Home = () =>{
    return(
    <div className="app-container">
    <Header />
      <Container  sx={{ mt: '150px' }}> 
        

        <Box className="main-content">
          {/* Lado Esquerdo */}
          <TaskList />
          
          {/* Lado Direito */}
          <Box className="right-panel">
            <PomodoroTimer />
            {/* Por enquanto, vamos deixar o gráfico como um placeholder */}
            <Box sx={{ mt: 4 }}> 
              <ProductivityChart />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
    );
}

export default Home;