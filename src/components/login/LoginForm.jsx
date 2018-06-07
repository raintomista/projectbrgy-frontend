import React from 'react';
import { Link } from "react-router-dom";
import LoginInputField from 'components/login/LoginInputField'

const LoginForm = (props) => (
  <div className="col-md-8 d-flex login-form">
    <div className="container align-self-center">
      <h1>Know what's happening in your Barangay!</h1>

      {/* Username and Password */}
      <form>
        <LoginInputField type="text" name="username" label="Username" />
        <LoginInputField type="password" name="password" label="Password" />
        <div className="forgot-password-login">
          <a href="">Forgot Password?</a>
          <button className="btn rounded">Log-in</button>
        </div>
      </form>

      {/* Sign-up */}
      <div className="d-flex justify-content-center">
        <div className="sign-up">
          <label>Don't have an account yet?</label>
          <Link to='/sign-up'><button class="btn rounded">Sign-up</button></Link>
        </div>
      </div>

      {/* Partners */}
      <div className="partners d-flex justify-content-center">
        <img src="images/DICT.png" alt="" className="align-self-center" />
        <img src="images/DOST.jpg" alt="" className="align-self-center" />
        <img src="images/DILG.png" alt="" className="align-self-center" />
        <img src="images/AETech.png" alt="" className="align-self-center" />
      </div>
    </div>
  </div>
);

export default LoginForm;


