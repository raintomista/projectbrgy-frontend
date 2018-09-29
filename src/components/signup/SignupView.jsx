import React, { Component } from 'react';
import NavBar from 'components/common/Nav/BarAlt';

import SignUpDropdownField from './subcomponents/SignUpDropdownField';
import SignUpForm from './subcomponents/SignupForm';
import { SignUpInputField } from './subcomponents/SignUpInputField';
import SignupSlider from './subcomponents/SignUpSlider';

import { getRegions, getProvinces, getMunicipalities, getBarangays, getBarangayDetails } from 'services/SignupService';

import './SignupView.less';

export default class SignupView extends Component {
  constructor(props) {
    super(props);
    this.form = new SignUpForm(props.history);
    this.state = {
      regions: [],
      provinces: [],
      municipalities: [],
      barangays: [],
      regionValue: 'Select Region',
      provinceValue: 'Select Province',
      municipalityValue: 'Select Municipality',
      barangayValue: 'Select Barangay'
    }
  }

  componentWillMount() {
    this.getAllRegions();
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="dashboard-content signup">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12 col-sm-12 col-md-12 col-lg-5 d-flex align-items-center justify-content-center">
                <SignupSlider />
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex align-items-center justify-content-center">
                <div className="signup-form">
                  <h3 className="form-title">Sign Up</h3>
                  <form onSubmit={this.form.onSubmit}>
                    <div className="section">
                      <SignUpInputField
                        type="text"
                        name="first_name"
                        label="First Name"
                        field={this.form.$('first_name')}
                        required
                      />
                      <SignUpInputField
                        type="text"
                        name="middle_name"
                        label="Middle Name"
                        field={this.form.$('middle_name')}
                      />
                      <SignUpInputField
                        type="text"
                        name="last_name"
                        label="Last Name"
                        field={this.form.$('last_name')}
                        required
                      />
                      <SignUpInputField
                        type="email"
                        name="email"
                        label="Email Address"
                        field={this.form.$('email')}
                        required
                      />
                      <SignUpInputField
                        type="text"
                        name="username"
                        label="Username"
                        field={this.form.$('username')}
                        required
                      />
                      <SignUpInputField
                        type="password"
                        name="password"
                        label="Password"
                        field={this.form.$('password')}
                        required
                      />
                      <SignUpInputField
                        type="text"
                        name="mobile_number"
                        label="Mobile Phone"
                        field={this.form.$('mobile_number')}
                      />
                      <SignUpInputField
                        type="text"
                        name="landline_number"
                        label="Landline"
                        field={this.form.$('landline_number')}
                      />
                    </div>
                    <div className="section">
                      <SignUpDropdownField
                        data={this.state.regions}
                        value={this.state.regionValue}
                        handleChange={(value) => this.handleRegionSelect(value)}
                        name="region"
                        label="Region"
                        required
                      />
                      <SignUpDropdownField
                        data={this.state.provinces}
                        value={this.state.provinceValue}
                        handleChange={(value) => this.handleProvinceSelect(value)}
                        name="province"
                        label="Province"
                        required
                        disabled={this.state.provinces.length === 0}
                      />
                      <SignUpDropdownField
                        data={this.state.municipalities}
                        value={this.state.municipalityValue}
                        handleChange={(value) => this.handleMunicipalitySelect(value)}
                        name="municipality"
                        label="Municipality"
                        required
                        disabled={this.state.municipalities.length === 0}
                      />
                      <SignUpDropdownField
                        data={this.state.barangays}
                        value={this.state.barangayValue}
                        handleChange={(value) => this.handleBarangaySelect(value)}
                        name="barangay"
                        label="Barangay"
                        required
                        disabled={this.state.barangays.length === 0}
                      />
                      <SignUpInputField
                        type="text"
                        name="barangay_captain"
                        label="Barangay Captain"
                        field={this.form.$('barangay_captain')}
                        disabled={true}
                        required
                      />
                      <SignUpInputField
                        type="text"
                        name="barangay_address"
                        label="Barangay Address"
                        field={this.form.$('barangay_address')}
                        disabled={true}
                        required
                      />
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn rounded">Sign Up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleRegionSelect(region) {
    if (region === 'Select Region') {
      this.setState({
        provinces: [],
        municipalities: [],
        barangays: [],
        regionValue: region,
        provinceValue: 'Select Province',
        municipalityValue: 'Select Municipality',
        barangayValue: 'Select Barangay'
      });
    } else {
      this.getAllProvinces(region);
      this.setState({
        municipalities: [],
        barangays: [],
        regionValue: region,
        provinceValue: 'Select Province',
        municipalityValue: 'Select Municipality',
        barangayValue: 'Select Barangay'
      });
    }
    this.form.$('barangay_id').clear();
    this.form.$('barangay_captain').set('disabled', true);
    this.form.$('barangay_captain').clear();
    this.form.$('barangay_address').set('disabled', true);
    this.form.$('barangay_address').clear();
  }

  handleProvinceSelect(province) {
    if (province === 'Select Province') {
      this.setState({
        municipalities: [],
        barangays: [],
        provinceValue: province,
        municipalityValue: 'Select Municipality',
        barangayValue: 'Select Barangay'
      });
    } else {
      this.getAllMunicipalities(this.state.regionValue, province);
      this.setState({
        barangays: [],
        provinceValue: province,
        barangayValue: 'Select Barangay'
      });
    }
    this.form.$('barangay_id').clear();
    this.form.$('barangay_captain').set('disabled', true);
    this.form.$('barangay_captain').clear();
    this.form.$('barangay_address').set('disabled', true);
    this.form.$('barangay_address').clear();
  }

  handleMunicipalitySelect(municipality) {
    if (municipality === 'Select Municipality') {
      this.setState({
        barangays: [],
        municipalityValue: municipality,
        barangayValue: 'Select Barangay'
      });
    } else {
      this.getAllBarangays(this.state.regionValue, this.state.provinceValue, municipality);
      this.setState({
        municipalityValue: municipality,
        barangayValue: 'Select Barangay'
      });
    }
    this.form.$('barangay_id').clear();
    this.form.$('barangay_captain').set('disabled', true);
    this.form.$('barangay_captain').clear();
    this.form.$('barangay_address').set('disabled', true);
    this.form.$('barangay_address').clear();
  }

  handleBarangaySelect(barangay) {
    if (barangay === 'Select Barangay') {
      this.setState({
        barangayValue: 'Select Barangay'
      });
      this.form.$('barangay_id').clear();
      this.form.$('barangay_captain').set('disabled', true);
      this.form.$('barangay_captain').clear();
      this.form.$('barangay_address').set('disabled', true);
      this.form.$('barangay_address').clear();
    } else {
      this.getBarangayDetails(this.state.regionValue, this.state.provinceValue, this.state.municipalityValue, barangay);
      this.setState({
        barangayValue: barangay
      });
    }
  }

  async getAllRegions() {
    try {
      const response = await getRegions(false);
      this.setState({ regions: ['Select Region', ...response.data.data.items] });
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getAllProvinces(region) {
    try {
      const response = await getProvinces(region, false);
      this.setState({ provinces: ['Select Province', ...response.data.data.items] });
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getAllMunicipalities(region, province) {
    try {
      const response = await getMunicipalities(region, province, false);
      this.setState({ municipalities: ['Select Municipality', ...response.data.data.items] });
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getAllBarangays(region, province, municipality) {
    try {
      const response = await getBarangays(region, province, municipality, false);
      this.setState({ barangays: ['Select Barangay', ...response.data.data.items] });
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }

  async getBarangayDetails(region, province, municipality, barangay) {
    try {
      const response = await getBarangayDetails(region, province, municipality, barangay, false);
      this.form.$('barangay_id').set('value', response.data.data.id);
      this.form.$('barangay_captain').set('value', response.data.data.captain);
      this.form.$('barangay_address').set('value', response.data.data.office_address_street);
    } catch (e) {
      alert('An error occurred. Please try again.')
    }
  }
}