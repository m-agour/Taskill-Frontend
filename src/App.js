import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound'
import { Redirect } from 'react-router-dom';
import { isloggedIn } from './services/authService';
import DashboardPage from './pages/Dashboard';


function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (isloggedIn() ? <Redirect to="/dashboard" /> : <Redirect to="/register" />)}
        />
        <Route
          exact
          path="/login"
          render={() => (isloggedIn() ? <Redirect to="/dashboard" /> : <LoginPage />)}
        />
        <Route
          exact
          path="/register"
          render={() => (isloggedIn() ? <Redirect to="/dashboard" /> : <RegisterPage />)}
        />
        <Route
          exact
          path="/dashboard"
          render={() => (isloggedIn() ? <DashboardPage /> : <Redirect to="/login" />)}
        />
        <Route component={NotFoundPage} /> {/* This acts as a 404 page */}
      </Switch>
    </Router>
    
  );
}

export default App;