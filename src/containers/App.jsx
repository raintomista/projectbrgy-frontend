import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

/*----------------- Stylesheets -----------------*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'stylesheets/main.less';

/*----------------- Router Views -----------------*/
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import ConfirmationPage from 'containers/ConfirmationPage';
import Dashboard from 'containers/Dashboard';
import BrgyPage from 'containers/BrgyPage';
import Profile from 'containers/Profile';

@inject('AppData', 'BrgyPageStore', 'UserProfileStore')
@observer
export default class App extends Component {  
  render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/sign-up' component={SignUp} />
          <Route
            exact={true}
            path='/dashboard'
            render={(props) => <Dashboard AppData={this.props.AppData} />}
          />
          <Route
            exact={true}
            path='/barangay'
            render={(props) => <BrgyPage {...props} AppData={this.props.AppData} BrgyPageStore={this.props.BrgyPageStore} />}
          />
          <Route
            exact={true}
            path='/profile'
            render={(props) => <Profile {...props} AppData={this.props.AppData} UserProfileStore={this.props.UserProfileStore} />}
          />
          <Route
            exact={true}
            path='/katarungang-pambarangay/confirmation'
            render={(props) => <ConfirmationPage {...props} type="complaint" />}
          />
          <Route
            exact={true}
            path='/brgy-clearance/confirmation'
            render={(props) => <ConfirmationPage {...props} type="clearance" />}
          />
          <Route
            exact={true}
            path='/business-permit/confirmation'
            render={(props) => <ConfirmationPage {...props} type="business-permit" />}
          />
        </Switch>
      </Router>
    );
  }
}
