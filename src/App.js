import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      {/* <Route path="/home" component={Contact} /> */}
      <Route component={NotFoundPage} /> {/* This acts as a 404 page */}
      </Switch>
    </Router>
  );
}

export default App;