import React from 'react';
import './index.css';

import { Provider } from './axious/axioscontext';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register /> } />
              
            
          </Routes>
        </Provider>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
