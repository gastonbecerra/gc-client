import './App.css';
import Dashboard from './components/functionals/dashboard';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Modulo from './components/functionals/modulos';
import SignUp from './components/functionals/signUp';
import SignIn from './components/functionals/singIn';
import InnerModulo from './components/functionals/innerModule';
import  UserContext  from './components/context/context';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
        <BrowserRouter>
        <UserContext>
        <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/modulo/:id_module" component={Modulo}/>
          <Route path="/innermodulo/:id_indicator" component={InnerModulo}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
        </Switch>
        <Footer/>
        </Provider>
        </UserContext>
    </BrowserRouter>
  );
}

export default App;
