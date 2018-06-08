import React, { Component } from 'react';
import NavBar from 'components/common/NavBar';
import SignUpInputField from 'components/signup/SignUpInputField';
import SignUpSlider from 'components/signup/SignUpSlider';
import 'stylesheets/containers/SignUp.css';
import { withFormik, Field } from 'formik';
import Yup from 'yup';

const Form = props => {
  const { handleChange, handleBlur, handleSubmit, errors, touched } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div className="section">
        <SignUpInputField
          type="text"
          name="firstName"
          label="First Name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.firstName}
          errors={errors.firstName}
          required
        />
        <SignUpInputField
          type="text"
          name="lastName"
          label="Last Name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.lastName}
          errors={errors.lastName}
          required
        />
        <SignUpInputField
          type="text"
          name="email"
          label="Email Address"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.email}
          errors={errors.email}
        />
        <SignUpInputField
          type="text"
          name="username"
          label="Username"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.username}
          errors={errors.username}
        />
        <SignUpInputField
          type="password"
          name="password"
          label="Password"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.password}
          errors={errors.password}
        />
        <SignUpInputField
          type="text"
          name="mobile"
          label="Mobile Phone"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <SignUpInputField
          type="text"
          name="landline"
          label="Landline"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
      <div className="section">
        {/* <Field component="select" name="region">
          <option value="Region 1">Region 1</option>
          <option value="Region 2">Region 2</option>
        </Field> */}
      </div>
      <div className="text-center">
        <button type="submit" className="btn rounded">Sign Up</button>
      </div>

      {/* {JSON.stringify(props, null, 2)} */}
    </form>
  );
}

const SignupForm = withFormik({
  mapPropsToValues: () => ({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    mobile: '',
    landline: '',
    region: ''
  }),

  validateOnChange: true,
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address'),
    username: Yup.string().min(3, 'Username must be at least 3 characters'),
    password: Yup.string().min(8, 'Password must be at least 8 characters')
  }),

  handleSubmit: (values) => {
    console.log(values);
  },

})(Form);


export default class SignUp extends Component {
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
              <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex align-items-center justify-content-center">
                <div className="signup-form">
                  <h3 className="form-title">Sign Up</h3>
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}