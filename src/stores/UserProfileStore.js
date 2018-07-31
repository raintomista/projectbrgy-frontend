import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import { followBarangay, unfollowBarangay } from 'services/BrgyPageService';
import { getUserById, getUserFollowingList } from 'services/UserProfileService';

configure({
    enforceActions: true
});

export default class UserProfileStore {
    @observable data;
    @observable viewType;
    @observable followingList = [];
    
    @action
    async fetchUserProfileData(id) {
        this.data = null; //reset data for every request
        try {
            const response = await getUserById(id);
            const data = response.data.data;
    
            runInAction(() => {
                this.data = data;
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    @action
    setProfileView(type) {
        this.viewType = type;
    }
    
    @action
    async fetchUserFollowingList(userId) {
        try {
            const response = await getUserFollowingList(userId);
            const followingList = response.data.data.items;
    
            runInAction(() => {
                this.followingList = followingList;
            })
    
        } catch (e) {
            console.log(e);
        }
    }

    @action
    async followBarangay(brgyId, index) {
        try {
            await followBarangay(brgyId);
            
            runInAction(() => {
                this.followingList[index].is_following = 1;
            });

        } catch (e) {
            console.log(e);
        }
    }

    @action
    async unfollowBarangay(brgyId, index) {
        try {
            await unfollowBarangay(brgyId);

            runInAction(() => {
                this.followingList[index].is_following = 0;
            });

        } catch (e) {
            console.log(e);
        }
    }
}