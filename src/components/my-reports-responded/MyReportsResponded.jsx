import React, { Component } from 'react';
import { observer } from 'mobx-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
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
      currentPage: 1,
      totalPage: 1,
      limit: 10,
      order: 'desc',
      loading: true,
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
                  <div className="btn-group btn-group-toggle" data-toggle="buttons">
                    <span>{this.state.currentPage} of {this.state.totalPage}</span>
                    <button className="btn" onClick={(e) => this._prevPage()} disabled={this.state.currentPage === 1}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button className="btn" onClick={(e) => this._nextPage()} disabled={this.state.currentPage === this.state.totalPage}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                </div>
                {this.state.loading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}
                {!this.state.loading && reports}
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
  async _prevPage() {
    this.setState({ loading: true });
    try {
      const { currentPage, limit, order } = this.state;
      const response = await getMyRespondedReports(currentPage - 1, limit, order);

      setTimeout(() => {
        this.setState({
          loading: false,
          reports: response.data.data.reports,
          currentPage: currentPage - 1,
          totalPage: Math.ceil(response.data.data.total / limit)
        });
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _nextPage() {
    this.setState({ loading: true });
    try {
      const { currentPage, limit, order } = this.state;
      const response = await getMyRespondedReports(currentPage + 1, limit, order);

      setTimeout(() => {
        this.setState({
          loading: false,
          reports: response.data.data.reports,
          currentPage: currentPage + 1,
          totalPage: Math.ceil(response.data.data.total / limit)
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