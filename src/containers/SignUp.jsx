import React, { Component } from 'react';
import NavBar from 'components/common/NavBar';
import SignUpInputField from 'components/signup/SignUpInputField';
import SignUpSlider from 'components/signup/SignUpSlider';
import 'stylesheets/containers/SignUp.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <div className="container">
            <div className="row justify-content-lg-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex align-items-center justify-content-center">
                <SignUpSlider />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-7 d-flex align-items-center justify-content-center">
                <div className="signup-form">
                  <h3 class="form-title">Sign Up</h3>
                  <form>
                    <div className="section">
                      <SignUpInputField type="text" name="region" label="Region" />
                      <SignUpInputField type="text" name="province" label="Province" />
                      <SignUpInputField type="text" name="city" label="City/Municipality" />
                      <SignUpInputField type="text" name="brgy" label="Barangay" />
                      <SignUpInputField type="text" name="brgy-capt" label="Barangay Captain" />
                      <SignUpInputField type="text" name="brgy-capt" label="Barangay Office Address" />
                    </div>
                    <div className="section">
                      <SignUpInputField type="text" name="name" label="Name" />
                      <SignUpInputField type="text" name="phone" label="Phone" />
                      <SignUpInputField type="text" name="mobile" label="Mobile Phone" />
                      <SignUpInputField type="text" name="email" label="Email" />
                    </div>
                    <div class="text-center">
                      <button className="btn rounded">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}