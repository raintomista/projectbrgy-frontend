import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getBarangayById,
    getBrgyPageFollowersList,
    getBrgyPageFollowingList,
    followBarangay,
    unfollowBarangay,
} from 'services/BrgyPageService';

export default class BrgyPageStore {
    @observable data;
    @observable viewType;
    @observable followersList = [];
    @observable followingList = [];
    @observable isModalOpen = false;

    @action
    async fetchBrgyPageData(id) {
        this.data = null; //reset data for every request

        try {
            const response = await getBarangayById(id);
            const data = response.data.data;
            data.barangay_clearance = 1;
            data.business_permit = 1;
            data.katarungang_pambarangay = 1;

            runInAction(() => {
                this.data = data;
            });
        } catch (e) {
            console.log(e);
        }
    }

    @action
    async followBarangay(brgyId) {
        try {
            await followBarangay(brgyId);

            runInAction(() => {
                this.data.is_following = true;
                this.data.stats.followers_count += 1;
            });

        } catch (e) {
            console.log(e);
        }
    }

    @action
    async unfollowBarangay(brgyId) {
        try {
            await unfollowBarangay(brgyId);

            runInAction(() => {
                this.data.is_following = false;
                this.data.stats.followers_count -= 1;
            });

        } catch (e) {
            console.log(e);
        }
    }

    /*----- Follow/Unfollow in Barangay Page List -----*/
    @action
    async followBarangayFromList(brgyId, index) {
        try {
            await followBarangay(brgyId);

            runInAction(() => {
                this.followingList[0].is_following = 1;
            });

        } catch (e) {
            console.log(e);
        }
    }

    @action
    async unfollowBarangayFromList(brgyId, index) {
        try {
            await unfollowBarangay(brgyId);

            runInAction(() => {
                this.followingList[index].is_following = 0;
            });

        } catch (e) {
            console.log(e);
        }
    }

    @action
    toggleModal() {
        this.isModalOpen = this.isModalOpen === false ? true : false;
    }

    @action
    setViewType(type) {
        this.viewType = type;
    }

    @action
    async getBrgyPageFollowersList(brgyId) {
        try {
            const response = await getBrgyPageFollowersList(brgyId);
            const followersList = response.data.data.items;

            runInAction(() => {
                this.followersList = followersList;
            })

        } catch (e) {
            console.log(e);
        }
    }

    @action
    async getBrgyPageFollowingList(brgyId) {
        try {
            const response = await getBrgyPageFollowingList(brgyId);
            const followingList = response.data.data.items;

            runInAction(() => {
                this.followingList = followingList;
            })

        } catch (e) {
            console.log(e);
        }
    }


}