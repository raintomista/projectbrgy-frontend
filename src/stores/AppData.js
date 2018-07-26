import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';
import {
    getBarangayById,
    getUserById
} from 'services/ProfileService';

configure({
    enforceActions: true
});

class AppData {
    @observable loggedUser = {
        id: "cbba552f-4f64-43c7-885a-138a76a34497",
        name: "Juan Dela Cruz",
        barangay: 'Barangay 113',
        municipality: "Caloocan City",
        role: "barangay_member"
    }


    /*----------------- Profile Data -----------------*/
    @observable profileData;
    @observable profileViewType;

    @action
    async fetchUserProfileData(id) {
        try {
            const response = await getUserById(id);
            const profileData = response.data.data;

            runInAction(() => {
                this.profileData = profileData;
            });
        } catch (e) {
            console.log(e);
        }
    }

    @action
    setProfileView(type) {
        this.profileViewType = type;
    }

    /*----------------- Page Data -----------------*/
    @observable pageData;
    @observable pageViewType;

    @action
    async fetchBrgyPageData(id) {
        try {
            const response = await getBarangayById(id);
            const pageData = response.data.data;
            runInAction(() => {
                this.pageData = pageData;
            });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AppData();