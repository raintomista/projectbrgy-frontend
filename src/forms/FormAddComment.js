/*--------------- Utils ---------------*/
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import RootStore from 'stores/RootStore';

const plugins = { dvr: validatorjs };

const fields = {
    post_id: {
        rules: 'required',
    },
    message: {
        rules: 'required|string',
        placeholder: 'Write a comment...'
    }
};

const hooks = {
    onSuccess(form) {
        console.log(form.values());
        // const { message } = form.values();

        alert('Your announcement has been posted.');


        // Clear form if success
        form.clear();
    },
    onError(form) {
        alert('An error occurred. Please try again.');
    }
}
export default new MobxReactForm({ fields }, { plugins, hooks })