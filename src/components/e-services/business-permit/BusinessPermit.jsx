import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InlineInputField from 'components/common/InputField/InlineInputField';
import RadioButton from 'components/common/Radio/Button';


const BusinessPermit = observer((props) => {
  return (
    <React.Fragment>
      <h4 className="form-title">Barangay Business Permit Form</h4>
      <p className="form-instructions">Fill the form below.</p>
      <form onSubmit={props.form.onSubmit}>
        <div className="row">
          <div className="type-of-service section col-md-12">
            <label className="heading">1. Click the type of Service</label>
            <div className="radio-group">
              <RadioButton name="type-of-service" label="New Business" handleChange={props.form.$('type_of_service').onChange} defaultChecked />
              <RadioButton name="type-of-service" label="Change of Location" handleChange={props.form.$('type_of_service').onChange} />
              <RadioButton name="type-of-service" label="Change of Commercial Name" handleChange={props.form.$('type_of_service').onChange} />
              <RadioButton name="type-of-service" label="Renewal of Permit" handleChange={props.form.$('type_of_service').onChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="business-info section col-md-12">
            <label className="heading">2. Fill out the form below:</label>
            <div className="fields">
              <InlineInputField
                id="name-of-owner"
                field={props.form.$('name_of_owner')}
                label="Name of Proprietor/Owner: "
                type="text"
                required
              />
              <InlineInputField
                id="address-of-owner"
                field={props.form.$('address_of_owner')}
                label="Address of Proprietor/Owner: "
                type="text"
                required
              />
              <InlineInputField
                id="name-of-business"
                field={props.form.$('name_of_business')}
                label="Business/Trade Name: "
                type="text"
                required
              />
              <InlineInputField
                id="address-of-business"
                field={props.form.$('address_of_business')}
                label="Address of Business: "
                type="text"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="business-permit-requirements section col-md-12">
            <label className="heading">3. Attach photos of the following requirements: </label>
            <div className="attachments">
              <div className="attachment form-group">
                <label>Latest Community Tax Certificate (Cedula): </label>
                <input
                  type="file"
                  name="file"
                  id="cedula"
                  className="inputfile"
                  onChange={(e) => handleCedula(e, props.form)}
                  accept="application/pdf"
                />
                <label htmlFor="cedula">
                  {props.form.$('cedula').label}
                </label>
              </div>
              <div className="attachment form-group">
                <label>DTI Business Permit: </label>
                <input
                  type="file"
                  name="file"
                  id="dti-registration"
                  className="inputfile"
                  onChange={(e) => handleDTIPermit(e, props.form)}
                  accept="application/pdf"
                />
                <label htmlFor="dti-registration">
                  {props.form.$('dti_business_registration').label}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="pickup-datetime section col-md-12">
            <InlineInputField
              id="pickup-date"
              field={props.form.$('pickup_date')}
              label="Date of Pickup (Within 5 days after this day only): "
              maxLength={10}
              type="text"
              required
            />
            <InlineInputField
              id="pickup-time"
              field={props.form.$('pickup_time')}
              label="Time of Pickup (Between 8am and 5pm only): "
              maxLength={4}
              type="text"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="submit section col-md-12">
            <button className="btn rounded" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
});

function handleCedula(e, form) {
  if (e.target.files.length == 1) {
    const file = e.target.files[0];
    const blob = file.slice(0, -1, file.type);
    const renamedFile = new File([blob], `cedula~${file.name}`, { type: file.type });
    form.$('cedula').value = renamedFile;
    form.$('cedula').set('label', file.name);
  }
}

function handleDTIPermit(e, form) {
  if (e.target.files.length === 1) {
    const file = e.target.files[0];
    const blob = file.slice(0, -1, file.type);
    const renamedFile = new File([blob], `dti_business_registration~${file.name}`, { type: file.type });
    form.$('dti_business_registration').value = renamedFile;
    form.$('dti_business_registration').set('label', file.name);
  }
}

BusinessPermit.propTypes = {
  form: PropTypes.object
}

export default BusinessPermit;