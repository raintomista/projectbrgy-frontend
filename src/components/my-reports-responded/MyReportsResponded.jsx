import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';
import ButtonLoader from 'components/common/Loader/ButtonLoader';
import RootStore from 'stores/RootStore';
import { getMyRespondedReports } from '../../services/ReportService';
import Loader from 'assets/images/loader.svg';
import ReportItem from './subcomponents/ReportItem';
// import './MyReportsView.less';
@observer
export default class MyReportsRespondedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
      order: 'desc',
      loading: true,
      fetching: false,
      reports: []
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
        dateUpdated={report.date_created}
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
              <div className="my-reports-view col-md-9">
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
                    {reports}
                    <ButtonLoader
                      handleClick={() => this._showMore()}
                      loading={this.state.fetching}
                    />
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
      const { page, limit, order } = this.state;
      const response = await getMyRespondedReports(page, limit, order);

      setTimeout(() => {
        this.setState({
          loading: false,
          reports: response.data.data.reports
        });
      }, 1000)
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _showMore() {
    this.setState({ fetching: true });
    try {
      const { page, limit, order } = this.state;
      const response = await getMyRespondedReports(page + 1, limit, order);
      setTimeout(() => {
        const reports = this.state.reports.slice();
        reports.push(...response.data.data.reports);
        this.setState({
          fetching: false,
          page: page + 1,
          reports: reports,
        });
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  _viewItem(id) {
    this.props.history.push(`/dashboard/my-reports/responded/${id}`)
  }
}