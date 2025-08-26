import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const tempoInicial = 25 * 60;

const PomodoroTimer = () => {
  //n tenho ctz se isso é pra se comunicar com o backend
  //por enquanto fica assim eu acho
  const [tempoSobrando, setTempoSobrando] = useState(tempoInicial); 
  const [isRunning, setIsRunning] = useState(false);

  // aq q roda o timer
  useEffect(() => {
    if (!isRunning) return; 

    const timer = setInterval(() => {
      setTempoSobrando((prev) => {
        if (prev > 0) return prev - 1;
        clearInterval(timer);
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  // formatar o horario
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Box 
      sx={{ 
        mt: 5, 
        p: 4,         
        backgroundColor: "white", 
        borderRadius: 3,     
        boxShadow: 3,         
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "300px",
        mx: "auto"
      }}
    > 
      <Typography sx={{ color:'black', fontSize:'30px', mb: 2, fontStyle:"initial"}}>
        Pomodoro
      </Typography>

      {/*se achar melhor sem o ngc do circulo, é so tirar esse box*/}
      <Box sx={{ width: 200, height: 200, mb: 3 }}>
        <CircularProgressbar
          value={tempoInicial - tempoSobrando}
          maxValue={tempoInicial}
          text={formatTime(tempoSobrando)}
          styles={buildStyles({
            textColor: "black",
            pathColor: "#1976d2",
            trailColor: "#e0e0e0",
            textSize: "16px",
            fontFamily: "'Share Tech Mono', monospace"
          })}
        />
      </Box>

      <Box display="flex" gap={2}>
        <Button 
          variant='contained' 
          color={isRunning ? "error" : "primary"}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pausar" : "Iniciar"}
        </Button>

        <Button 
          variant='outlined' 
          onClick={() => {
            setIsRunning(false);
            setTempoSobrando(tempoInicial); // resetar
          }}
        >
          Resetar
        </Button>
      </Box>
    </Box>
  );
};

export default PomodoroTimer;
