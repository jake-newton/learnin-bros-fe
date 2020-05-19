import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import history from "./utils/history";
import PrivateRoute from "./utils/PrivateRoute";
import Register from './components/Register';
import Login from "./components/Login";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

import './App.css';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
