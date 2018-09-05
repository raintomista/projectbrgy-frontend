import React, { Component } from 'react';
import { observer } from 'mobx-react';
import RootStore from 'stores/RootStore';

import NavBar from 'components/common/Nav/Bar';
import InlineInputField from 'components/common/InputField/InlineInputField';
import BarangayClearance from './barangay-clearance/BarangayClearance';
import BarangayClearanceForm from './barangay-clearance/Form';


import './View.less';

@observer
export default class EServicesView extends Component {
  constructor(props) {
    super(props);
    this.state = { type: props.match.params.type };
    this.form = this._createForm();
  }
  componentDidMount() {
    RootStore.AppData.getUserDetails();
  }

  render() {
    const { AppData } = RootStore;

    return (
      <React.Fragment>
        <NavBar AppData={AppData} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-md-10">
                <div className="e-services-form card">
                  <div className="card-body">
                    {this.renderForm()}
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
    switch (this.state.type) {
      case 'barangay-clearance':
        return <BarangayClearance form={this.form} />
        break;
    }
  }

  _createForm() {
    switch (this.state.type) {
      case 'barangay-clearance':
        return new BarangayClearanceForm();
        break;
    }
  }
}