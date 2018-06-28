import React, { Component } from 'react';
import LoginSlider from 'components/login/LoginSlider';
import LoginForm from 'components/login/LoginForm';
import { loginUser } from 'services/SignupService';

import { Redirect } from 'react-router-dom'

import 'stylesheets/containers/Login.less';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', authenticated: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    loginUser(this.state.email, this.state.password)
      .then((response) => {
        const user = response.data.data;
        localStorage.setItem('x-access-token', user.token);
        alert('You have successfully logged in.');
        this.setState({ authenticated: true});
      })
      .catch((e) => console.log(e));
    event.preventDefault();
  }

  render() {
    return (
      <div className="content">
        <div className="row">
          {/* Login Slider */}
          <LoginSlider />

          {/* Login Form */}
          <LoginForm
            username={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />

          {this.state.authenticated === true && <Redirect to='/dashboard' />}
        </div>
      </div>
    );
  }
}