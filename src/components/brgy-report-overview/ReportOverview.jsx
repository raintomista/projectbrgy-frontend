import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import ReportOverviewItem from './subcomponent/ReportItem';
import ResponseItem from './subcomponent/ResponseItem';
import RespondFormBox from './subcomponent/RespondFormBox';

import { getReportResponses } from 'services/ReportService';
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
    this._getInitialDetails(this.props.match.params.id);
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

  async _getInitialDetails(reportId) {
    this.setState({ loading: true });
    try {
      const response = await getReportResponses(reportId, this.state.page, this.state.limit);
      const {
        user_first_name,
        user_last_name,
        inquiry_report_type,
        inquiry_committee_type,
        inquiry_date_created,
        inquiry_message,
        inquiry_admin_response
      } = response.data.data;

      const report = {
        user_first_name,
        user_last_name,
        inquiry_report_type,
        inquiry_committee_type,
        inquiry_date_created,
        inquiry_message,
      }

      setTimeout(() => {
        this.setState({
          loading: false,
          report: report,
          responses: inquiry_admin_response
        });
      }, 1000);
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