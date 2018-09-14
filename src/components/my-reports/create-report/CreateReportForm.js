import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';
import RootStore from 'stores/RootStore';
import {
  createReport
} from 'services/ReportService';

export default class CreateReportForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
    this.$('committee_type').set('disabled', true);
  }
  setup() {
    const request_date = moment().format('MM/DD/YYYY');

    const fields = {
      receiver_id: {
        rules: 'string'
      },
      report_type: {
        rules: 'required',
        value: 'General',
        options: ['General', 'Committee'],
        handlers: {
          onChange: (field) => (value) => {
            const bool = value === 'Committee' ? false : true;
            this.$('committee_type').set('disabled', bool);
            field.set('value', value)
          }
        }
      },
      committee_type: {
        rules: 'required_if:report_type,Committee',
        value: 'Complaint',
        options: ['Complaint', 'Inquiry', 'Feedback']
      },
      message: {
        rules: 'required|between:1,150',
        placeholder: 'Write your detailed report here...'
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
        form.$('receiver_id').set('value', RootStore.AppData.loggedUser.barangay_page_id);
        let {
          message,
          receiver_id,
          report_type,
          committee_type,
        } = form.values();
        committee_type = report_type === 'General' ? null : committee_type.toLowerCase();
        report_type = report_type.toLowerCase();
        let files = []

        const prompt = window.confirm("Are you sure you want to submit this report?");
        if (prompt === true) {
          try {
            let formData = new FormData();
            formData.set('message', message);
            formData.set('receiver_id', receiver_id);
            formData.set('report_type', report_type);
            formData.set('committee_type', committee_type);
            formData.set('files', files);
            

            const response = await createReport(formData);
            alert('You have successfully created a report');
            this.history.push('/dashboard/my-reports');
          } catch (e) {
            console.log(e.response)
          }
        }
      },
      onError(form) {
        alert('Please fill in the required fields.');
      },
    }
  }
}