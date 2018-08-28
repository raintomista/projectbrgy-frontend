import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

export default class PostBoxForm extends MobxReactForm {
  constructor() {
    super();
  }
  setup() {
    const fields = {
      message: {
        rules: 'required|string|between:1,150',
        placeholder: 'Post an announcement...',
        handlers: {
          onChange: (field) => (e) => {
            // Set field height to handle new line
            let element = e.target;
            if (element) {
              element.style.height = "88px";
              element.style.height = (element.scrollHeight) + "px";
            }

            // Set field value
            field.set(element.value);
          },
        },
      }
    }

    return { fields };
  }

  plugins() {
    return { dvr: validatorjs };
  }

  hooks() {
    return {
      async onSuccess(form) {

      },
      onError(form) {
        console.log(form.errors())
      }
    }
  }
}