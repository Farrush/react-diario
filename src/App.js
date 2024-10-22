import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.scss';
import Cadastro from './pages/Cadastro';
import Diario from './pages/Diario';
import { useState } from 'react';

function App() {
  const [dark, setDark] = useState(true)
  return (
    <div className={`App ${dark?"dark-theme":"light-theme"}`}>
      <div id="theme">
        <input id="theme-button" type="checkbox" checked={dark} onChange={e => setDark(e.target.checked)}/>
        <label>Tema Escuro</label>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='' Component={Login}/>
          <Route path='/cadastro' Component={Cadastro}/>
          <Route path='/diario' Component={Diario}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
