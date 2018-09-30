import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import {
  resetPassword
} from 'services/SignupService';
export default class ResetForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const fields = {
      verify_code: {
        rules: 'string'
      },
      new_password: {
        rules: 'required|string|min:8|confirmed',
        placeholder: 'Must be at least 8 characters'
      },
      new_password_confirmation: {
        rules: 'required|string|min:8',
        placeholder: 'Must be at least 8 characters'
      },
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
        this.$('new_password').set('disabled', true);
        this.$('new_password_confirmation').set('disabled', true);
        const {
          verify_code,
          new_password
        } = form.values();
        try {
          const response = await resetPassword(verify_code, new_password);
          alert(response.data.data.message);
          this.$('new_password').set('disabled', false);
          this.$('new_password_confirmation').set('disabled', false);
          this.history.push('/login');
        } catch (e) {
          const error = e.response.data.errors[0];
          if (error.code === 'RNE' || error.code === 'VER_FAIL') {
            alert('The token provided is invalid or has already expired.')
            this.$('new_password').set('disabled', false);
            this.$('new_password_confirmation').set('disabled', false);
          }
        }
      },
      onError(form) {
        const {
          new_password,
          new_password_confirmation
        } = form.errors();
        if (new_password === 'The  must be at least 8 characters.' || new_password_confirmation === 'The  must be at least 8 characters.') {
          alert('The new password must be at least 8 characters');
        } else if (new_password === 'The  field is required.' || new_password_confirmation === 'The  field is required.') {
          alert('All fields are required.');
        } else {
          alert('The confirmation password does not match.');
        }
      }
    }
  }
}