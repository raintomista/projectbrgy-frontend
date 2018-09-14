import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllBrgyClearanceRequests } from 'services/EServices';
import Loader from 'assets/images/loader.svg';
import { observer } from 'mobx-react';
import './EservicesTable.less';

@observer
export default class BrgyClearanceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      requests: []
    }
  }

  async componentDidMount() {
    await this.props.AppData.getUserDetails();
    await this._getAllBrgyClearanceRequests(this.props.AppData.loggedUser.barangay_page_id);
  }
  render() {
    const rows = this.state.requests.map((request, index) => {
      return (
        <tr
          key={index}
          className={request.status === 'unread' ? 'unread' : ''}
          onClick={() => this._viewItem(request.id)}
        >
          <td>{`${request.first_name} ${request.last_name}`}</td>
          <td>{request.citizenship}</td>
          <td>{request.purpose}</td>
          <td>{moment(request.date_created).format('MMM DD, YYYY hh:mm:ss a')}</td>
        </tr>
      );
    });

    return (
      <React.Fragment>
        <div className="e-services-table card">
          <div className="card-body">
            <div className="card-heading">
              <div className="card-title">
                Barangay Clearance Requests
              </div>
              <Link to='/dashboard/my-barangay/e-services/barangay-clearance'>
                View all
              </Link>
            </div>
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
                    <th scope="col">Applicant Name</th>
                    <th scope="col">Citizenship</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Request Date</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.requests.length === 0 && (
                    <React.Fragment>
                      <tr>
                        <td colSpan="4" className="filler">
                          No barangay clearance requests yet!
                        </td>
                      </tr>
                    </React.Fragment>
                  )}
                  {rows}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getAllBrgyClearanceRequests(brgyId) {
    this.setState({ loading: true });
    try {
      const response = await getAllBrgyClearanceRequests(brgyId, 1, 5);
      setTimeout(() => {
        this.setState({
          loading: false,
          requests: response.data.data.barangay_clearance
        })
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  _viewItem(id) {
    this.props.history.push(`/dashboard/my-barangay/e-services/barangay-clearance/${id}`);
  }
}