import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import {
  loginUser
} from 'services/SignupService';

export default class LoginForm extends MobxReactForm {
  constructor(history, location) {
    super();
    this.history = history;
    this.location = location;
  }
  setup() {
    const fields = {
      email: {
        rules: 'string'
      },
      password: {
        rules: 'string',
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
        const {
          email,
          password
        } = form.values();
        try {
          const response = await loginUser(email, password);
          localStorage.setItem('x-access-token', response.data.data.token);
          setTimeout(() => {
            if (response.data.data.role === 'superadmin') {
              const { from } = this.location.state || { from: { pathname: '/superadmin' } }
              this.history.push(from);
            } else {
              const { from } = this.location.state || { from: { pathname: '/dashboard' } }
              this.history.push(from);
            }
          }, 100);
        } catch (e) {
          const error = e.response.data.errors[0];
          if (error.code === 'INC_DATA' || (error.code === 'LOG_FAIL' && error.context === 'Invalid Email')) {
            alert('The email you’ve entered doesn’t match any account.')
          } else if (error.code === 'LOG_FAIL' && error.context === 'Incorrect Password') {
            alert('The password you’ve entered is incorrect.');
          } else if (error.code === 'INVALID_ACTION') {
            alert('Please check your email to activate your account.');
          } else {
            alert('An error occurred. Please try again.');
          }
        }
      },
    }
  }
}