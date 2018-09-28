import React, { Component } from 'react';
import { observer } from 'mobx-react';
import moment from 'moment';
import NavBar from 'components/common/Nav/Bar';
import { DropdownList } from 'react-widgets'
import GradientDoughnut from './GradientDoughnut';
import ActivityLogTable from './ActivityLogTable';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown'
import { getRegions, getProvinces, getMunicipalities, getBarangays } from 'services/SignupService';
import './SuperadminStats.less';

@observer
export default class SuperadminStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {},
      regions: [],
      provinces: [],
      municipalities: [],
      barangays: [],
      regionValue: 'Entire Philippines',
      provinceValue: 'All Provinces',
      municipalityValue: 'All Municipalities',
      barangayValue: 'All Barangays'
    }
  }


  async componentWillMount() {
    this.props.AppData.getUserDetails();
    this.getNationwide();
  }

  render() {
    const {
      stats,
      regions,
      provinces,
      municipalities,
      barangays,
      regionValue,
      provinceValue,
      municipalityValue,
      barangayValue
    } = this.state;

    const { user_count, general_report_count, committee_report_count, e_services, committee_report } = stats;
    let userCount = [0];
    let eServices = [0, 0, 0];
    let reportCount = [0, 0];
    let committeeReport = [0, 0, 0];
    if (stats.hasOwnProperty('user_count')) {
      userCount = [user_count];
      eServices = Array.from(Object.values(e_services));
      reportCount = [general_report_count, committee_report_count]
      committeeReport = Array.from(Object.values(committee_report));
    }

    return (
      <React.Fragment>
        <NavBar AppData={this.props.AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-12">
                <div className="superadmin card">
                  <div className="card-body">
                    <h4 className="card-title">B2P Statistics</h4>
                    <div className="row justify-content-center">
                      <div className="col-md-4">
                        <GradientDoughnut
                          inputData={userCount}
                          labels={['Users']}
                          title="Users"
                        />
                      </div>
                      <div className="col-md-4">
                        <GradientDoughnut
                          inputData={eServices}
                          labels={['B. Clearance', 'B. Permit', 'K. Pambarangay']}
                          title="E-Services"
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-4">
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
                    <div className="row justify-content-center">
                      <div className="col-md-4">
                        <DropdownList
                          data={regions}
                          value={regionValue}
                          onChange={(value) => this.handleRegionSelect(value)}
                          selectIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        />
                      </div>
                      <div className="col-md-4">
                        <DropdownList
                          data={provinces}
                          value={provinceValue}
                          onChange={(value) => this.handleProvinceSelect(value)}
                          disabled={provinces.length === 0}
                          selectIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-md-4">
                        <DropdownList
                          data={municipalities}
                          value={municipalityValue}
                          onChange={(value) => this.handleMunicipalitySelect(value)}
                          disabled={municipalities.length === 0}
                          selectIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        />
                      </div>
                      <div className="col-md-4">
                        <DropdownList
                          data={barangays}
                          value={barangayValue}
                          onChange={(value) => this.handleBarangaySelect(value)}
                          disabled={barangays.length === 0}
                          selectIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-sm-3">
                        <button className="btn rounded" onClick={() => this.generateReport()}>Generate Report</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-md-center">
              <div className="col-md-12">
                <div className="superadmin card">
                  <div className="card-body">
                    <h4 className="activity-log card-title">Activity Logs</h4>
                    <div className="row">
                      <div className="col-sm-12">
                        <ActivityLogTable />
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

  handleRegionSelect(region) {
    if (region === 'Entire Philippines') {
      this.getNationwide();
    } else {
      this.getRegion(region);
    }
    this.setState({
      provinces: [],
      municipalities: [],
      barangays: [],
      regionValue: region,
      provinceValue: 'All Provinces',
      municipalityValue: 'All Municipalities',
      barangayValue: 'All Barangays'
    });
  }

  handleProvinceSelect(province) {
    if (province === 'All Provinces') {
      this.getRegion(this.state.regionValue);
    } else {
      this.getProvince(this.state.regionValue, province);
    }
    this.setState({
      municipalities: [],
      barangays: [],
      provinceValue: province,
      municipalityValue: 'All Municipalities',
      barangayValue: 'All Barangays'
    });
  }

  handleMunicipalitySelect(municipality) {
    if (municipality === 'All Municipalities') {
      this.getProvince(this.state.regionValue, this.state.provinceValue);
    } else {
      this.getMunicipality(this.state.regionValue, this.state.provinceValue, municipality);
    }
    this.setState({
      barangays: [],
      municipalityValue: municipality,
      barangayValue: 'All Barangays'
    });
  }

  handleBarangaySelect(barangay) {
    if (barangay === 'All Barangays') {
      this.getMunicipality(this.state.regionValue, this.state.provinceValue, this.state.municipalityValue)
      this.setState({
        barangayValue: 'All Barangays'
      });
    } else {
      this.getBarangay(this.state.regionValue, this.state.provinceValue, this.state.municipalityValue, barangay)
      this.setState({ barangayValue: barangay });
    }
  }

  async getNationwide() {
    try {
      const response = await getRegions(false);
      const stats = this.reduceStats(response);
      this.setState({
        stats: stats,
        regions: ['Entire Philippines', ...response.data.data.items],
      })
    } catch (e) {
      alert('An error occurred. Please try again.');
    }
  }

  async getRegion(region) {
    try {
      const response = await getProvinces(region, false);
      const stats = this.reduceStats(response);
      this.setState({
        stats: stats,
        provinces: ['All Provinces', ...response.data.data.items]
      })
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getProvince(region, province) {
    try {
      const response = await getMunicipalities(region, province, false);
      const stats = this.reduceStats(response);
      this.setState({
        stats: stats,
        municipalities: ['All Municipalities', ...response.data.data.items]
      })
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getMunicipality(region, province, municipality) {
    try {
      const response = await getBarangays(region, province, municipality, false);
      const stats = this.reduceStats(response);
      this.setState({
        stats: stats,
        barangays: ['All Barangays', ...response.data.data.items],
      })
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getBarangay(region, province, municipality, barangay) {
    try {
      const response = await getBarangays(region, province, municipality, false);
      const stats = response.data.data.counts.find((brgy) => brgy.name === barangay);
      this.setState({
        stats: stats,
        barangayValue: barangay
      })
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async generateReport() {
    const { regionValue, provinceValue, municipalityValue, provinces, municipalities, barangays } = this.state;
    if (regionValue === 'Entire Philippines' && provinces.length === 0 && municipalities.length === 0 && barangays.length === 0) {
      try {
        const date = moment().format('YYYYMMDD')
        const response = await getRegions(true);
        const data = new Blob([response.data], { type: 'text/csv' });
        const csvURL = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = csvURL;
        a.download = `Nationwide-Report-${date}.csv`;
        a.click();
      } catch (e) {
        alert('An error occurred. Please try again.');
      }
    } else if (regionValue !== 'Entire Philippines' && provinces.length !== 0 && municipalities.length === 0 && barangays.length === 0) {
      try {
        const date = moment().format('YYYYMMDD')
        const response = await getProvinces(regionValue, true);
        const data = new Blob([response.data], { type: 'text/csv' });
        const csvURL = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = csvURL;
        a.download = `Regional-Report-${date}.csv`;
        a.click();
      } catch (e) {
        alert('An error occurred. Please try again.');
      }
    } else if (regionValue !== 'Entire Philippines' && provinces.length !== 0 && municipalities.length !== 0 && barangays.length === 0) {
      try {
        const date = moment().format('YYYYMMDD')
        const response = await getMunicipalities(regionValue, provinceValue, true);
        const data = new Blob([response.data], { type: 'text/csv' });
        const csvURL = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = csvURL;
        a.download = `Provincial-Report-${date}.csv`;
        a.click();
      } catch (e) {
        alert('An error occurred. Please try again.');
      }
    } else if (regionValue !== 'Entire Philippines' && provinces.length !== 0 && municipalities.length !== 0 && barangays.length !== 0) {
      try {
        const date = moment().format('YYYYMMDD')
        const response = await getBarangays(regionValue, provinceValue, municipalityValue, true);
        const data = new Blob([response.data], { type: 'text/csv' });
        const csvURL = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = csvURL;
        a.download = `Municipality-Report-${date}.csv`;
        a.click();
      } catch (e) {
        alert('An error occurred. Please try again.');
      }
    }
  }


  reduceStats(response) {
    return response.data.data.counts.reduce((a, b) => ({
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
    }));
  }
}