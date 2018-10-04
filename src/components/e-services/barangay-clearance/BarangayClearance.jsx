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
          <div className="basic-info section col-sm-12 col-md-12">
            <div className="row">
              <div className="col-sm-12 col-md-7">
                <InlineInputField
                  id="first-name"
                  field={props.form.$('first_name')}
                  label="First Name:"
                  type="text"
                  required
                />
              </div>
              <div className="col-sm-12 col-md-5">
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
              <div className="col-sm-12 col-md-6">
                <InlineInputField
                  id="last-name"
                  field={props.form.$('last_name')}
                  label="Last Name:"
                  type="text"
                  required
                />
              </div>
              <div className="col-sm-12 col-md-6">
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
              <div className="col-sm-12 col-md-6">
                <InlineInputField
                  id="date-of-birth"
                  field={props.form.$('date_of_birth')}
                  label="Date of Birth:"
                  maxLength={10}
                  type="text"
                  required
                />
              </div>
              <div className="col-sm-12 col-md-6">
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
              <div className="col-sm-12 col-md-12">
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
              <div className="col-sm-12 col-md-5">
                <InlineDropdownInput
                  id="marital-status"
                  field={props.form.$('marital_status')}
                  label="Marital Status:"
                />
              </div>
              <div className="col-sm-12 col-md-7">
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
                <input
                  type="file"
                  name="file"
                  id="certification-of-residency"
                  className="inputfile"
                  onChange={(e) => handleSingleUpload(e, props.form, 'certification_of_residency')}
                  accept="application/pdf"
                />
                <label htmlFor="certification-of-residency">
                  {props.form.$('certification_of_residency').label}
                </label>
              </div>
              <div className="attachment form-group">
                <label>Certification from Resident Owner (For House Helpers): </label>
                <input
                  type="file"
                  name="file"
                  id="certification-from-resident-owner"
                  className="inputfile"
                  onChange={(e) => handleSingleUpload(e, props.form, 'certification_from_resident_owner')}
                  accept="application/pdf"
                />
                <label htmlFor="certification-from-resident-owner">
                  {props.form.$('certification_from_resident_owner').label}
                </label>
              </div>
              <div className="attachment form-group">
                <label>Latest Proof of Billing: </label>
                <input
                  type="file"
                  name="file"
                  id="proof-of-billing"
                  className="inputfile"
                  onChange={(e) => handleSingleUpload(e, props.form, 'proof_of_billing')}
                  accept="application/pdf"
                />
                <label htmlFor="proof-of-billing">
                  {props.form.$('proof_of_billing').label}
                </label>
              </div>
              <div className="attachment form-group">
                <label>2 Valid ID with Address: </label>
                <input
                  type="file"
                  name="file"
                  id="valid-id"
                  className="inputfile"
                  onChange={(e) => handleDualUpload(e, props.form, 'valid_id')}
                  accept="image/*"
                  multiple
                />
                <label htmlFor="valid-id">
                  {props.form.$('valid_id').label}
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


function handleSingleUpload(e, form, fieldname) {
  if (e.target.files.length === 1) {
    const file = e.target.files[0];
    const blob = file.slice(0, -1, file.type);
    const renamedFile = new File([blob], `${fieldname}~${file.name}`, { type: file.type });
    form.$(fieldname).value = renamedFile;
    form.$(fieldname).set('label', file.name);
  } else {
    form.$(fieldname).value = null;
    form.$(fieldname).set('label', 'Browse');
  }
}

function handleDualUpload(e, form, fieldname) {
  if (e.target.files.length > 2) {
    alert('You cannot upload more than 2 valid IDs.');
    form.$(fieldname).value = null;
    form.$(fieldname).set('label', 'Browse');
  }
  else if (e.target.files.length === 2) {
    const files = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const blob = file.slice(0, -1, file.type);
      const renamedFile = new File([blob], `${fieldname}${i+1}~${file.name}`, { type: file.type });
      files.push(renamedFile);
    }
    form.$(fieldname).value = files;
    form.$(fieldname).set('label', '2 files selected');
  }
  else if (e.target.files.length === 1) {
    alert('You are required to attach 2 valid IDs.');
    form.$(fieldname).value = null;
    form.$(fieldname).set('label', 'Browse');
  }
  else {
    form.$(fieldname).value = null;
    form.$(fieldname).set('label', 'Browse');
  }
}

export default BarangayClearance;