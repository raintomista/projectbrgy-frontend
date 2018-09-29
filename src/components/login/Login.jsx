import React, { Component } from 'react';
import { Link } from "react-router-dom";

import LoginForm from './subcomponents/LoginForm';
import LoginInputField from './subcomponents/LoginInputField'
import LoginSlider from './subcomponents/LoginSlider';
import { loginUser } from 'services/SignupService';


import LogoAE from 'assets/images/AETech.png';
import LogoDICT from 'assets/images/DICT.png';
import LogoDILG from 'assets/images/DILG.png';
import LogoDOST from 'assets/images/DOST.jpg';


import 'stylesheets/containers/Login.less';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.form = new LoginForm(props.history);
  }
  render() {
    return (
      <div className="content">
        <div className="row">
          {/* Login Slider */}
          <LoginSlider />
          <div className="col-md-8 d-flex login-form">
            <div className="container align-self-center">
              <h1>Know what's happening in your Barangay!</h1>
              <form onSubmit={this.form.onSubmit}>
                <LoginInputField
                  type="text"
                  name="email"
                  label="Email"
                  field={this.form.$('email')}
                />
                <LoginInputField
                  type="password"
                  name="password"
                  label="Password"
                  field={this.form.$('password')}
                />
                <div className="forgot-password-login">
                  <Link to='/forgot-password'>Forgot Password?</Link>
                  <button type="submit" className="btn rounded">Log-in</button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                <div className="sign-up">
                  <Link to='/sign-up'>Don't have an account yet?</Link>
                  <Link to='/sign-up'><button className="btn rounded">Sign-up</button></Link>
                </div>
              </div>
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