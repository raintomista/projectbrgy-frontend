import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';

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
            name_of_assailant: {
                rules: 'required',
            },
            address_of_assailant: {
                rules: 'required',
            },
            allegations: {
                rules: 'required',
            },
            date_of_incident: {
                rules: 'required',
            },
            incident_report: {
                rules: 'required'
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

            },
            onError(form) {
                console.log(form.errors())
            },
        }
    }
}