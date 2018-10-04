import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';
import ButtonLoader from 'components/common/Loader/ButtonLoader';
import MemberReportItem from './subcomponents/MemberReportItem';
import { getBrgyMembersReports } from 'services/ReportService';
import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
import './BrgyReports.less';

@observer
export default class BrgyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 15,
      order: 'desc',
      fetchingReports: false,
      pageLoading: true,
      totalPage: 1,
      reports: [],
    }
  }

  async componentDidMount() {
    await RootStore.AppData.getUserDetails();
    this._getMembersReports();
    document.title = 'My Barangay Reports - B2P';
  }

  render() {
    const { AppData } = RootStore;
    const { loggedUser } = AppData;

    const membersReports = this.state.reports.map((report, index) => (
      <MemberReportItem
        key={report.inquiry_id}
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
              <div className="col-md-4 col-lg-4 col-xl-3">
                {loggedUser && <DashboardSideBar AppData={AppData} />}
              </div>
              <div className="my-barangay-reports col-md-8 col-lg-8 col-xl-9">
                <div className="title"><Link to='/dashboard'>My Barangay</Link> » Members' Reports</div>
                {this.state.pageLoading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}
                {!this.state.pageLoading && membersReports.length === 0 && (
                  <div className="filler">No Barangay Members' Reports Yet!</div>
                )}
                {!this.state.pageLoading && (
                  <React.Fragment>
                    {membersReports}
                    {this.state.page !== this.state.totalPage && (
                      <ButtonLoader
                        handleClick={() => this._showMore()}
                        label="Load previous responses"
                        loading={this.state.fetchingReports}
                      />
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getMembersReports() {
    this.setState({ pageLoading: true });
    const { page, limit, order } = this.state;
    try {
      const response = await getBrgyMembersReports(page, limit, order);
      setTimeout(() => {
        this.setState({
          pageLoading: false,
          reports: response.data.data.items,
          totalPage: Math.ceil(response.data.data.total / limit)
        });
      }, 1000);

    } catch (e) {
      if (e.response.data.data.total === 0) {
        setTimeout(() => {
          this.setState({
            pageLoading: false,
            reports: []
          });
        }, 1000);
      } else {
        alert('An error occurred. Please try again later.')
      }
    }
  }

  async _showMore() {

    this.setState({ fetchingReports: true });
    const { page, limit, order, reports } = this.state;
    try {
      const response = await getBrgyMembersReports(page + 1, limit, order);
      let newReports = reports.slice();
      newReports.push(...response.data.data.items);
      newReports = this.removeDuplicates(newReports, 'inquiry_id');

      setTimeout(() => {
        this.setState({
          fetchingReports: false,
          page: page + 1,
          pageLoading: false,
          reports: newReports,
          totalPage: Math.ceil(response.data.data.total / limit)
        });
      }, 1000);

    } catch (e) {
      if (e.response.data.data.total === 0) {
        setTimeout(() => {
          this.setState({
            pageLoading: false,
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

  removeDuplicates(arr, key) {
    var values = {};
    return arr.filter(function (item) {
      var val = item[key];
      var exists = values[val];
      values[val] = true;
      return !exists;
    });
  }
}