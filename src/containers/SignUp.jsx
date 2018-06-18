import React, { Component } from 'react';
import NavBar from 'components/common/NavBar';
import SignUpDropdownField from 'components/signup/SignUpDropdownField';
import { SignUpInputField, UncontrolledSignUpInputField } from 'components/signup/SignUpInputField';
import SignUpSlider from 'components/signup/SignUpSlider';
import { getRegions, getProvinces } from 'services/SignupService';
import { getMunicipalities, getBarangays } from 'services/SignupService';
import { getBarangayDetails, createUser } from 'services/SignupService';
import { withFormik } from 'formik';
import Yup from 'yup';

import { Redirect } from 'react-router-dom'

import 'stylesheets/containers/SignUp.css';



const Form = props => {
  const { handleChange, handleBlur, handleSubmit, setFieldValue, updateState, errors, touched, values } = props;

  // Handle the change in region dropdown menu
  const handleRegionChange = (value) => {

    // Set selected item as the value
    setFieldValue('region', value);

    // Empty dropdown menu items when selecting new region
    updateState('provinces', []);
    updateState('municipalities', []);
    updateState('barangays', []);

    // Reset the form values since the dropdown menu items were empty
    setFieldValue('province', '');
    setFieldValue('municipality', '');
    setFieldValue('barangay', '');
    setFieldValue('barangayCaptain', '');
    setFieldValue('barangayAddress', '');

    //Fetch provinces when valid region is selected
    if (value !== '')
      getProvinces(value)
        .then((response) => updateState('provinces', response.data.data.items))
        .catch((e) => console.log(e));
  }

  // Handle the change in province dropdown menu
  const handleProvinceChange = (value) => {

    // Set selected item as the value
    setFieldValue('province', value);

    // Empty dropdown menu items when selecting new province
    updateState('municipalities', []);
    updateState('barangays', []);

    // Reset the form values since the dropdown menu items were empty
    setFieldValue('municipality', '');
    setFieldValue('barangay', '');
    setFieldValue('barangayCaptain', '');
    setFieldValue('barangayAddress', '');

    //Fetch provinces when valid province is selected
    if (value !== '')
      getMunicipalities(values.region, value)
        .then((response) => updateState('municipalities', response.data.data.items))
        .catch((e) => console.log(e));
  }

  // Handle the change in municipality dropdown menu
  const handleMunicipalityChange = (value) => {

    // Set selected item as the value
    setFieldValue('municipality', value);

    // Empty dropdown menu items when selecting new municipality
    updateState('barangays', []);

    // Reset the form values since the dropdown menu items were empty
    setFieldValue('barangay', '');
    setFieldValue('barangayCaptain', '');
    setFieldValue('barangayAddress', '');

    //Fetch provinces when valid municipality is selected
    getBarangays(values.region, values.province, value)
      .then((response) => updateState('barangays', response.data.data.items))
      .catch((e) => console.log(e));
  }


  const handleBarangayChange = (value) => {
    setFieldValue('barangay', value);

    //Fetch provinces when valid barangay is selected
    getBarangayDetails(values.region, values.province, values.municipality, value)
      .then((response) => {
        const details = response.data.data;
        setFieldValue('barangayCaptain', details.captain);
        setFieldValue('barangayAddress', details.office_address_street);
        setFieldValue('barangay_id', details.id);
      })
      .catch((e) => console.log(e));
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <div className="section">
        <SignUpInputField
          type="text"
          name="first_name"
          label="First Name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.first_name}
          errors={errors.first_name}
          required
        />
        <SignUpInputField
          type="text"
          name="middle_name"
          label="Middle Name"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <SignUpInputField
          type="text"
          name="last_name"
          label="Last Name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          touched={touched.last_name}
          errors={errors.last_name}
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
          name="mobile_number"
          label="Mobile Phone"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
        <SignUpInputField
          type="text"
          name="landline_number"
          label="Landline"
          handleChange={handleChange}
          handleBlur={handleBlur}
        />
      </div>
      <div className="section">
        <SignUpDropdownField
          data={props.regions}
          name="region"
          label="Region"
          handleBlur={handleBlur}
          handleChange={handleRegionChange}
        />
        <SignUpDropdownField
          data={props.provinces}
          name="province"
          label="Province"
          handleBlur={handleBlur}
          handleChange={handleProvinceChange}
        />
        <SignUpDropdownField
          data={props.municipalities}
          name="municipality"
          label="Municipality"
          handleBlur={handleBlur}
          handleChange={handleMunicipalityChange}
        />
        <SignUpDropdownField
          data={props.barangays}
          name="barangay"
          label="Barangay"
          handleBlur={handleBlur}
          handleChange={handleBarangayChange}
        />
        <SignUpInputField
          type="text"
          name="barangayCaptain"
          label="Barangay Captain"
          value={values.barangayCaptain || ''}
          handleChange={handleChange}
          handleBlur={handleBlur}
          disabled={true}
        />
        <SignUpInputField
          type="text"
          name="barangayAddress"
          label="Barangay Address"
          value={values.barangayAddress || ''}
          handleChange={handleChange}
          handleBlur={handleBlur}
          disabled={true}
        />
      </div>
      <div className="text-center">
        <button type="submit" className="btn rounded">Sign Up</button>
      </div>
      {props.status === true && <Redirect to='/login' />}
      {/* {JSON.stringify(props, null, 2)} */}
    </form>
  );
}

const SignupForm = withFormik({
  mapPropsToValues: (props) => ({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    region: '',
    province: '',
    municipality: '',
    barangay: '',
    barangay_id: '',
    role: 'barangay_member'
  }),

  validateOnChange: true,
  validationSchema: Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address'),
    username: Yup.string().min(3, 'Username must be at least 3 characters'),
    password: Yup.string().min(8, 'Password must be at least 8 characters')
  }),

  handleSubmit: (values, { setStatus }) => {
    createUser(values)
      .then((response) => {
        alert('You have successfully created a barangay member account.');
        setStatus(true);
      })
      .catch((e) => console.log(e));
  },

})(Form);


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { regions: [], provinces: [], municipalities: [], barangays: [], isSubmitted: false };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    getRegions()
      .then((response) => {
        this.setState({ regions: response.data.data.items })
      });
  }

  updateState(name, value) {
    this.setState({ [name]: value })
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
              <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex align-items-center justify-content-center">
                <div className="signup-form">
                  <h3 className="form-title">Sign Up</h3>
                  <SignupForm
                    regions={this.state.regions}
                    provinces={this.state.provinces}
                    municipalities={this.state.municipalities}
                    barangays={this.state.barangays}
                    updateState={this.updateState}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}