import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Login from 'containers/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path='/login' component={Login} />
        </Switch>
      </Router>
    );
  }
}
