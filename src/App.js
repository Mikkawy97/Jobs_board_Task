

import Header from './components/Header/Header';
import JobList from './components/JobList/JobList';
import JobInfo from './components/JobInfo/JobInfo';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import ThemeContext from "./contexts/ThemeContext";
import './App.css';

function App() {
  const [theme, setTheme] = useState("light")
  const value = { theme, setTheme }
 
  return (
    <div className='general_container' style={{backgroundColor:theme==='light'?'#F2F2F2':'#121721'}}>

   <BrowserRouter>
   <ThemeContext.Provider value={value}>
   <Header />
   <Routes>




 
    
 

  <Route path="/" element={<JobList  />} />
  <Route path="/job" element={<JobInfo/>} />




  
   </Routes>
   </ThemeContext.Provider>
   </BrowserRouter>
   </div>
  );
}

export default App;
