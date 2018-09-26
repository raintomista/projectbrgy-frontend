import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ButtonLoader from 'components/common/Loader/ButtonLoader';

import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';
import RootStore from 'stores/RootStore';
import { getMyRespondedReports } from '../../services/ReportService';
import Loader from 'assets/images/loader.svg';
import ReportItem from './subcomponents/ReportItem';
import './MyReportsResponded.less';
@observer
export default class MyReportsRespondedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 15,
      order: 'desc',
      fetchingReports: false,
      loading: true,
      totalPage: 1,
      reports: [],
    }
  }

  componentDidMount() {
    RootStore.AppData.getUserDetails();
    this._getMyRespondedReports();
  }

  render() {
    const { AppData } = RootStore;
    const { loggedUser } = AppData;

    const reports = this.state.reports.map((report, index) => (
      <ReportItem
        key={index}
        id={report.id}
        committeeType={report.committee_type}
        reportType={report.report_type}
        dateUpdated={report.date_updated}
        message={report.message}
        handleViewItem={() => this._viewItem(report.id)}
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
              <div className="my-report-responded col-md-9">
                <div className="section-header">
                  <div className="title">Responded</div>
                </div>
                {this.state.loading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}

                {!this.state.loading && (
                  <React.Fragment>
                    {this.state.reports.length === 0 && (
                      <div className="empty-filler">
                        <h6>You don't have responded reports as of the moment. Please check again later.</h6>
                      </div>
                    )}
                    {reports}
                    {this.state.page !== this.state.totalPage && (
                      <ButtonLoader
                        handleClick={() => this._showMore()}
                        label="Load more"
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

  async _getMyRespondedReports() {
    this.setState({ loading: true });
    try {
      const { currentPage, limit, order } = this.state;
      const response = await getMyRespondedReports(currentPage, limit, order);
      setTimeout(() => {
        this.setState({
          loading: false,
          reports: response.data.data.reports,          
          totalPage: Math.ceil(response.data.data.total / limit)
        });
      }, 1000)
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _showMore() {
    this.setState({ fetchingReports: true });
    const { page, limit, order, reports } = this.state;
    try {
      const response = await getMyRespondedReports(page + 1, limit, order);
      let newReports = reports.slice();
      newReports.push(...response.data.data.reports);
      newReports = this.removeDuplicates(newReports, 'id');
      setTimeout(() => {
        this.setState({
          fetchingReports: false,
          page: page + 1,
          loading: false,
          reports: newReports,
          totalPage: Math.ceil(response.data.data.total / limit)
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
  _viewItem(id) {
    this.props.history.push(`/dashboard/my-reports/responded/${id}`)
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