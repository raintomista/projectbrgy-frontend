import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';
import MemberReportItem from './subcomponents/MemberReportItem';
import { getBrgyMembersReports } from 'services/ReportService';
import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
import './BrgyReports.less';

@observer
export default class BrgyReports extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, reports: [] }
  }

  async componentDidMount() {
    await RootStore.AppData.getUserDetails();
    this._getMembersReports();
  }

  render() {
    const { AppData, DashboardStore } = RootStore;
    const { loggedUser } = AppData;

    const membersReports = this.state.reports.map((report, index) => (
      <MemberReportItem
        key={index}
        author={`${report.user_first_name} ${report.user_last_name}`}
        committeeType={report.inquiry_committee_type}
        dateCreated={report.inquiry_date_created}
        handleViewUserProfile={this._handleViewUserProfile(report.user_id)}
        message={report.inquiry_message}
        reportType={report.inquiry_report_type}
        status={report.inquiry_status}
        handleClick={() => this.props.history.push({
          pathname: `/dashboard/my-barangay/reports/${report.inquiry_id}`
        })}
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
              <div className="my-barangay-reports col-md-9">
                <div className="title"><Link to='/dashboard'>My Barangay</Link> » Members' Reports</div>
                {this.state.loading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}
                {!this.state.loading && membersReports.length === 0 && (
                  <div className="filler">No Barangay Members' Reports Yet!</div>
                )}
                {!this.state.loading && membersReports}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getMembersReports() {
    this.setState({ loading: true });
    try {
      const response = await getBrgyMembersReports();
      setTimeout(() => {
        this.setState({
          loading: false,
          reports: response.data.data.items
        });
      }, 1000);

    } catch (e) {
      if (e.response.data.data.total === 0) {
        setTimeout(() => {
          this.setState({
            loading: false,
            reports: []
          });
        }, 1000);
      } else {
        alert('An error occurred. Please try again later.')
      }
    }
  }

  _handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }
}