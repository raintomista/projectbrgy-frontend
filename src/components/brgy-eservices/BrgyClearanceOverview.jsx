import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';

import Loader from 'assets/images/loader.svg';

import { getBrgyClearanceRequestById } from 'services/EServices';
import RootStore from 'stores/RootStore';
import './BrgyEServiceOverview.less';

@observer
export default class BrgyClearanceOverview extends Component {
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
    this._getBarangayClearanceById(id);
    document.title = 'Request Overview - B2P';
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
                  <Link to='/dashboard/my-barangay/e-services'>E-Services</Link> » Request Overview
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
                        <div className="card-title">Barangay Clearance Form</div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Applicant Name:</label>
                              <span> {`${request.first_name} ${request.middle_name} ${request.last_name}`}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="field">
                              <label>Address:</label>
                              <span> {request.address}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Citizenship:</label>
                              <span> {request.citizenship}</span>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Purpose:</label>
                              <span> {request.purpose}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Date of Birth:</label>
                              <span> {moment(request.date_of_birth).format('MMMM DD, YYYY')}</span>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Place of Birth:</label>
                              <span> {request.place_of_birth}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Marital Status:</label>
                              <span> {request.marital_status}</span>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Months / Years of Residency:</label>
                              <span>
                                {request.months_of_residency < 24
                                  ? ` ${request.months_of_residency} month/s`
                                  : ` ${request.months_of_residency / 12} years`
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Date of Request: </label>
                              <span> {moment(request.date_created).format('MMMM DD, YYYY')}</span>
                            </div>
                          </div>
                          <div className="col-md-12 col-lg-6">
                            <div className="field">
                              <label>Date of Pickup: </label>
                              <span> {moment(request.pickup).format('MMMM DD, YYYY (h a)')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="attachments field">
                              <label>Attached Files: </label>
                              <ul>
                                {request.attachments.map((attachment, index) => {
                                  return (
                                    <li key={index}>
                                      <a href={attachment.link} target="_blank">
                                        {attachment.filename}
                                      </a>
                                    </li>
                                  )
                                })}
                              </ul>
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

  async _getBarangayClearanceById(id) {
    this.setState({ loading: true });
    try {
      const response = await getBrgyClearanceRequestById(id);
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
}