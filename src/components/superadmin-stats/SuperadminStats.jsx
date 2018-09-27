import React, { Component } from 'react';
import { observer } from 'mobx-react';
import NavBar from 'components/common/Nav/Bar';
import { DropdownList } from 'react-widgets'
import GradientDoughnut from './GradientDoughnut';

import { getRegions } from 'services/SignupService';
import './SuperadminStats.less';

@observer
export default class SuperadminStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      regions: [],
      provinces: []
    }
  }


  async componentWillMount() {
    this.props.AppData.getUserDetails();
    this.getRegions();
  }

  render() {
    const { stats, regions } = this.state;
    const { user_count, general_report_count, committee_report_count, e_services, committee_report } = stats;
    let userCount = [0];
    let eServices = [0, 0, 0];
    let reportCount = [0, 0];
    let committeeReport = [0, 0];


    if (user_count && e_services && committee_report_count && committee_report) {
      userCount = [user_count];
      eServices = Array.from(Object.values(e_services));      
      reportCount = [general_report_count, committee_report_count]
      committeeReport = Array.from(Object.values(committee_report));
    }
    console.log(stats)
    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-12">
                <div className="search-view card">
                  <div className="card-body">
                    <DropdownList
                      data={regions}
                      defaultValue={"National Capital Region"}
                    />
                    {/* <h4 className="card-title">Results for "{this.state.query}"</h4> */}
                    <div className="row justify-content-center">
                      <div className="col-sm-4">
                        <GradientDoughnut
                          inputData={userCount}
                          labels={['Users']}
                          title="Users"
                        />
                      </div>
                      <div className="col-sm-4">
                        <GradientDoughnut
                          inputData={eServices}
                          labels={['B. Clearance', 'B. Permit', 'K. Pambarangay']}
                          title="E-Services"
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-sm-4">
                        <GradientDoughnut
                          inputData={reportCount}
                          labels={['General', 'Committee']}
                          title="Reports"
                        />
                      </div>
                      <div className="col-sm-4">
                        <GradientDoughnut
                          inputData={committeeReport}
                          labels={['Complaint', 'Inquiry', 'Feedback']}
                          title="Committee Reports"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async getRegions() {
    try {
      const response = await getRegions();
      const stats = response.data.data.counts.reduce((a, b) => ({
        user_count: a.user_count + b.user_count,
        general_report_count: a.general_report_count + b.general_report_count,
        committee_report_count: a.committee_report_count + b.committee_report_count,
        committee_report: {
          complaint_count: a.committee_report.complaint_count + b.committee_report.complaint_count,
          inquiry_count: a.committee_report.inquiry_count + b.committee_report.inquiry_count,
          feedback_count: a.committee_report.feedback_count + b.committee_report.feedback_count
        },
        e_services: {
          barangay_clearance_count: a.e_services.barangay_clearance_count + b.e_services.barangay_clearance_count,
          business_permit_count: a.e_services.business_permit_count + b.e_services.business_permit_count,
          katarungang_pambarangay_count: a.e_services.katarungang_pambarangay_count + b.e_services.katarungang_pambarangay_count,
        }
      }))
      this.setState({
        stats: stats,
        regions: response.data.data.items
      })

    } catch (e) {
      console.log(e);
    }
  }
}