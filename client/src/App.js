import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

//Components
import Dashboard from "./components/routes/Dashboard";
import Login from "./components/routes/Login";
import Error from "./components/routes/Error";
import { isLoggedIn } from './utils/Login';

function App() {
  const [state, setState] = useState({
    isLoggedIn: false
  });

  useEffect(() => {isLoggedIn().then((res) => setState(state => ({...state, isLoggedIn: res})))}, [])

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/dashboard" element={state.isLoggedIn ? <Dashboard /> : <Navigate to='/login' />}/>
          <Route path='/login' element={!state.isLoggedIn ? <Login /> : <Navigate to='/dashboard' />}/>
          <Route path='*' element={<Error />} />
        </Routes>
    </div>
  );
}




export default App;
