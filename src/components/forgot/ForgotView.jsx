import React, { Component } from 'react';
import queryString from 'query-string';
import { observer } from 'mobx-react';
import ResetForm from './ForgotForm';
import LoginInputField from 'components/login/subcomponents/LoginInputField'
import LoginSlider from 'components/login/subcomponents/LoginSlider';


import LogoAE from 'assets/images/AETech.png';
import LogoDICT from 'assets/images/DICT.png';
import LogoDILG from 'assets/images/DILG.png';
import LogoDOST from 'assets/images/DOST.jpg';
import './ForgotView.less';

@observer
export default class ResetView extends Component {
  constructor(props) {
    super(props);
    this.form = new ResetForm(props.history);
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          <LoginSlider />
          <div className="col-md-8 d-flex login-form forgot-form">
            <div className="container align-self-center">
              <h1>Forgot Password</h1>
              <form onSubmit={this.form.onSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <LoginInputField
                      type="email"
                      name="email"
                      label="Email"
                      field={this.form.$('email')}
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className=" d-flex justify-content-center">
                      <button type="submit" className="btn rounded" disabled={this.form.$('email').disabled}>
                        Send Reset Link
                      </button>
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