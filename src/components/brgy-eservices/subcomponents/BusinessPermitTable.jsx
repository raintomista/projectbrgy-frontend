import React, { Component } from 'react';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft'
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'
import { getAllBusinessClearanceRequests } from 'services/EServices';
import Loader from 'assets/images/loader.svg';
import { observer } from 'mobx-react';
import './EservicesTable.less';

@observer
export default class BusinessPermitTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      requests: [],
      currentPage: 1,
      totalPage: 1,
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.totalPage === 0) {
      this.setState({ totalPage: 1 });
    }
  }

  async componentDidMount() {
    await this.props.AppData.getUserDetails();
    await this._getAllBusinessPermitRequests(this.props.AppData.loggedUser.barangay_page_id);
  }
  render() {
    const rows = this.state.requests.map((request, index) => {
      return (
        <tr
          key={index}
          className={request.status === 'unread' ? 'unread' : ''}
          onClick={() => this._viewItem(request.id)}
        >
          <td>{`${request.name_of_owner}`}</td>
          <td>{request.name_of_business}</td>
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
                Business Permit Requests
              </div>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <span>{this.state.currentPage} of {this.state.totalPage}</span>
                <button className="btn" onClick={(e) => this._prevPage()} disabled={this.state.currentPage === 1}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button className="btn" onClick={(e) => this._nextPage()} disabled={this.state.currentPage === this.state.totalPage}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '30%' }}>Applicant Name</th>
                  <th scope="col" style={{ width: '40%' }}>Business Name</th>
                  <th scope="col" style={{ width: '30%' }}>Request Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading && (
                  <tr className="loader-container">
                    <td colSpan="3">
                      <div className="loader">
                        <object data={Loader} type="image/svg+xml">
                        </object>
                      </div>
                    </td>
                  </tr>
                )}
                {!this.state.loading && this.state.requests.length === 0 && (
                  <React.Fragment>
                    <tr>
                      <td colSpan="3" className="filler">
                        No business permit requests yet!
                        </td>
                    </tr>
                  </React.Fragment>
                )}
                {!this.state.loading && rows}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }

  async _getAllBusinessPermitRequests(brgyId) {
    this.setState({ loading: true });
    try {
      const response = await getAllBusinessClearanceRequests(brgyId, 1, 5);
      setTimeout(() => {
        this.setState({
          loading: false,
          requests: response.data.data.business_permit,
          totalPage: Math.ceil(response.data.data.total / 5)
        })
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _prevPage() {
    const brgyId = this.props.AppData.loggedUser.barangay_page_id;
    const currentPage = this.state.currentPage;
    this.setState({ loading: true });

    try {
      const response = await getAllBusinessClearanceRequests(brgyId, currentPage - 1, 5);
      setTimeout(() => {
        this.setState({
          loading: false,
          requests: response.data.data.business_permit,
          currentPage: currentPage - 1,
          totalPage: Math.ceil(response.data.data.total / 5)
        })
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  async _nextPage() {
    const brgyId = this.props.AppData.loggedUser.barangay_page_id;
    const currentPage = this.state.currentPage;
    this.setState({ loading: true });

    try {
      const response = await getAllBusinessClearanceRequests(brgyId, currentPage + 1, 5);
      setTimeout(() => {
        this.setState({
          loading: false,
          requests: response.data.data.business_permit,
          currentPage: currentPage + 1,
          totalPage: Math.ceil(response.data.data.total / 5)
        })
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  _viewItem(id) {
    this.props.history.push(`/dashboard/my-barangay/e-services/business-permit/${id}`);
  }
}