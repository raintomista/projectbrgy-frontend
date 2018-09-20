import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import moment from 'moment';

import {
    requestBusinessPermit
} from 'services/EServices';


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
                rules: 'required',
                value: null,
                label: 'Browse'
            },
            dti_business_registration: {
                rules: 'required',
                value: null,
                label: 'Browse',
            },
            pickup_date: {
                rules: ['required', 'date'],
                placeholder: 'mm/dd/yyyy'
            },
            pickup_time: {
                rules: ['required', 'regex:/(([8-9]|([1][0-1]))am)|((12)(pm|nn))|([1-5]pm)/'],
                placeholder: 'e.g. 12nn'
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
                    pickup_date,
                    pickup_time,
                    ...rest
                } = form.values();

                const pickup = moment(`${pickup_date} ${pickup_time}`, 'MM/DD/YYYY hha').format('YYYY-MM-DD HH:mm:ss');
                const formatted_pickup = moment(`${pickup_date} ${pickup_time}`, 'MM/DD/YYYY hha').format('MMMM DD, YYYY hh:mm a');
                const formData = this.createFormData({
                    pickup,
                    ...rest
                })

                try {
                    await requestBusinessPermit(this, formData);
                    setTimeout(() => {
                        this.reset();
                        this.history.push({
                            pathname: '/e-services/business-permit',
                            search: '?confirmed',
                            state: {
                                fee: '₱100.00',
                                pickup: formatted_pickup
                            }
                        });
                        this.$('uploadProgress').set('value', -1); //Hide progress bar;
                        this.$('cedula').set('label', 'Browse'); //Hide progress bar;
                        this.$('dti_business_registration').set('label', 'Browse'); //Hide progress bar;
                    }, 2000);
                } catch (e) {
                    alert('An error occurred. Please try again later.')
                }
            },
            onError(form) {
                alert('All fields are required.')
            },
        }
    }

    createFormData(data) {
        const formData = new FormData();
        formData.append('barangay_id', data.barangay_id);
        formData.append('type_of_service', data.type_of_service);
        formData.append('name_of_owner', data.name_of_owner);
        formData.append('address_of_owner', data.address_of_owner);
        formData.append('name_of_business', data.name_of_business);
        formData.append('address_of_business', data.address_of_business);
        formData.append('pickup', data.pickup);
        formData.append('files', data.cedula, data.cedula.name);
        formData.append('files', data.dti_business_registration, data.dti_business_registration.name);

        return formData;
    }
}