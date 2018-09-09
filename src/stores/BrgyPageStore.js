import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getBarangayById,
    getBrgyPageSharedPosts,
    getBrgyPageFollowersList,
    getBrgyPageFollowingList,
    followBarangay,
    unfollowBarangay,
} from 'services/BrgyPageService';
import { unsharePost } from 'services/PostService';

export default class BrgyPageStore {
    @observable data;
    @observable viewType;
    @observable sharedPosts = [];
    @observable followersList = [];
    @observable followingList = [];
    @observable isModalOpen = false;
    @observable loading = true;

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
    async getBrgyPageSharedPosts(brgyId) {
        this.sharedPosts = [];
        this.loading = true;
        try {
            const response = await getBrgyPageSharedPosts(brgyId);
            const sharedPosts = response.data.data.items;

            setTimeout(() => {
                runInAction(() => {
                    this.sharedPosts = sharedPosts;
                    this.loading = false;
                });
            }, 1000);

        } catch (e) {
            runInAction(() => {
                this.sharedPosts = [];
                this.loading = false;
            });
        }
    }

    @action
    async getBrgyPageFollowersList(brgyId) {
        this.followersList = [];
        this.loading = true;

        try {
            const response = await getBrgyPageFollowersList(brgyId);
            const followersList = response.data.data.items;

            setTimeout(() => {
                runInAction(() => {
                    this.followersList = followersList;
                    this.loading = false;
                });
            }, 1000);

        } catch (e) {
            runInAction(() => {
                this.followersList = [];
                this.loading = false;
            });
        }
    }

    @action
    async getBrgyPageFollowingList(brgyId) {
        this.followingList = [];
        this.loading = true;
        try {
            const response = await getBrgyPageFollowingList(brgyId);
            const followingList = response.data.data.items;

            setTimeout(() => {
                runInAction(() => {
                    this.followingList = followingList;
                    this.loading = false;
                });
            }, 1000);

        } catch (e) {
            runInAction(() => {
                this.followingList = [];
                this.loading = false;
            });
        }
    }

    @action
    async unsharePost(postId, index) {
        try {
            const response = await unsharePost(postId);
            alert(response.data.data.message);

            runInAction(() => {
                this.loading = true;

                setTimeout(() => {
                    runInAction(() => {
                        this.loading = false;
                        this.sharedPosts.splice(index, 1);
                        this.data.stats.shared_posts_count -= 1;
                    });
                }, 1000);
            });
        } catch (e) {
            alert('An error occured. Please try again.')
        }
    }
}