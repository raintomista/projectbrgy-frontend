import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';
import {
    getBarangayById,
    getUserById,
    getUserFollowingList
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
    @observable profileFollowingList = [];

    @action
    async fetchUserProfileData(id) {
        this.profileData = null; //reset data for every request
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

    @action
    async fetchUserFollowingList(userId) {
        try {
            const response = await getUserFollowingList(userId);
            const profileFollowingList = response.data.data.items;

            runInAction(() => {
                this.profileFollowingList = profileFollowingList;
            })

        } catch (e) {
            console.log(e);
        }
    }

    /*----------------- Page Data -----------------*/
    @observable pageData;
    @observable pageViewType;

    @action
    async fetchBrgyPageData(id) {
        this.pageData = null; //reset data for every request

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