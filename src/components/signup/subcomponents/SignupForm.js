import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import {
  createUser
} from 'services/SignupService';

export default class SignupForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const fields = {
      barangay_id: {
        rules: 'required|string'
      },
      first_name: {
        rules: 'required|string'
      },
      middle_name: {
        rules: 'string'
      },
      last_name: {
        rules: 'required|string'
      },
      email: {
        rules: 'required|email'
      },
      username: {
        rules: 'required|string'
      },
      password: {
        rules: 'required|string|min:8',
        placeholder: 'Must be at least 8 characters'
      },
      mobile_number: {
        rules: 'string',
      },
      landline_number: {
        rules: 'string'
      },
      role: {
        rules: 'string',
        value: 'barangay_member'
      },
      barangay_captain: {
        rules: 'string',
        disabled: true
      },
      barangay_address: {
        rules: 'string',
        disabled: true
      }
    }

    return {
      fields
    };
  }

  plugins() {
    return {
      dvr: validatorjs
    };
  }

  hooks() {
    return {
      async onSuccess(form) {
        const {
          barangay_captain,
          barangay_address,
          ...data
        } = form.values();
        try {
          await createUser(data);
          alert('You have successfully created an account. Please check your email in order to activate your account.')
          this.history.push('/login')
        } catch (e) {
          if(e.response.data.errors[0].code === 'INVALID_EMAIL') {
            alert('The provided email/username is already in use. Please provide another email/username.');
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      },
      onError(form) {
        alert('Please fill out the required fields.')
      }
    }
  }
}