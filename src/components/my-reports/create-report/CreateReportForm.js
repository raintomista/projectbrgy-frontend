import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';
import RootStore from 'stores/RootStore';
import { createReport } from 'services/ReportService';

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

    return { fields };
  }

  plugins() {
    return { dvr: validatorjs };
  }

  hooks() {
    return {
      async onSuccess(form) {
        form.$('receiver_id').set('value', RootStore.AppData.loggedUser.barangay_page_id);
        let { report_type, committee_type, ...rest } = form.values();
        committee_type = report_type === 'General' ? null : committee_type.toLowerCase();
        report_type = report_type.toLowerCase();


        try {
          const response = await createReport(Object.assign(rest, { report_type, committee_type }));
          alert('You have successfully created a report');
          this.history.push('/dashboard/my-reports');
        } catch (e) {
          console.log(e)
        }
      },
      onError(form) {
        alert('Please fill in the required fields.');
      },
    }
  }
} 