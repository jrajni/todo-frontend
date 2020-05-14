import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import PageNotFound from './Components/PageNotFound'
import Login from './Components/login'
import Signup from './Components/SignUp'
import Navbar from './Components/navbar/appnavbar'
import Home from './Components/Home'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './Components/landing'
import { PersistGate } from "redux-persist/lib/integration/react";

// const store = createStore()
import { store, persistor } from './Components/store'

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>

          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Login}></Route>
              <Route path="/pagenotfound" component={PageNotFound}></Route>

              <Route exact path="/home" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/signup" component={Signup}></Route>

            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

