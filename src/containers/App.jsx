import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'stylesheets/main.css';

import Login from 'containers/Login';
import SignUp from 'containers/SignUp';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/sign-up' component={SignUp} />
        </Switch>
      </Router>
    );
  }
}
