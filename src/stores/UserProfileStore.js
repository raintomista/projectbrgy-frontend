import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import { followBarangay, unfollowBarangay } from 'services/BrgyPageService';
import { unsharePost } from 'services/PostService';
import { getUserById, getUserFollowingList, getUserSharedPosts } from 'services/UserProfileService';

configure({
    enforceActions: true
});

export default class UserProfileStore {
    @observable data;
    @observable sharedPosts = [];
    @observable viewType;
    @observable followingList = [];
    @observable loading = true;

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
        this.loading = true;
        try {
            const response = await getUserFollowingList(userId);
            const followingList = response.data.data.items;

            setTimeout(() => {
                runInAction(() => {
                    this.followingList = followingList;
                    this.loading = false;
                });
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    @action
    async fetchUserSharedPosts(userId) {
        try {
            const response = await getUserSharedPosts(userId);
            const sharedPosts = response.data.data.items;

            runInAction(() => {
                this.sharedPosts = sharedPosts;
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

    @action
    async unsharePost(postId, index) {
        try {
            const response = await unsharePost(postId);

            runInAction(() => {
                this.sharedPosts.splice(index, 1);
                this.data.stats.shared_posts_count -= 1;
                alert(response.data.data.message);
            });
        } catch (e) {
            alert('An error occured. Please try again.')
        }
    }
}