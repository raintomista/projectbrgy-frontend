import React, { Component } from 'react';
import LoginSlider from 'components/login/LoginSlider';
import LoginForm from 'components/login/LoginForm';
import 'stylesheets/containers/Login.css';

export default class Login extends Component {
  render() {
    return (
      <div className="content">
        <div className="row">
          {/* Login Slider */}
          <LoginSlider />

          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    );
  }
}