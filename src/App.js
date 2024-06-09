import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './Components/MainComponent/Mainpage';
import BreweryPage from './Components/BreweryComponent/BreweryPage';
import Auth from './Components/AuthComponent/auth';

const App = () => {
  return (
    <div className='App'>
    <h1 style={{color:"black",textAlign:"center"}}>BrewesBrowse</h1>
    <Router>
      <Routes>
        <Route path = "/" element={<Auth/>} />
        <Route path = "/home" element={<Mainpage/>} />
        <Route path="/details/:id" element={<BreweryPage/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
