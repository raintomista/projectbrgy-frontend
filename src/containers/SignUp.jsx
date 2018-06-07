import React, { Component } from 'react';
import SignupInputField from 'components/signup/SignupInputField';
import 'stylesheets/containers/SignUp.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-5"></div>
            <div className="col-md-5 signup-form">
              <h3 class="form-title">Sign Up</h3>
              <form>
                <div className="section">
                  <SignupInputField type="text" name="region" label="Region" />
                  <SignupInputField type="text" name="province" label="Province" />
                  <SignupInputField type="text" name="city" label="City/Municipality" />
                  <SignupInputField type="text" name="brgy" label="Barangay" />
                  <SignupInputField type="text" name="brgy-capt" label="Barangay Captain" />
                  <SignupInputField type="text" name="brgy-capt" label="Barangay Office Address" />
                </div>
                <div className="section">
                  <SignupInputField type="text" name="name" label="Name" />
                  <SignupInputField type="text" name="phone" label="Phone" />
                  <SignupInputField type="text" name="mobile" label="Mobile Phone" />
                  <SignupInputField type="text" name="email" label="Email" />
                </div>
                <div class="text-center">
                  <button className="btn rounded">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}