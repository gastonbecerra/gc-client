// 1 importaciones
import './App.css';
import Dashboard from './components/functionals/dashboard';
import Modulo from './components/functionals/modulo';
import Header from './components/layout/header';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import {useEffect, useState} from 'react';

// COMPONENTE
function App() {
  // 2) ESTADO: Variables, funciones y ciclos de vida
  const [data, setData] = useState(false);


  // 3) UI 
  return (
    <BrowserRouter>
    <Header/>
    
    <Switch>
    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/modulo/:id" component={Modulo}/>
    
    </Switch>
    </BrowserRouter>
  );
}

export default App;
