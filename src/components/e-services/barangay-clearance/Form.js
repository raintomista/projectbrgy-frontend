import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

export default class BarangayClearanceForm extends MobxReactForm {
  setup() {
    const fields = {
      firstName: {
        rules: 'required',
      },
      middleName: {
        rules: 'required',
      },
      lastName: {
        rules: 'required',
      },
      citizenship: {
        rules: 'required',
      },
      dateOfBirth: {
        rules: ['required', 'regex:/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9][0-9]$/'],
        placeholder: 'mm/dd/yyyy'

      },
      placeOfBirth: {
        rules: 'required',
      },
      address: {
        rules: 'required',
      },
      maritalStatus: {
        rules: 'required',
        value: 'Single',
        options: ['Single', 'Married', 'Annulled', 'Widowed']
      },
      residencyField: {
        rules: 'required|numeric',
      },
      residencyDropdown: {
        rules: 'required',
        value: 'months',
        options: ['month/s', 'year/s']
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
        console.log(form.values())
      },
      onError(form) {
        console.log(form.errors())
      }
    }
  }
} 