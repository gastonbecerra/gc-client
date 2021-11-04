import './App.css';
import Dashboard from './components/functionals/dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/layout/header';
import Modulo from './components/functionals/modulos';
import SignUp from './components/functionals/signUp';
import SignIn from './components/functionals/singIn';

function App() {
  return (
        <BrowserRouter>
        <Header/>
        
        <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/modulo/:id" component={Modulo}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/signin" component={SignIn}/>
        
        </Switch>
    </BrowserRouter>
  );
}

export default App;
