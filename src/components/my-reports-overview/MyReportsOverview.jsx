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
// import './BrgyReports.less';

@observer
export default class BrgyReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 5,
      order: 'asc',
      loading: true,
      report: null,
      fetching: false,
      responses: []
    }
  }

  async componentDidMount() {
    await RootStore.AppData.getUserDetails();
    await this._getReportDetails(this.props.match.params.id);
    await this._getBrgyResponses(this.props.match.params.id);
  }

  render() {
    const { AppData } = RootStore;
    const { loggedUser } = AppData;
    const report = this.state.report;
    const responses = [];
    this.state.responses.map((response, index) => {
      responses.push(
        <ResponseItem
          key={response.id}
          sender={loggedUser.barangay_page_name}
          receiver="me"
          dateCreated={response.date_created}
          index={index + 1}
          message={response.message}
          attachments={response.attachments}
          handleDisplayMessage={this._handleDisplayMessage}
        />
      )
    })

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
                <div className="title"><Link to='/dashboard/my-reports/responded'>Responded</Link> » Report Overview</div>
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
                    {responses}
                    <ButtonLoader
                      handleClick={() => this._showMore(report.inquiry_id)}
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
      console.log(e);
    }
  }

  async _getBrgyResponses(reportId) {
    try {
      const { page, limit, order } = this.state;
      const response = await getReportResponses(reportId, page, limit, order);
      const { inquiry_admin_response } = response.data.data;
      setTimeout(() => {
        this.setState({
          loading: false,
          responses: inquiry_admin_response
        });
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  }

  async _showMore(reportId) {
    this.setState({ fetching: true });
    try {
      const { page, limit, order } = this.state;
      const response = await getReportResponses(reportId, page + 1, limit, order);
      setTimeout(() => {
        const responses = this.state.responses.slice();
        const { inquiry_admin_response } = response.data.data;
        responses.push(...inquiry_admin_response);
        this.setState({
          fetching: false,
          page: page + 1,
          responses: responses,
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