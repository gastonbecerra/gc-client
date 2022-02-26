import './App.scss';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Modulo from './components/functionals/modulos';
import SignUp from './components/functionals/signUp';
import SignIn from './components/functionals/singIn';
import Inputs from './components/functionals/inputs/inputHome';
import Dashboard from './components/functionals/dashboard';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Event from './components/functionals/events/eventsHome';
import Context from './components/functionals/contexts/contextsHome';

function App() {
  return (
        <BrowserRouter>
        <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
          <Route exact path="/logout" component={Dashboard}/>
          <Route exact path="/modulo" component={Modulo}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/inputs" component={Inputs}/>
          <Route exact path="/context" component={Context}/>
          <Route exact path="/events" component={Event}/>
        </Switch>
        <Footer/>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
