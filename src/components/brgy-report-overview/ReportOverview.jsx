import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import ReportOverviewItem from './subcomponent/ReportItem';
import { getBrgyMemberReportById } from 'services/ReportService';
import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
// import './BrgyReports.less';

@observer
export default class BrgyReports extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, report: null }
  }

  async componentDidMount() {
    await RootStore.AppData.getUserDetails();
    this._getReportDetails(this.props.match.params.id);
  }

  render() {
    const { AppData, DashboardStore } = RootStore;
    const { loggedUser } = AppData;
    const report = this.state.report;

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
                <div className="title"><Link to='/dashboard/my-barangay/reports'>Members' Reports</Link> » Report Overview</div>
                {!this.state.loading && (
                  <ReportOverviewItem
                    committeeType={report.committee_type}
                    dateCreated={report.date_created}
                    message={report.message}
                    reportType={report.report_type}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getReportDetails(reportId) {
    this.setState({ loading: true });
    try {
      const response = await getBrgyMemberReportById(reportId);
      console.log(response.data.data)
      this.setState({
        loading: false,
        report: response.data.data
      });
    } catch (e) {
      console.log(e);
    }
  }

  _handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }
}

// {this.state.loading && (
//   <div className="loader">
//     <object data={Loader} type="image/svg+xml">
//     </object>
//   </div>
// )}