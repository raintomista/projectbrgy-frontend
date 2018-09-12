import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';

export default class BusinessPermit extends MobxReactForm {
    constructor(history) {
        super();
        this.history = history;
    }
    setup() {
        const fields = {
            barangay_id: {
                rules: 'required'
            },
            type_of_service: {
                rules: 'required',
                type: 'radio',
                value: 'New Business',
                handlers: {
                    onChange: (field) => (e) => {
                        field.set('value', e.target.value);
                    }
                }
            },
            name_of_owner: {
                rules: 'required|string',
            },
            address_of_owner: {
                rules: 'required|string',
            },
            name_of_business: {
                rules: 'required|string',
            },
            address_of_business: {
                rules: 'required|string',
            },
            cedula: {
                rules: 'string',
            },
            dti_business_registration: {
                rules: 'string',
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