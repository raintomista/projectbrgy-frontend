import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

/*----------------- Stylesheets -----------------*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.less';

/*----------------- Router Views -----------------*/
import Login from 'containers/Login';
import SignUp from 'containers/SignUp';
import DashboardView from 'components/dashboard/View';
import ViewPostById from 'components/view-post-by-id/View';
import BrgyPage from 'containers/BrgyPage';
import Profile from 'containers/Profile';

/*----------------- E-Services Views -----------------*/
import EServicesView from 'components/e-services/View';
import EServicesConfirmationView from 'components/e-services-confirmation/View';


@inject('AppData', 'BrgyPageStore', 'DashboardStore', 'UserProfileStore')
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
            render={(props) => <DashboardView />}
          />

          <Route
            exact={true}
            path='/post'
            render={(props) => <ViewPostById {...props} AppData={this.props.AppData} DashboardStore={this.props.DashboardStore} />}
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
            path='/e-services/:type/'
            render={(props) => <EServicesView {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}
