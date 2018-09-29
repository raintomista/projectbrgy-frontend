import React, { Component } from 'react';
import queryString from 'query-string';

import ResetForm from './subcomponents/ResetForm';
import ResetInputField from './subcomponents/ResetInputField'
import LoginSlider from 'components/login/subcomponents/LoginSlider';


import LogoAE from 'assets/images/AETech.png';
import LogoDICT from 'assets/images/DICT.png';
import LogoDILG from 'assets/images/DILG.png';
import LogoDOST from 'assets/images/DOST.jpg';

import './ResetView.less';

export default class ResetView extends Component {
  constructor(props) {
    super(props);
    this.form = new ResetForm(props.history);
  }

  componentWillMount() {
    const searchQuery = this.props.location.search;
    const parsedQuery = queryString.parse(searchQuery);
    this.form.$('verify_code').set('value', typeof parsedQuery.token === 'undefined' ? '' : parsedQuery.token);
  }
  render() {
    return (
      <div className="content">
        <div className="row">
          <LoginSlider />
          <div className="col-md-8 d-flex login-form forgot-form">
            <div className="container align-self-center">
              <h1>Reset Password</h1>
              <form onSubmit={this.form.onSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <ResetInputField
                      type="password"
                      name="new-password"
                      label="New Password"
                      field={this.form.$('new_password')}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <ResetInputField
                      type="password"
                      name="confirm-password"
                      label="Confirm New Password"
                      field={this.form.$('new_password_confirmation')}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className=" d-flex justify-content-center">
                      <button type="submit" className="btn rounded">Reset</button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="partners d-flex justify-content-center">
                <img src={LogoDICT} alt="" className="align-self-center" />
                <img src={LogoDOST} alt="" className="align-self-center" />
                <img src={LogoDILG} alt="" className="align-self-center" />
                <img src={LogoAE} alt="" className="align-self-center" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}