import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

export default class BarangayClearanceForm extends MobxReactForm {
  setup() {
    const fields = {
      first_name: {
        rules: 'required',
      },
      middle_name: {
        rules: 'required',
      },
      last_name: {
        rules: 'required',
      },
      citizenship: {
        rules: 'required',
      },
      date_of_birth: {
        rules: ['required', 'regex:/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9][0-9]$/'],
        placeholder: 'mm/dd/yyyy'

      },
      place_of_birth: {
        rules: 'required',
      },
      address: {
        rules: 'required',
      },
      marital_status: {
        rules: 'required',
        value: 'Single',
        options: ['Single', 'Married', 'Annulled', 'Widowed']
      },
      residencyField: {
        rules: ['required', 'regex:/^[1-9]([0-9]+)?$/'],
      },
      residencyDropdown: {
        rules: 'required',
        value: 'months',
        options: ['month/s', 'year/s']
      },
      purpose: {
        rules: 'required',
        type: 'radio',
        value: 'Certification/Residency'
      },
      other_purpose: {
        rules: 'required_if:purpose,Others',
        handlers: {
          onBlur: (field) => (e) => field.validate()
        }
      }
    }

    return { fields };
  }

  plugins() {
    return { dvr: validatorjs };
  }

  hooks() {
    return {
      onSuccess(form) {
        const { other_purpose, purpose, residencyDropdown, residencyField, ...rest } = form.values();
        let months_of_residency = residencyDropdown === 'year/s' ? (parseInt(residencyField) * 12) : parseInt(residencyField);
        let _purpose = purpose === 'Others' ? other_purpose : purpose;


        const formValue = Object.assign(rest, { months_of_residency, purpose: _purpose });

        console.log(formValue);
      },
      onError(form) {
        console.log(form.errors())
      }
    }
  }
} 