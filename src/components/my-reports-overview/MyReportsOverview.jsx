import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import ReportOverviewItem from './subcomponents/ReportOverview';
import ResponseItem from 'components/brgy-report-overview/subcomponent/ResponseItem';
import ButtonLoader from 'components/common/Loader/ButtonLoader';

import { getBrgyMemberReportById, getReportResponses } from 'services/ReportService';
import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
import './MyReportsOverview.less';

@observer
export default class BrgyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      report: null,
      currentPage: 1,
      totalPage: 1,
      currentItems: 1,
      totalItems: 1,
      limit: 5,
      order: 'desc',
      fetching: false,

      responses: []
    }
  }

  async componentDidMount() {
    await RootStore.AppData.getUserDetails();
    await this._getReportDetails(this.props.match.params.id);
    await this._getBrgyResponses(this.props.match.params.id);
    document.title = 'Report Overview - B2P';    
  }

  render() {
    const { AppData } = RootStore;
    const { loggedUser } = AppData;
    const report = this.state.report;
    const responses = [];
    this.state.responses.map((response, index) => (
      responses.unshift(
        <ResponseItem
          key={response.id}
          sender={loggedUser.barangay_page_name}
          receiver="me"
          dateCreated={response.date_created}
          index={this.state.totalItems - index}
          message={response.message}
          attachments={response.attachments}
          handleDisplayMessage={this._handleDisplayMessage}
        />
      )
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
              <div className="my-reports-overview col-md-8 col-lg-7 col-xl-7">
                <div className="section-header">
                  <div className="title">
                    <Link to='/dashboard/my-reports/responded'>Responded </Link>
                    <span> » Report Overview</span>
                  </div>
                </div>
                {this.state.loading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}

                {!this.state.loading && (
                  <React.Fragment>
                    <ReportOverviewItem
                      author={`${report.user_first_name} ${report.user_last_name}`}
                      committeeType={report.inquiry_committee_type}
                      dateCreated={report.inquiry_date_created}
                      message={report.inquiry_message}
                      reportType={report.inquiry_report_type}
                      handleDisplayMessage={this._handleDisplayMessage}
                    />
                    {this.state.responses.length > 0 && this.state.currentItems !== this.state.totalItems && (
                      <ButtonLoader
                        handleClick={() => this._loadPrevious(report.inquiry_id)}
                        label="Load previous responses"
                        loading={this.state.fetching}
                      />
                    )}
                    {responses}
                  </React.Fragment>
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
      setTimeout(() => {
        this.setState({
          loading: false,
          report: response.data.data
        });
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _getBrgyResponses(reportId) {
    try {
      const { currentPage, limit, order } = this.state;
      const response = await getReportResponses(reportId, currentPage, limit, order, 0);
      const { inquiry_admin_response } = response.data.data;
      setTimeout(() => {
        this.setState({
          loading: false,
          responses: inquiry_admin_response,
          totalPage: Math.ceil(response.data.data.total / limit),
          currentItems: inquiry_admin_response.length,
          totalItems: response.data.data.total,
        });
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _loadPrevious(reportId) {
    this.setState({ fetching: true });
    try {
      const { currentPage, limit, order } = this.state;
      const response = await getReportResponses(reportId, currentPage + 1, limit, order, 0);
      setTimeout(() => {
        const responses = this.state.responses.slice();
        const { inquiry_admin_response } = response.data.data;
        responses.push(...inquiry_admin_response);
        this.setState({
          fetching: false,
          responses: responses,
          currentPage: currentPage + 1,
          totalPage: Math.ceil(response.data.data.total / limit),
          currentItems: responses.length,
          totalItems: response.data.data.total
        });
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }


  _handleDisplayMessage(message) {
    return message.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  }
}