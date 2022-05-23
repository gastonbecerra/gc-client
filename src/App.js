import './App.scss';
import React, {useEffect} from 'react';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Loader from './components/functionals/Loader';
import Indicators from './components/functionals/Indicators';
import Distribution from './components/functionals/Distribution';
import Slider from './components/functionals/Slider';
import SliderM from './components/functionals/SliderM';
import Tagger from './components/functionals/Tagger';

function App() {
  const Footer = () => {
    <div style={{display: 'flex', height: '50px'}}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  }
  return (
        <BrowserRouter>
        <Provider store={store}>
        <Header/>
        <Switch>
          {/* <Route exact path="/indicators" component={Dashboard}/>
          <Route exact path="/logout" component={Dashboard}/>
          <Route exact path="/modulo" component={Modulo}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/inputs" component={Inputs}/>
          <Route exact path="/context" component={Context}/>
          <Route exact path="/context/explorer" component={ExplorerTab}/>
          <Route exact path="/context/explorer/:context" component={ContextContainer}/>
          <Route exact path="/events" component={Event}/> */}
          <Route exact path="/" component={Loader}/>
          <Route exact path="/test" component={Indicators}/>
          <Route exact path="/distribution" component={Distribution}/>
          <Route exact path="/slider" component={Slider}/>
          <Route exact path="/slidermui" component={SliderM}/>
          <Route exact path="/tagger" component={Tagger}/>
        </Switch>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
