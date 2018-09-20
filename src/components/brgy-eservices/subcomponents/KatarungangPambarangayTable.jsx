import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronLeft from '@fortawesome/fontawesome-free-solid/faChevronLeft';
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight';
import moment from 'moment';
import { getAllKatarungangPambarangayComplaints } from 'services/EServices';
import Loader from 'assets/images/loader.svg';
import { observer } from 'mobx-react';
import './EservicesTable.less';

@observer
export default class KatarungangPambarangayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      complaints: [],
      currentPage: 1,
      totalPage: 1,
    }
  }

  async componentDidMount() {
    await this.props.AppData.getUserDetails();
    await this._getAllKatarungangPambarangayComplaints(this.props.AppData.loggedUser.barangay_page_id);
  }
  render() {
    const rows = this.state.complaints.map((request, index) => {
      return (
        <tr
          key={index}
          className={request.status === 'unread' ? 'unread' : ''}
          onClick={() => this._viewItem(request.id)}
        >
          <td>{request.name_of_complainant}</td>
          <td>{request.name_of_offender}</td>
          <td>{request.allegations}</td>
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
                Katarungang Pambarangay Requests
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
                  <th scope="col" style={{ width: '23.33%' }}>Complainant Name</th>
                  <th scope="col" style={{ width: '23.33%' }}>Offender Name</th>
                  <th scope="col" style={{ width: '23.33%' }}>Allegation/s</th>
                  <th scope="col" style={{ width: '30%' }}>Complaint Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.loading && (
                  <tr className="loader-container">
                    <td colSpan="4">
                      <div className="loader">
                        <object data={Loader} type="image/svg+xml">
                        </object>
                      </div>
                    </td>
                  </tr>
                )}
                {!this.state.loading && this.state.complaints.length === 0 && (
                  <React.Fragment>
                    <tr>
                      <td colSpan="4" className="filler">
                        No katarungang pambarangay complaints yet!
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

  async _getAllKatarungangPambarangayComplaints(brgyId) {
    this.setState({ loading: true });
    try {
      const response = await getAllKatarungangPambarangayComplaints(brgyId, 1, 5, 'desc');
      setTimeout(() => {
        this.setState({
          loading: false,
          complaints: response.data.data.katarungang_pambarangay,
          totalPage: Math.ceil(response.data.data.total / 5)
        })
      }, 1000);
    } catch (e) {
      console.log(e.response)
      alert('An error occurred. Please try again later.');
    }
  }

  async _prevPage() {
    const brgyId = this.props.AppData.loggedUser.barangay_page_id;
    const currentPage = this.state.currentPage;
    this.setState({ loading: true });

    try {
      const response = await getAllKatarungangPambarangayComplaints(brgyId, currentPage - 1, 5, 'desc');
      console.log(response)
      setTimeout(() => {
        this.setState({
          loading: false,
          complaints: response.data.data.katarungang_pambarangay,
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
      const response = await getAllKatarungangPambarangayComplaints(brgyId, currentPage + 1, 5, 'desc');
      console.log(response.data.data.katarungang_pambarangay)
      setTimeout(() => {
        this.setState({
          loading: false,
          complaints: response.data.data.katarungang_pambarangay,
          currentPage: currentPage + 1,
          totalPage: Math.ceil(response.data.data.total / 5)
        })
      }, 1000);
    } catch (e) {
      alert('An error occurred. Please try again later.');
    }
  }

  _viewItem(id) {
    this.props.history.push(`/dashboard/my-barangay/e-services/katarungang-pambarangay/${id}`);
  }
}