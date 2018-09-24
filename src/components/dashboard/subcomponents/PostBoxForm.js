import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';

import { postAnnouncement } from 'services/DashboardService';

export default class PostBoxForm extends MobxReactForm {
  constructor(DashboardStore) {
    super();
    this.DashboardStore = DashboardStore;
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
          }
        }
      },
      files: {
        value: []
      }
    }

    return { fields };
  }

  handlers() {
    return {
      onSubmit: (form) => (e) => {
        const element = e.target.getElementsByTagName('textarea')[0];        
        e.preventDefault()  // Prevent default form submission
        form.validate().then((form) => this.onSuccess(form, element))
      }
    }
  }

  plugins() {
    return { dvr: validatorjs };
  }
  
  async onSuccess(form, element) {
    const formData = this.createFormData(form.values());

    // Disable Form
    form.select('message').set('disabled', true);
    form.select('files').set('disabled', true);    

    try {
      await postAnnouncement(formData);
      alert('Successfully posted an announcement');

      // Re-enable and reset form
      form.select('message').set('disabled', false);
      form.select('files').set('disabled', false);
      form.clear();

      // Reload newsfeeds
      this.DashboardStore.reloadNewsfeed();
      this.DashboardStore.setPreviewImg([]);
      this.DashboardStore.removePreviewFile();
      element.style.height = "88px";
    }
    catch (err) {
      alert('An error occured. Please try again.');

      // Re-enable form          
      form.select('message').set('disabled', false);
    }
  }

  createFormData(data) {
    const formData = new FormData;
    formData.append('message', data.message);

    for(let i = 0; i < data.files.length; i++) {
      formData.append('files', data.files[i], data.files[i].name);
    }
    return formData;
  }
}