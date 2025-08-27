import React from 'react';
import Header from '../components/Header'
import TaskList from '../components/TaskList';
import PomodoroTimer from '../components/PomodoroTimer';
import ProductivityChart from '../components/ProductivityChart'; // Vamos importar, mas usar depois
import { Box, Container } from '@mui/material'

const Home = () =>{
    //dados feike por enquanto
  const productivityData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
          {
            label: 'Hours Focused',
            data: [6, 7.5, 5, 8, 7],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };
    return(
    <div className='body-home'>
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
                <ProductivityChart data={productivityData} />
              </Box>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
    );
}

export default Home;