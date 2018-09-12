import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RootStore from 'stores/RootStore';
import { Redirect } from 'react-router-dom';

import NavBar from 'components/common/Nav/Bar';
import BarangayClearance from './barangay-clearance/BarangayClearance';
import BarangayClearanceForm from './barangay-clearance/Form';
import BusinessPermit from './business-permit/BusinessPermit';
import BusinessPermitForm from './business-permit/Form';
import KatarungangPambarangay from './katarungang-pambarangay/KatarungangPambarangay';
import KatarungangPambarangayForm from './katarungang-pambarangay/Form';
import ConfirmationMessage from './confirmation/ConfirmationMessage';
import queryString from 'query-string';
import './View.less';

@observer
export default class EServicesView extends Component {
  constructor(props) {
    super(props);
    this.state = { type: props.match.params.type, confirmed: false };
    this.form = this._createForm(props.history);
  }
  componentDidMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    RootStore.AppData.getUserDetails();

    this.setState({
      confirmed: typeof parsedQuery.confirmed === 'undefined' ? false : true
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);

    if (prevProps.location.search != searchQuery) {
      this.setState({
        confirmed: typeof parsedQuery.confirmed === 'undefined' ? false : true
      });
    }
  }

  render() {
    const { AppData } = RootStore;

    return (
      <React.Fragment>
        <NavBar AppData={AppData} history={this.props.history} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-10">
                <div className="e-services-form card">
                  <div className="card-body">
                    {this.state.confirmed === false && this.renderForm()}
                    {this.state.confirmed === true && this.renderConfirmation()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderForm() {
    const { loggedUser } = RootStore.AppData;

    if (loggedUser) {
      this.form.$('barangay_id').set('value', loggedUser.user_barangay_id);
    }
    switch (this.state.type) {
      case 'barangay-clearance':
        return <BarangayClearance form={this.form} />
      case 'business-permit':
        return <BusinessPermit form={this.form} />
      case 'katarungang-pambarangay':
        return <KatarungangPambarangay form={this.form} />
      default:
        return <Redirect to='/404' />;
    }
  }

  renderConfirmation() {
    if (this.props.location.state) {
      return (
        <ConfirmationMessage
          type={this.state.type}
          fee={this.props.location.state.fee}
          pickup={this.props.location.state.pickup}
        />
      );
    }
    else {
      return <Redirect to={`/e-services/${this.state.type}`} />;
    }
  }

  _createForm(history) {
    switch (this.state.type) {
      case 'barangay-clearance':
        return new BarangayClearanceForm(history);
      case 'business-permit':
        return new BusinessPermitForm(history);
      case 'katarungang-pambarangay':
        return new KatarungangPambarangayForm(history);
      default:
        break;
    }
  }
}