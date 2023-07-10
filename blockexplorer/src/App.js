import Navbar from  "./components/Navbar.js";
import {Route, Routes } from 'react-router-dom';
import Home from "./components/Home.js";
import Accounts from "./components/Accounts.js";

import './App.css';

function App() {


  return(
  <div className='App'>
    <Navbar />
      <Routes>
        <Route  path="/Accounts" element={<Accounts />} />
        <Route  path="/"  element={<Home />} />
      </Routes>
  </div>
  );
}

export default App;
