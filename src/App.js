import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './App.scss';
import Cadastro from './pages/Cadastro';
import Diario from './pages/Diario';

function App() {
  return (
    <div className="App">
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
