import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';

import { requestBarangayClearance } from 'services/EServices';


export default class BarangayClearanceForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const request_date = moment().format('MM/DD/YYYY');

    const fields = {
      barangay_id: {
        rules: 'required'
      },
      first_name: {
        rules: 'required',
      },
      middle_name: {
        rules: 'required',
      },
      last_name: {
        rules: 'required',
      },
      citizenship: {
        rules: 'required',
      },
      date_of_birth: {
        rules: ['required', 'regex:/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9][0-9]$/'],
        placeholder: 'mm/dd/yyyy'

      },
      place_of_birth: {
        rules: 'required',
      },
      address: {
        rules: 'required',
      },
      marital_status: {
        rules: 'required',
        value: 'Single',
        options: ['Single', 'Married', 'Annulled', 'Widowed']
      },
      residencyField: {
        rules: ['required', 'regex:/^[1-9]([0-9]+)?$/'],
      },
      residencyDropdown: {
        rules: 'required',
        value: 'months',
        options: ['month/s', 'year/s']
      },
      purpose: {
        rules: 'required',
        type: 'radio',
        value: 'Certification/Residency',
        handlers: {
          onChange: (field) => (e) => {
            field.set('value', e.target.value);
            this.validate();

            if (e.target.value === 'Others') {
              if (this.$('other_purpose').value.length === 0) {
                this.$('other_purpose').invalidate('This field is required');
              }
            }
          }
        }
      },
      other_purpose: {
        rules: 'required_if:purpose,Others',
      },
      certification_of_residency: {
        rules: 'string',
        value: 'http://b2p.surge.sh/'
      },
      certification_from_resident_owner: {
        rules: 'string',
        value: 'http://b2p.surge.sh/'
      },
      proof_of_billing: {
        rules: 'string',
        value: 'http://b2p.surge.sh/'
      },
      valid_id1: {
        rules: 'string',
        value: 'http://b2p.surge.sh/'
      },
      valid_id2: {
        rules: 'string',
        value: 'http://b2p.surge.sh/'
      },
      pickup_date: {
        rules: ['required', 'date'],
        placeholder: 'mm/dd/yyyy'
      },
      pickup_time: {
        rules: ['required', 'regex:/(([8-9]|([1][0-1]))am)|((12)(pm|nn))|([1-5]pm)/'],
        placeholder: 'e.g. 12nn'
      },
    }

    return { fields };
  }

  plugins() {
    return { dvr: validatorjs };
  }

  hooks() {
    return {
      async onSuccess(form) {
        let { date_of_birth, pickup_date, pickup_time, other_purpose, purpose, residencyDropdown, residencyField, ...rest } = form.values();
        let months_of_residency = residencyDropdown === 'year/s' ? (parseInt(residencyField) * 12) : parseInt(residencyField);
        let _purpose = purpose === 'Others' ? other_purpose : purpose;
        date_of_birth = moment(date_of_birth).format('YYYY/MM/DD');

        const formValue = Object.assign(rest, { date_of_birth, months_of_residency, purpose: _purpose });

        try {
          console.log(`${pickup_date} ${pickup_time}`)          
          let datetime = moment(`${pickup_date} ${pickup_time}`, 'MM/DD/YYYY hha')
            .format('MMMM DD, YYYY hh:mm a')

          const response = await requestBarangayClearance(formValue);
          this.history.push({
            pathname: '/e-services/barangay-clearance',
            search: '?confirmed',
            state: { fee: '₱100.00', datetime: datetime }
          });
        } catch (e) {
          console.log(e.response);
        }
      },
      onError(form) {
        console.log(form.errors())
      },
    }
  }
} 