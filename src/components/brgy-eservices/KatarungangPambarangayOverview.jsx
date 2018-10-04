import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';

import Loader from 'assets/images/loader.svg';

import { getKatarungangPambarangayById } from 'services/EServices';
import RootStore from 'stores/RootStore';
import './BrgyEServiceOverview.less';

@observer
export default class KatarungangPambarangayRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      request: null
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    await RootStore.AppData.getUserDetails();
    this._getKatarungangPambarangayById(id);
    document.title = 'Complaint Overview - B2P';
  }
  render() {
    const { AppData } = RootStore;
    const { loggedUser } = AppData;
    const { request } = this.state;

    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-lg-4 col-xl-3">
                {loggedUser && <DashboardSideBar AppData={AppData} />}
              </div>
              <div className="brgy-eservice-overview col-md-8 col-lg-8 col-xl-9">
                <div className="title">
                  <Link to='/dashboard/my-barangay/e-services'>E-Services</Link> » Complaint Overview
                </div>
                <div className="card">
                  <div className="card-body">
                    {this.state.loading && (
                      <div className="loader">
                        <object data={Loader} type="image/svg+xml">
                        </object>
                      </div>
                    )}
                    {!this.state.loading && (
                      <React.Fragment>
                        <div className="card-title">Katarungang Pambarangay Form</div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Name of Complainant: </label>
                              <span> {request.name_of_complainant}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Address of Complainant: </label>
                              <span> {request.address_of_complainant}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Name of Offender: </label>
                              <span> {request.name_of_offender}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Address of Offender: </label>
                              <span> {request.address_of_offender}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Allegation/s: </label>
                              <span> {request.allegations}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Date of Incident: </label>
                              <span> {moment(request.date_of_incident).format('MMMM DD, YYYY')}</span>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Date of Filling: </label>
                              <span> {moment(request.date_created).format('MMMM DD, YYYY')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Details of the Incident: </label>
                              <p>{this.handleDisplayMessage(request.details_of_incident)}</p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getKatarungangPambarangayById(id) {
    this.setState({ loading: true });
    try {
      const response = await getKatarungangPambarangayById(id);
      setTimeout(() => {
        this.setState({
          loading: false,
          request: response.data.data
        })
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  handleDisplayMessage(message) {
    return message.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  }
}