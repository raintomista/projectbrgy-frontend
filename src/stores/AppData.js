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
        id: "9ea48bbc-d560-4894-8fda-daf35f1ee548",
        name: "Juan Dela Cruz",
        barangay: 'Barangay 113',
        municipality: "Caloocan City",
        role: "barangay_member"
    }

    @observable profileData;
    @observable profileViewType;

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

    @action
    setProfileView(type){
        this.profileViewType = type;
    }
}

export default new AppData();