import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';
import {
  requestKatarungan
} from 'services/EServices';


export default class KatarungangPambarangay extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const fields = {
      barangay_id: {
        rules: 'required'
      },
      name_of_complainant: {
        rules: 'required',
      },
      address_of_complainant: {
        rules: 'required',
      },
      name_of_offender: {
        rules: 'required',
      },
      address_of_offender: {
        rules: 'required',
      },
      allegations: {
        rules: 'required',
      },
      date_of_incident: {
        rules: ['required', 'regex:/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9][0-9]$/'],
        placeholder: 'mm/dd/yyyy'
      },
      details_of_incident: {
        rules: 'required'
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
        let {
          date_of_incident,
          ...rest
        } = form.values();
        date_of_incident = moment(date_of_incident).format('YYYY/MM/DD');

        const formValues = {
          date_of_incident,
          ...rest
        };

        try {
          await requestKatarungan(formValues);
          this.history.push({
            pathname: '/e-services/katarungang-pambarangay',
            search: '?confirmed'
          });
        } catch (e) {
          alert('An error occurred. Please try again later.')
        }
      },
      onError(form) {
        alert('All fields are required.')
        console.log(form.errors())
      },
    }
  }
}