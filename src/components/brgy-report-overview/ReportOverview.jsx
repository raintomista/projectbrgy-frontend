import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import ReportOverviewItem from './subcomponent/ReportItem';
import ResponseItem from './subcomponent/ResponseItem';
import RespondFormBox from './subcomponent/RespondFormBox';

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
      loading: true,
      report: null,
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
                      handleViewUserProfile={this._handleViewUserProfile(report.user_id)}
                      message={report.inquiry_message}
                      reportType={report.inquiry_report_type}
                      handleDisplayMessage={this._handleDisplayMessage}
                    />
                    {this.state.responses.map((response, index) => (
                      <ResponseItem
                        key={response.id}
                        sender={loggedUser.barangay_page_name}
                        receiver={`${report.user_first_name} ${report.user_last_name}`}
                        dateCreated={response.date_created}
                        index={index + 1}
                        message={response.message}
                        attachments={response.attachments}
                        handleDisplayMessage={this._handleDisplayMessage}
                      />
                    ))}
                    <RespondFormBox
                      inquiryId={this.props.match.params.id}
                      history={this.props.history}
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
      const response = await getReportResponses(reportId, this.state.page, this.state.limit);
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

  _handleDisplayMessage(message) {
    return message.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  }

  _handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }
}