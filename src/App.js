import './App.css';
import Dashboard from './components/functionals/dashboard';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Header from './components/layout/header';
import Modulo from './components/functionals/modulos';

function App() {
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
