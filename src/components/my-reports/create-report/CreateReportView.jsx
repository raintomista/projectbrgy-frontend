import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import NavBar from 'components/common/Nav/Bar';
import DashboardSideBar from 'components/dashboard/subcomponents/SideBar';
import InlineDropdownInput from 'components/common/DropdownInput/InlineDropdownInput';

import RootStore from 'stores/RootStore';
import CreateReportForm from './CreateReportForm';

import './CreateReportView.less';

@observer
export default class CreateReportView extends Component {
  constructor(props) {
    super(props);
    this.form = new CreateReportForm(props.history);
  }

  componentDidMount() {
    RootStore.AppData.getUserDetails();
  }

  render() {
    const { AppData, DashboardStore } = RootStore;
    const { loggedUser } = AppData;
    let characterCount = 150 - this.form.$('message').value.length;

    return (
      <React.Fragment>
        <NavBar AppData={AppData} />
        <div className="dashboard-content">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                {loggedUser && <DashboardSideBar AppData={AppData} />}
              </div>
              <div className="col-md-6">
                <div className="create-report card">
                  <div className="card-body">
                    <h4 className="card-title">Create Report</h4>
                    <form onSubmit={this.form.onSubmit}>
                      <InlineDropdownInput
                        id="report-type"
                        field={this.form.$('report_type')}
                        label="Report Type:"
                      />
                      <InlineDropdownInput
                        id="committee-type"
                        field={this.form.$('committee_type')}
                        label="Committee Report Type:"
                        disabled={this.form.$('committee_type').disabled}
                      />
                      <textarea name="message" rows="5" {...this.form.$('message').bind()}></textarea>
                      <label 
                        htmlFor="message" 
                        className={`${characterCount < 0 ? 'invalid' : ''} character-count`}
                      >
                        {characterCount}
                      </label>
                      <div className="submit-btn">
                        <button type="submit"
                          className="btn rounded"
                          disabled={this.form.hasErrors || characterCount === 150 || characterCount < 0}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
  }
}