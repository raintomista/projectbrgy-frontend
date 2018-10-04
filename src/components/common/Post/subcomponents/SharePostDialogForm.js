import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import { sharePost } from 'services/PostService';

export default class SharePostDialogForm extends MobxReactForm {
  constructor(toggleModal, toggleLoader) {
    super();
    this.toggleModal = toggleModal; //Get toggle modal function from parent through initialization
    this.toggleLoader = toggleLoader;
  }
  setup() {
    const fields = {
      sharedPostId: {
        rules: 'required',
      },
      shareCaption: {
        rules: 'string',
        placeholder: 'Say something about this...',
        handlers: {
          onChange: (field) => (e) => {
            // Set field height to handle new line
            let element = e.target;
            if (element) {
              element.style.height = "28px";
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
        this.toggleLoader(); //show loader

        // Disable Form
        form.select('sharedPostId').set('disabled', true);
        form.select('shareCaption').set('disabled', true);

        let shareCaption = form.select('shareCaption').value;
        shareCaption = shareCaption.length < 1 ? null : shareCaption; //make sure that empty caption will be sent as null

        const sharedPostId = form.select('sharedPostId').value

        try {
          const response = await sharePost(sharedPostId, shareCaption);

          setTimeout(() => {
            alert(response.data.data.message);

            // Re-enable form
            form.select('sharedPostId').set('disabled', false);
            form.select('shareCaption').set('disabled', false);
            form.select('shareCaption').set('value', ''); //reset caption field

            this.toggleLoader(); //Hide loader          
            this.toggleModal(); //close modal
          }, 1000);
        }
        catch (error) {
          setTimeout(() => {
            alert('An error occured. Please try again');

            // Re-enable form
            form.select('sharedPostId').set('disabled', false);
            form.select('shareCaption').set('disabled', false);

            this.toggleLoader(); //Hide loader   
          }, 1000);
        }
      },
      onError(form) {
      }
    }
  }
}