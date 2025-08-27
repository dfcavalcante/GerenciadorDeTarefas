import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const tempoInicialPomodoro = 25 * 60;
const tempoInicialCurto = 5 * 60;
const tempoInicialLongo = 15 * 60;

const PomodoroTimer = () => {

  const [tempoSobrando, setTempoSobrando] = useState(tempoInicialPomodoro); 
  const [isRunning, setIsRunning] = useState(false);

  //selecionar qual botao vai ficar marcado
  const [selected, setSelected] = useState('pomodoro');

  // Atualiza o tempo inicial quando o botão selecionado mudar
  useEffect(() => {
    if (selected === 'pomodoro') {
      setTempoSobrando(tempoInicialPomodoro);
    } else if (selected === 'curto') {
      setTempoSobrando(tempoInicialCurto);
    } else if (selected === 'longo') {
      setTempoSobrando(tempoInicialLongo);
    }
    setIsRunning(false); // pausa o timer ao mudar o modo
  }, [selected]);

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
        width: 'auto',
        mx: "auto"
      }}
    > 
      <Box sx={{ display: 'flex', gap: 2, paddingBottom:'20px'}}>
        <Button
          variant={selected === 'pomodoro' ? 'contained' : 'outlined'}
          onClick={() => setSelected('pomodoro')}
        >
          Pomodoro
        </Button>

        <Button 
          variant={selected === 'curto' ? 'contained' : 'outlined'}
          onClick={() => setSelected('curto')}
        >
          <Box sx={{width: '100%', textAlign: 'center' }}>
            Short Break
          </Box>
        </Button>

        <Button 
          variant={selected === 'longo' ? 'contained' : 'outlined'}
          onClick={() => setSelected('longo')}
        >
          <Box sx={{  width: '100%', textAlign: 'center' }}>
            Long Break
          </Box>
        </Button>
      </Box>

      {/*se achar melhor sem o ngc do circulo, é so tirar esse box*/}
      <Box sx={{ width: 200, height: 200, mb: 3 }}>
        <CircularProgressbar
          value={(selected === 'pomodoro' ? tempoInicialPomodoro :
                  selected === 'curto' ? tempoInicialCurto :
                  tempoInicialLongo) - tempoSobrando}
          maxValue={selected === 'pomodoro' ? tempoInicialPomodoro :
                    selected === 'curto' ? tempoInicialCurto :
                    tempoInicialLongo}
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
            if (selected === 'pomodoro') setTempoSobrando(tempoInicialPomodoro);
            else if (selected === 'curto') setTempoSobrando(tempoInicialCurto);
            else setTempoSobrando(tempoInicialLongo);
          }}
        >
          Resetar
        </Button>
      </Box>
    </Box>
  );
};

export default PomodoroTimer;
