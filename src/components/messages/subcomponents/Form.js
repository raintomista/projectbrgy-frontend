import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import RootStore from 'stores/RootStore';
import {
  sendMessage
} from 'services/MessagingService';
export default class ResetForm extends MobxReactForm {
  setup() {
    const fields = {
      message: {
        rules: 'required|string',
        placeholder: 'Type a message'
      },
      receiver_id: {
        rules: 'string'
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
          message,
          receiver_id
        } = form.values();

        try {
          const response = await sendMessage(message, receiver_id);
          RootStore.MessagingStore.sendMessage(response.data.data);
          this.handleSendMessage(response.data.data)
        } catch (e) {
          console.log(e.response)
        }
      },
      onError(form) {
        console.log(form.errors())
      }
    }
  }

  handleSubmit(e, handleSendMessage) {
    this.onSubmit(e);
    this.handleSendMessage = handleSendMessage;
  }
}