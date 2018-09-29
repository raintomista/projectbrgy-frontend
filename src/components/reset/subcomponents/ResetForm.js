import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

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
        console.log(form.values())
      },
      onError(form) {
        console.log(form.errors())
      }
    }
  }
}