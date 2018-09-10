import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';
import RootStore from 'stores/RootStore';
import { createReport } from 'services/ReportService';
import { getMyReports } from '../../services/ReportService';
import Loader from 'assets/images/loader.svg';
import ReportItem from './subcomponents/ReportItem';
import './MyReportsView.less';
@observer
export default class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, reports: [] }
  }

  componentDidMount() {
    RootStore.AppData.getUserDetails();
    this._getMyReports();
  }

  render() {
    const { AppData, DashboardStore } = RootStore;
    const { loggedUser } = AppData;

    const reports = this.state.reports.map((report, index) => (
      <ReportItem
        key={index}
        committeeType={report.committee_type}
        reportType={report.report_type}
        dateCreated={report.date_created}
        message={report.message}
      />
    ));

    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                {loggedUser && <DashboardSideBar AppData={AppData} />}
              </div>
              <div className="my-reports-view col-md-7">
                <div className="section-header">
                  <div className="title">My Reports</div>
                  <Link to='/dashboard/my-reports/create' className="btn rounded">Create New Report</Link>
                </div>
                {this.state.loading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}
                {!this.setState.loading && reports}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getMyReports() {
    this.setState({ loading: true });
    try {
      const response = await getMyReports();
      setTimeout(() => {
        this.setState({
          loading: false,
          reports: response.data.data.reports
        });
      }, 1000)
    } catch (e) {
      console.log(e);
    }
  }
}