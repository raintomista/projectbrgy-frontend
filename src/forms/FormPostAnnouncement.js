/*--------------- Utils ---------------*/
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';


const plugins = { dvr: validatorjs };

const fields = {
    message: {
        rules: 'required|string|between:1,150'
    }
};

const hooks = {
    onSuccess(form) {
        
    },
    onError(form) {

    }
}

export default new MobxReactForm({ fields }, { plugins, hooks })