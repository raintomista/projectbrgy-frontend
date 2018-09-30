import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
// import {
//     resetPassword
// } from 'services/SignupService';
export default class ResetForm extends MobxReactForm {
    setup() {
        const fields = {
            message: {
                rules: 'required|string',
                placeholder: 'Type a message'
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
                console.log(form.values())
            },
            onError(form) {

            }
        }
    }
}