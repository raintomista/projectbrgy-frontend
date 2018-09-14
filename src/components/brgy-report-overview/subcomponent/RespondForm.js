import validatorjs from 'validatorjs';
import API_HOST from '../../../config';
import MobxReactForm from 'mobx-react-form';
import axios from 'axios';

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
        placeholder: 'Write your detailed report here...'
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

  hooks() {
    return {
      async onSuccess(form) {
        const {
          inquiry_id,
          message,
          files
        } = form.values();

        if (files.length <= 5) {
          const formData = this.createFormData(message, files);
          try {
            await this.respondToReport(inquiry_id, formData);
            setTimeout(() => {
              alert('You have successfully responded to the report.');
              this.$('uploadProgress').set('value', -1); //Set upload progress to 100;          
            }, 1000);
          } catch (err) {
            console.log(err.response);
            alert('An error occurred. Please try again.');
            this.$('uploadProgress').set('value', -1); //Set upload progress to 100;                      
          }
        } else {
          alert('You cannot upload more than 5 attachments');
        }
      },
      onError(form) {
        alert('Please provide a response message.');
      },
    }
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