import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

/*----------------- Stylesheets -----------------*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.less';

// Unauthenticated Routes
import Login from 'components/login/Login';
import ResetView from 'components/reset/ResetView';
import ForgotView from 'components/forgot/ForgotView';
import SignupView from 'components/signup/SignupView';
import ConfirmView from 'components/confirm/ConfirmView';

// Barangay Member and Barangay Page Admin Exclusive Views
import Profile from 'containers/Profile';
import BrgyPage from 'containers/BrgyPage';
import DashboardView from 'components/dashboard/View';
import SearchView from 'components/search/SearchView';
import MessagesView from 'components/messages/MessagesView';
import ViewPostById from 'components/view-post-by-id/View';

// Barangay Member Exclusive Views
import MyReportsView from 'components/my-reports/MyReportsView';
import MyReportsOverview from 'components/my-reports-overview/MyReportsOverview';
import MyReportsRespondedView from 'components/my-reports-responded/MyReportsResponded';
import CreateReportView from 'components/my-reports/create-report/CreateReportView';
import EServicesView from 'components/e-services/View';

// Barangay Page Admin Exclusive Views
import ResidentsView from 'components/residents/ResidentsView';
import BrgyReportsView from 'components/brgy-reports/BrgyReports';
import BrgyReportOverview from 'components/brgy-report-overview/ReportOverview';
import BrgyEservices from 'components/brgy-eservices/BrgyEservices';
import BrgyClearanceOverview from 'components/brgy-eservices/BrgyClearanceOverview';
import BrgyBusinessPermitOverview from 'components/brgy-eservices/BrgyBusinessPermitOverview';
import KatarungangPambarangayOverview from 'components/brgy-eservices/KatarungangPambarangayOverview';


import SuperadminStats from 'components/superadmin-stats/SuperadminStats';

import NotFound404 from 'components/not-found/NotFound404';

import AdminOnlyRoute from 'guards/AdminOnlyRoute';
import MemberOnlyRoute from 'guards/MemberOnlyRoute';
import MemberAdminRoute from 'guards/MemberAdminRoute';
import UnauthenticatedRoute from 'guards/UnauthenticatedRoute';

@inject('AppData', 'BrgyPageStore', 'DashboardStore', 'MessagingStore', 'UserProfileStore')
@observer
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact={true}
            path='/login'
            render={(props) => <Login {...props} />}
          />
          <UnauthenticatedRoute
            exact={true}
            path='/confirm'
            component={ConfirmView}
          />
          <UnauthenticatedRoute
            exact={true}
            path='/forgot-password'
            component={ForgotView}
          />
          <UnauthenticatedRoute
            exact={true}
            path='/reset'
            component={ResetView}
          />
          <UnauthenticatedRoute
            exact={true}
            path='/sign-up'
            component={SignupView}
          />

          {/* Barangay Member and Barangay Page Admin Exclusive Views */}
          <MemberAdminRoute
            exact={true}
            path='/dashboard'
            component={DashboardView}
          />
          <MemberAdminRoute
            exact={true}
            path='/barangay'
            component={BrgyPage}
            AppData={this.props.AppData}
            BrgyPageStore={this.props.BrgyPageStore}
          />
          <MemberAdminRoute
            exact={true}
            path='/profile'
            component={Profile}
            AppData={this.props.AppData}
            UserProfileStore={this.props.UserProfileStore}
          />
          <MemberAdminRoute
            exact={true}
            path='/search'
            component={SearchView}
            AppData={this.props.AppData}
          />
          <MemberAdminRoute
            exact={true}
            path='/post'
            component={ViewPostById}
            AppData={this.props.AppData}
            DashboardStore={this.props.DashboardStore}
          />
          <MemberAdminRoute
            exact={true}
            path='/messages'
            component={MessagesView}
            AppData={this.props.AppData}
            MessagingStore={this.props.MessagingStore}
          />
          <MemberAdminRoute
            exact={true}
            path='/messages/:id'
            component={MessagesView}
            AppData={this.props.AppData}
            MessagingStore={this.props.MessagingStore}
          />

          {/* Barangay Member Exclusive Routes */}
          <MemberOnlyRoute
            exact={true}
            path='/dashboard/my-reports'
            component={MyReportsView}
          />
          <MemberOnlyRoute
            exact={true}
            path='/dashboard/my-reports/create'
            component={CreateReportView}
          />
          <MemberOnlyRoute
            exact={true}
            path='/dashboard/my-reports/responded'
            component={MyReportsRespondedView}
          />
          <MemberOnlyRoute
            exact={true}
            path='/dashboard/my-reports/responded/:id'
            component={MyReportsOverview}
          />
          <MemberOnlyRoute
            exact={true}
            path='/e-services/:type/'
            component={EServicesView}
          />

          {/* Barangay Page Admin Exclusive Routes */}
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/residents'
            component={ResidentsView}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/reports'
            component={BrgyReportsView}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/reports/:id'
            component={BrgyReportOverview}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services'
            component={BrgyEservices}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services/barangay-clearance'
            render={(props) => <Redirect to='/dashboard/my-barangay/e-services' />}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services/barangay-clearance/:id'
            component={BrgyClearanceOverview}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services/business-permit'
            render={(props) => <Redirect to='/dashboard/my-barangay/e-services' />}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services/business-permit/:id'
            component={BrgyBusinessPermitOverview}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services/katarungang-pambarangay'
            render={(props) => <Redirect to='/dashboard/my-barangay/e-services' />}
          />
          <AdminOnlyRoute
            exact={true}
            path='/dashboard/my-barangay/e-services/katarungang-pambarangay/:id'
            component={KatarungangPambarangayOverview}
          />

          <Route
            exact={true}
            path='/superadmin'
            render={(props) => <SuperadminStats {...props} AppData={this.props.AppData} />}
          />
          <Route
            render={(props) => <NotFound404 {...props} AppData={this.props.AppData} />}
          />
        </Switch>
      </Router>
    );
  }
}
