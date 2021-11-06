import './App.css';
import Dashboard from './components/functionals/dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Modulo from './components/functionals/modulos';
import SignUp from './components/functionals/signUp';
import SignIn from './components/functionals/singIn';
import  UserContext  from './components/context/context';

function App() {
  return (
        <BrowserRouter>
        <UserContext>
        <Header/>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/modulo/:id_module" component={Modulo}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
        </Switch>
        <Footer/>
        </UserContext>
    </BrowserRouter>
  );
}

export default App;
