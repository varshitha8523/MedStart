import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Routes,Route } from 'react-router-dom';

import Home from './Components/Home';
import Hospital from './Components/Hospital';

import Logo from './assets/logo.jpg'

import './App.css'


function App() {

  return (
    
      <div>
        <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" style={{backgroundColor:'white',color:'black',height:67,display:'flex',justifyContent:'center'}}>
        <Toolbar variant="dense">
          <Avatar alt="Remy Sharp" src={Logo}/>
          <Typography variant="h4" color="inherit" component="div" style={{marginLeft:"5px"}}>
            MedStart
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/hospital" element={<Hospital/>} />
    </Routes>


      </div>
      
  )
}

export default App
