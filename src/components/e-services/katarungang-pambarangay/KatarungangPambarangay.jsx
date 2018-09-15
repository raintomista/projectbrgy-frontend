import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import InlineInputField from 'components/common/InputField/InlineInputField';


const KatarungangPambarangay = observer((props) => {
  return (
    <React.Fragment>
      <h4 className="form-title">Katarungang Pambarangay Form</h4>
      <p className="form-instructions">Fill the form below.</p>
      <form onSubmit={props.form.onSubmit}>
        <div className="section row">
          <div className="katarungang-pambarangay-info col-md-12">
            <div className="fields">
              <InlineInputField
                id="name-of-complainant"
                field={props.form.$('name_of_complainant')}
                label="Name of Complainant (Your name): "
                type="text"
                required
              />
              <InlineInputField
                id="address-of-complainant"
                field={props.form.$('address_of_complainant')}
                label="Address of Complainant: "
                type="text"
                required
              />
              <InlineInputField
                id="name_of_offender"
                field={props.form.$('name_of_offender')}
                label="Name of Offender: "
                type="text"
                required
              />
              <InlineInputField
                id="address-of-offender"
                field={props.form.$('address_of_offender')}
                label="Address of Offender: "
                type="text"
                required
              />
              <InlineInputField
                id="allegations"
                field={props.form.$('allegations')}
                label="Allegation/s: "
                type="text"
                required
              />
              <InlineInputField
                id="date-of-incident"
                field={props.form.$('date_of_incident')}
                label="Date of Incident: "
                type="text"
                maxLength={10}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="incident-report section col-md-12">
            <label className="heading">
              In less than 300 words, please state the details of the incident.
              <br />
              (note: Please use the language widely-used in your barangay: i.e. Filipino, English, Waray, etc.)
            </label>
            <textarea
              maxLength={300}
              className={props.form.errors().details_of_incident ? 'invalid' : ''}
              {...props.form.$('details_of_incident').bind()}
            >
            </textarea>
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

KatarungangPambarangay.propTypes = {
  form: PropTypes.object
}

export default KatarungangPambarangay;