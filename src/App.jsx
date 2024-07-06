import React from 'react';
import { Routes,Route, useLocation, Link } from 'react-router-dom';
import Home from './Components/Home';
import CardDetails from './Components/CardDetails';
import Context from './utils/Context';
import Create from './Components/Create';
import Edit from './Components/Edit';
function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/details/:id' element={<CardDetails/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/edit/:id' element={<Edit/>} />
      </Routes>
    </>
  )
}

export default App
