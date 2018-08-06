/*--------------- Utils ---------------*/
import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import RootStore from 'stores/RootStore';

const plugins = { dvr: validatorjs };

const fields = {
    message: {
        rules: 'required|string|between:1,150'
    }
};

const hooks = {
    onSuccess(form) {
        const { message } = form.values();

        alert('Your announcement has been posted.');
        RootStore.DashboardStore.postAnnouncement(message);

        // Clear form if success
        form.clear();
    },
    onError(form) {
        alert('An error occurred. Please try again.');
    }
}

export default new MobxReactForm({ fields }, { plugins, hooks })