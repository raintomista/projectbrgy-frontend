import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import {
  forgotPassword
} from 'services/SignupService';

export default class ResetForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const fields = {
      email: {
        rules: 'required|email'
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
        this.$('email').set('disabled', true);
        const {
          email
        } = form.values();
        try {
          await forgotPassword(email);
          alert('Please check your email for further instructions in order to reset your password.')
          this.$('email').set('disabled', false);
          this.history.push('/login');
        } catch (e) {
          alert('An error occurred. Please try again');
          this.$('email').set('disabled', false);
        }
      },
      onError(form) {
        alert('You must provide an email address connected to your account.')
      }
    }
  }
}