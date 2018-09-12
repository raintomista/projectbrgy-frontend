import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InlineInputField from 'components/common/InputField/InlineInputField';
import InlineInputFieldWithDropdown from 'components/common/InputField/InlineInputFieldWithDropdown';
import InlineDropdownInput from 'components/common/DropdownInput/InlineDropdownInput';
import RadioButton from 'components/common/Radio/Button';
import RadioButtonWithField from 'components/common/Radio/ButtonWithField';


const BarangayClearance = observer((props) => {
  return (
    <React.Fragment>
      <h4 className="form-title">Barangay Clearance Form</h4>
      <p className="form-instructions">Fill the form below.</p>
      <form onSubmit={props.form.onSubmit}>

        <div className="row">
          <div className="basic-info section col-md-12">
            <div className="row">
              <div className="col col-md-7">
                <InlineInputField
                  id="first-name"
                  field={props.form.$('first_name')}
                  label="First Name:"
                  type="text"
                  required
                />
              </div>
              <div className="col col-md-5">
                <InlineInputField
                  id="middle-name"
                  field={props.form.$('middle_name')}
                  label="Middle Name:"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-md-6">
                <InlineInputField
                  id="last-name"
                  field={props.form.$('last_name')}
                  label="Last Name:"
                  type="text"
                  required
                />
              </div>
              <div className="col col-md-6">
                <InlineInputField
                  id="citizenship"
                  field={props.form.$('citizenship')}
                  label="Citizenship:"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-md-6">
                <InlineInputField
                  id="date-of-birth"
                  field={props.form.$('date_of_birth')}
                  label="Date of Birth:"
                  maxLength={10}
                  type="text"
                  required
                />
              </div>
              <div className="col col-md-6">
                <InlineInputField
                  id="place-of-birth"
                  field={props.form.$('place_of_birth')}
                  label="Place of Birth:"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-md-12">
                <InlineInputField
                  id="address"
                  field={props.form.$('address')}
                  label="Address:"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-md-5">
                <InlineDropdownInput
                  id="marital-status"
                  field={props.form.$('marital_status')}
                  label="Marital Status:"
                />
              </div>
              <div className="col col-md-7">
                <InlineInputFieldWithDropdown
                  id="residency"
                  label="Months/Years of Residency:"
                  maxLength={2}
                  residencyDropdown={props.form.$('residencyDropdown')}
                  residencyField={props.form.$('residencyField')}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="purpose section col-md-12">
            <label>Purpose of Clearance</label>
            <div className="radio-group">
              <RadioButton name="purpose" label="Certification/Residency" handleChange={props.form.$('purpose').onChange} defaultChecked />
              <RadioButton name="purpose" label="Local Employment" handleChange={props.form.$('purpose').onChange} />
              <RadioButton name="purpose" label="Overseas Employment" handleChange={props.form.$('purpose').onChange} />
              <RadioButton name="purpose" label="Loan" handleChange={props.form.$('purpose').onChange} />
              <RadioButtonWithField
                name="purpose"
                field={props.form.$('other_purpose')}
                handleChange={props.form.$('purpose').onChange}
                label="Others"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="barangay-clearance-requirements section col-md-12">
            <label className="heading">Please attached picture of the following requirements if applicable: </label>
            <div className="attachments">
              <div className="attachment form-group">
                <label>Certification of Residency from Association or Condominium: </label>
                <button className="btn rounded">Browse</button>
              </div>
              <div className="attachment form-group">
                <label>Certification from Resident Owner (For House Helpers): </label>
                <button className="btn rounded">Browse</button>
              </div>
              <div className="attachment form-group">
                <label>Latest Proof of Billing: </label>
                <button className="btn rounded">Browse</button>
              </div>
              <div className="attachment form-group">
                <label>2 Valid ID with Address: </label>
                <button className="btn rounded">Browse</button>
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
          <div className="submit section col-md-12 ">
            <button className="btn rounded" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
});

BarangayClearance.propTypes = {
  form: PropTypes.object
}

export default BarangayClearance;