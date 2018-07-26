import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';
import {
    getUserById
} from 'services/ProfileService';

configure({
    enforceActions: true
});

class AppData {
    @observable loggedUser = {
        id: "795d2bc8-96b9-402c-b09e-6ca791a14299",
        name: "Juan Dela Cruz",
        barangay: 'Barangay 113',
        municipality: "Caloocan City",
        role: "barangay_member"
    }

    @observable profileData;

    @action
    async fetchProfileData(id) {
        try {
            const response = await getUserById(id);
            const profileData = response.data.data;

            runInAction(() => {
                profileData.landline_number = '1324242'
                this.profileData = profileData;
            });
        } catch (e) {
            console.log(e);
        }
    }

}

export default new AppData();