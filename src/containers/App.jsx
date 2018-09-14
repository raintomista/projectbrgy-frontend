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

import MyReportsView from 'components/my-reports/MyReportsView';
import CreateReportView from 'components/my-reports/create-report/CreateReportView';
import ResidentsView from 'components/residents/ResidentsView';
import SearchView from 'components/search/SearchView';
import BrgyReportsView from 'components/brgy-reports/BrgyReports';
import BrgyReportOverview from 'components/brgy-report-overview/ReportOverview';
import BrgyEservices from 'components/brgy-eservices/BrgyEservices';
import NotFound404 from 'components/not-found/NotFound404';



/*----------------- E-Services Views -----------------*/
import EServicesView from 'components/e-services/View';

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
            render={(props) => <DashboardView {...props} />}
          />
          <Route
            exact={true}
            path='/dashboard/my-barangay/residents'
            render={(props) => <ResidentsView {...props} />}
          />
          <Route
            exact={true}
            path='/dashboard/my-barangay/reports'
            render={(props) => <BrgyReportsView {...props} />}
          />
          <Route
            exact={true}
            path='/dashboard/my-barangay/reports/:id'
            render={(props) => <BrgyReportOverview {...props} />}
          />
          <Route
            exact={true}
            path='/dashboard/my-barangay/e-services'
            render={(props) => <BrgyEservices {...props} />}
          />
          <Route
            exact={true}
            path='/dashboard/my-reports'
            render={(props) => <MyReportsView {...props} />}
          />
          <Route
            exact={true}
            path='/dashboard/my-reports/create'
            render={(props) => <CreateReportView {...props} />}
          />
          <Route
            exact={true}
            path='/search'
            render={(props) => <SearchView {...props} AppData={this.props.AppData} />}
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

          <Route
            exact={true}
            path='/404'
            render={(props) => <NotFound404 {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}
