import React, { Component } from 'react';
import LoginSlider from 'components/login/LoginSlider';

export default class Login extends Component {
  render() {
    return (
      <div className="row">
        {/* Login Slider */}
        <LoginSlider />
      </div>
    );
  }
}
