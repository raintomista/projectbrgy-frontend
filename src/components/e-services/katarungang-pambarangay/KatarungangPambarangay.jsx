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
                label="Name of Complainant: "
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
                id="name-of-assailant"
                field={props.form.$('name_of_assailant')}
                label="Name of Assailant: "
                type="text"
                required
              />
              <InlineInputField
                id="address-of-assailant"
                field={props.form.$('address_of_assailant')}
                label="Address of Assailant: "
                type="text"
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="incident-report section col-md-12">
            <label className="heading">In less than 300 words, please report the details of the incidient.</label>
            <textarea></textarea>
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