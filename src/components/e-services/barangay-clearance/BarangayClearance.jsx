import React from 'react';
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
          <div className="col-md-7">
            <InlineInputField
              id="first-name"
              field={props.form.$('first_name')}
              label="First Name:"
              type="text"
              required
            />
          </div>
          <div className="col-md-5">
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
          <div className="col-md-6">
            <InlineInputField
              id="last-name"
              field={props.form.$('last_name')}
              label="Last Name:"
              type="text"
              required
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <InlineInputField
              id="date-of-birth"
              field={props.form.$('date_of_birth')}
              label="Date of Birth:"
              maxLength={10}
              type="text"
              required
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-12">
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
          <div className="col-md-5">
            <InlineDropdownInput
              id="marital-status"
              field={props.form.$('marital_status')}
              label="Marital Status:"
            />
          </div>
          <div className="col-md-7">
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

        <div className="row">
          <div className="col-md-12">
            <label className="purpose-of-clearance">Purpose of Clearance</label>
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

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
});

export default BarangayClearance;