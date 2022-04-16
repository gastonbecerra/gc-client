import './App.scss';
import React, {useEffect} from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Modulo from './components/functionals/indicators/modulos';
import SignUp from './components/functionals/login-forms/signUp';
import SignIn from './components/functionals/login-forms/singIn';
import Inputs from './components/functionals/inputs/inputHome';
import Dashboard from './components/functionals/indicators/indicatorsList';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Event from './components/functionals/events/eventsHome';
import Context from './components/functionals/contexts/contextsHome';
import ExplorerTab from './components/functionals/contexts/explorerComponents/explorerTab';
import ContextContainer from './components/functionals/contexts/explorerComponents/contextContainer';

function App() {
  return (
        <BrowserRouter>
        <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path="/indicators" component={Dashboard}/>
          <Route exact path="/logout" component={Dashboard}/>
          <Route exact path="/modulo" component={Modulo}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/inputs" component={Inputs}/>
          <Route exact path="/context" component={Context}/>
          <Route exact path="/context/explorer" component={ExplorerTab}/>
          <Route exact path="/context/explorer/:context" component={ContextContainer}/>
          <Route exact path="/" component={Event}/>
        </Switch>
        <Footer/>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
