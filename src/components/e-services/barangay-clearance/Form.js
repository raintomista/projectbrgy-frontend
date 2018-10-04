import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';

import {
  requestBarangayClearance
} from 'services/EServices';


export default class BarangayClearanceForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }
  setup() {
    const fields = {
      barangay_id: {
        rules: 'required'
      },
      first_name: {
        rules: 'required',
        value: ''
      },
      middle_name: {
        rules: 'required',
        value: ''
      },
      last_name: {
        rules: 'required',
        value: ''
      },
      citizenship: {
        rules: 'required',
        value: ''
      },
      date_of_birth: {
        rules: ['required', 'regex:/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9][0-9]$/'],
        placeholder: 'mm/dd/yyyy',
        value: ''
      },
      place_of_birth: {
        rules: 'required',
        value: ''
      },
      address: {
        rules: 'required',
        value: ''
      },
      marital_status: {
        rules: 'required',
        value: 'Single',
        options: ['Single', 'Married', 'Annulled', 'Widowed']
      },
      residencyField: {
        rules: ['required', 'regex:/^[1-9]([0-9]+)?$/'],
        value: ''
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
        rules: 'required',
        value: null,
        label: 'Browse'
      },
      certification_from_resident_owner: {
        rules: 'required',
        value: null,
        label: 'Browse'
      },
      proof_of_billing: {
        rules: 'required',
        value: null,
        label: 'Browse'
      },
      valid_id: {
        rules: 'required',
        value: null,
        label: 'Browse'
      },
      pickup_date: {
        rules: ['required', 'date'],
        placeholder: 'mm/dd/yyyy',
        value: ''
      },
      pickup_time: {
        rules: ['required', 'regex:/(([8-9]|([1][0-1]))am)|((12)(pm|nn))|([1-5]pm)/'],
        placeholder: 'e.g. 12nn',
        value: ''
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
          date_of_birth,
          other_purpose,
          purpose,
          residencyDropdown,
          residencyField,
          pickup_date,
          pickup_time,
          ...rest
        } = form.values();

        // Compute months of residency
        let months_of_residency = parseInt(residencyField, 10);
        if (residencyDropdown === 'year/s') {
          months_of_residency *= 12;
        }

        // Set specified purpose when selecting others
        if (purpose === 'Others') {
          purpose = other_purpose;
        }

        // Format date of birth to mysql format
        date_of_birth = moment(date_of_birth).format('YYYY/MM/DD');

        // Format pickup datetime to mysql format
        let pickup = moment(`${pickup_date} ${pickup_time}`, 'MM/DD/YYYY hha').format('YYYY-MM-DD HH:mm:ss');
        const formData = this.createFormData({
          ...rest,
          date_of_birth,
          months_of_residency,
          pickup,
          purpose
        });

        const formatted_pickup = moment(`${pickup_date} ${pickup_time}`, 'MM/DD/YYYY hha')
          .format('MMMM DD, YYYY hh:mm a');

        try {
          await requestBarangayClearance(form, formData);
          setTimeout(() => {
            this.reset();
            this.history.push({
              pathname: '/e-services/barangay-clearance',
              search: '?confirmed',
              state: {
                fee: '₱100.00',
                pickup: formatted_pickup
              }
            });
            this.$('uploadProgress').set('value', -1); //Hide progress bar;
            this.$('certification_of_residency').set('label', 'Browse');
            this.$('certification_from_resident_owner').set('label', 'Browse');
            this.$('proof_of_billing').set('label', 'Browse');
            this.$('valid_id').set('label', 'Browse');
          }, 2000);
        } catch (e) {
          console.log(e.response);
        }
      },
      onError(form) {
        console.log(form.errors())
      },
    }
  }

  createFormData(data) {
    const formData = new FormData();
    formData.append('barangay_id', data.barangay_id);
    formData.append('first_name', data.first_name);
    formData.append('middle_name', data.middle_name);
    formData.append('last_name', data.last_name);
    formData.append('address', data.address);
    formData.append('months_of_residency', data.months_of_residency);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('place_of_birth', data.place_of_birth);
    formData.append('citizenship', data.citizenship);
    formData.append('marital_status', data.marital_status);
    formData.append('purpose', data.purpose);
    formData.append('pickup', data.pickup);
    formData.append('files', data.certification_of_residency, data.certification_of_residency.name);
    formData.append('files', data.certification_from_resident_owner, data.certification_from_resident_owner.name);
    formData.append('files', data.proof_of_billing, data.proof_of_billing.name);
    for (let i = 0; i < 2; i++) {
      formData.append('files', data.valid_id[i], data.valid_id[i].name);
    }
    return formData;
  }
}