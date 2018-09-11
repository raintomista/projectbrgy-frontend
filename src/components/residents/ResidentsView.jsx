import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import NavBar from 'components/common/Nav/Bar';
import RootStore from 'stores/RootStore';
import Loader from 'assets/images/loader.svg';
import { getMyResidents } from 'services/ResidentService';
import './ResidentsView.less';

@observer
export default class ResidentsView extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, residents: [] }
  }

  async componentDidMount() {
    await RootStore.AppData.getUserDetails();
    this._getMyResidents(RootStore.AppData.loggedUser.barangay_page_id);
  }

  render() {
    const { AppData, DashboardStore } = RootStore;
    const { loggedUser } = AppData;

    const residents = this.state.residents.map((resident, index) => (
      <tr key={index + 1}>
        <th scope="row">{index + 1}</th>
        <td className="resident-name">
          <Link to={this._handleViewUserProfile(resident.id)}>
            {resident.last_name}, {resident.first_name}
          </Link>
        </td>
        <td>{resident.email || 'n/a'}</td>
        <td>{resident.landline_number || 'n/a'}</td>
        <td>{resident.mobile_number || 'n/a'}</td>
      </tr>
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
              <div className="my-barangay-residents col-md-9">
                <div className="title"><Link to='/dashboard'>My Barangay</Link> » Residents</div>
                <div className="card">
                  <div className="card-body">

                    {this.state.loading && (
                      <div className="loader">
                        <object data={Loader} type="image/svg+xml">
                        </object>
                      </div>
                    )}

                    {!this.state.loading && (
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Landline</th>
                            <th scope="col">Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {residents.length > 0 && residents}
                          {residents.length === 0 && (
                            <tr>
                              <td colSpan="6" className="filler">
                                No barangay residents yet!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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

  async _getMyResidents(brgyId) {
    this.setState({ loading: true });
    try {
      const response = await getMyResidents(brgyId);
      setTimeout(() => {
        this.setState({
          loading: false,
          residents: response.data.data.items
        });
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again.');
    }
  }

  _handleViewUserProfile(userId) {
    return {
      pathname: '/profile',
      search: `?id=${userId}`
    };
  }
}