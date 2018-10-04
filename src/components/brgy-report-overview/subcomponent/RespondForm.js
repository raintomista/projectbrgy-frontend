import axios from 'axios';
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import RootStore from 'stores/RootStore';
import API_HOST from '../../../config';

export default class RespondForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const fields = {
      inquiry_id: {
        rules: 'string'
      },
      message: {
        rules: 'required|between:1,800',
        placeholder: 'Write your detailed report here...',
        handlers: {
          onChange: (field) => (e) => {
            // Set field height to handle new line
            let element = e.target;
            if (element) {
              element.style.height = "100px";
              element.style.height = (element.scrollHeight) + "px";
            }

            // Set field value
            field.set(element.value);
          }
        }
      },
      files: {
        value: []
      },
      uploadProgress: {
        value: -1,
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

  handlers() {
    return {
      onSubmit: (form) => (e) => {
        const textarea = e.target.getElementsByTagName('textarea')[0];

        e.preventDefault() // Prevent default form submission
        form.validate()
          .then((form) => this.onSuccess(form, textarea))
          .catch((form) => this.onError());
      }
    }
  }

  async onSuccess(form, textarea) {
    const {
      inquiry_id,
      message,
      files
    } = form.values();

    if (files.length <= 5) {
      const formData = this.createFormData(message, files);
      this.$('message').set('disabled', true);

      try {
        await this.respondToReport(inquiry_id, formData);
        setTimeout(async () => {
          await RootStore.ReportOverviewStore.getNewResponse(inquiry_id);
          alert('You have successfully responded to the report.');
          this.$('uploadProgress').set('value', -1); //Set upload progress to 100;
          this.$('message').set('disabled', false);
          this.$('message').set('value', '');
          textarea.style.height = "88px";
          this.$('files').set('value', []);
          RootStore.ReportOverviewStore.setLabel('Attach files here');
        }, 1000);
      } catch (err) {
        alert('An error occurred. Please try again.');
        this.$('uploadProgress').set('value', -1); //Set upload progress to 100;  
        this.$('message').set('disabled', false);
      }
    } else {
      alert('You cannot upload more than 5 attachments');
    }
  }

  onError(form) {
    alert('Please provide a response message.');
  }

  createFormData(message, files) {
    let formData = new FormData();
    formData.append('message', message);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }

    return formData;
  }

  respondToReport(inquiry_id, formData) {
    const token = localStorage.getItem('x-access-token');
    return axios({
      url: `${API_HOST}/inquiry/respond/${inquiry_id}`,
      method: 'post',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        this.$('uploadProgress').set('value', Math.round((progressEvent.loaded * 100) / progressEvent.total) * 0.65); //Update upload progress
      },
      onDownloadProgress: progressEvent => {
        this.$('uploadProgress').set('value', 100); //Set upload progress to 100;
      },
      data: formData
    });
  }
}