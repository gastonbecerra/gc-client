import './App.scss';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Modulo from './components/functionals/modulos';
import SignUp from './components/functionals/signUp';
import SignIn from './components/functionals/singIn';
import HomeTab from './components/functionals/tab';
import DragAndDrop from './components/functionals/innermodule/inputs/dragAndDrop/dragAndDrop';
import Inputs from './components/functionals/inputs/inputHome';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
        <BrowserRouter>
        <Provider store={store}>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomeTab}/>
          <Route exact path="/modulo/:id_module" component={Modulo}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/drag" component={DragAndDrop}/>
          <Route exact path="/inputs" component={Inputs}/>
        </Switch>
        <Footer/>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
