import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import ButtonLoader from 'components/common/Loader/ButtonLoader';
import ReportOverviewItem from './subcomponent/ReportItem';
import ResponseItem from './subcomponent/ResponseItem';
import RespondFormBox from './subcomponent/RespondFormBox';

import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
// import './BrgyReports.less';

@observer
export default class BrgyReports extends Component {

  async componentDidMount() {
    const { id } = this.props.match.params;
    await RootStore.AppData.getUserDetails();
    await RootStore.ReportOverviewStore.getReportDetails(id);
    await RootStore.ReportOverviewStore.getAdminResponses(id);
    document.title = 'Report Overview - B2P';
  }

  async componentWillUnmount() {
    RootStore.ReportOverviewStore.reset();
  }

  render() {
    const { id } = this.props.match.params;
    const { AppData, ReportOverviewStore } = RootStore;
    const { loggedUser } = AppData;
    const {
      fetchedCount,
      fetchingResponses,
      report,
      responses,
      totalCount,
    } = ReportOverviewStore;
    const adminReponses = [];

    report && responses.map((response, index) => (
      adminReponses.unshift(
        <ResponseItem
          key={response.id}
          sender={loggedUser.barangay_page_name}
          receiver={`${report.user_first_name} ${report.user_last_name}`}
          dateCreated={response.date_created}
          handleDisplayMessage={this.handleDisplayMessage}
          index={totalCount - index}
          message={response.message}
          attachments={response.attachments}
        />
      )
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
                <div className="title"><Link to='/dashboard/my-barangay/reports'>Members' Reports</Link> » Report Overview</div>
                {ReportOverviewStore.pageLoading && (
                  <div className="loader">
                    <object data={Loader} type="image/svg+xml">
                    </object>
                  </div>
                )}
                {!ReportOverviewStore.pageLoading && (
                  <React.Fragment>
                    <ReportOverviewItem
                      author={`${report.user_first_name} ${report.user_last_name}`}
                      committeeType={report.inquiry_committee_type}
                      dateCreated={report.inquiry_date_created}
                      handleDisplayMessage={this.handleDisplayMessage}
                      handleViewUserProfile={this.handleViewUserProfile(report.user_id)}
                      message={report.inquiry_message}
                      reportType={report.inquiry_report_type}
                    />

                    {/* Hide load previous button when every item is loaded */}
                    {fetchedCount !== totalCount && (
                      <ButtonLoader
                        handleClick={() => ReportOverviewStore.loadPrevious(id)}
                        label="Load previous responses"
                        loading={fetchingResponses}
                      />
                    )}

                    {adminReponses}

                    <RespondFormBox
                      inquiryId={id}
                      history={this.props.history}
                      ReportOverviewStore={ReportOverviewStore}
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

  handleDisplayMessage(message) {
    return message.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  }

  handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }
}