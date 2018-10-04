import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    followBarangay,
    unfollowBarangay
} from 'services/BrgyPageService';
import {
    unsharePost
} from 'services/PostService';
import {
    getUserById,
    getUserFollowingList,
    getUserSharedPosts
} from 'services/UserProfileService';

configure({
    enforceActions: true
});

export default class UserProfileStore {
    @observable data;
    @observable viewType;
    @observable pageStart = 0;
    @observable limit = 15;
    @observable hasMore = true;
    @observable sharedPosts = [];
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
    initFollowingList() {
        this.hasMore = true;
        this.followingList = [];
    }

    @action
    async getUserFollowingList(userId, page) {
        try {
            const response = await getUserFollowingList(userId, page, this.limit, 'desc');
            let followingList = [];
            if (page === 1) {
                followingList = response.data.data.items;
            } else {
                followingList = this.followingList.slice();
                followingList.push(...response.data.data.items);
            }

            setTimeout(() => {
                runInAction(() => {
                    this.followingList = followingList;
                    this.data.stats.posts_count = response.data.data.total;
                });
            }, 1000);

        } catch (e) {
            if (e.response.data.errors[0].code === 'ZERO_RES') {
                runInAction(() => {
                    this.hasMore = false;
                });
            } else {
                alert('An error occured. Please try again.')
            }
        }
    }

    @action
    initSharedPosts() {
        this.hasMore = true;
        this.sharedPosts = [];
    }

    @action
    async getUserSharedPosts(userId, page) {
        try {
            const response = await getUserSharedPosts(userId, page, this.limit, 'desc');
            let sharedPosts = [];
            if (page === 1) {
                sharedPosts = response.data.data.items;
            } else {
                sharedPosts = this.sharedPosts.slice();
                sharedPosts.push(...response.data.data.items);
            }

            setTimeout(() => {
                runInAction(() => {
                    this.sharedPosts = sharedPosts;
                    this.data.stats.posts_count = response.data.data.total;
                });
            }, 1000);

        } catch (e) {
            if (e.response.data.errors[0].code === 'ZERO_RES') {
                runInAction(() => {
                    this.hasMore = false;
                });
            } else {
                alert('An error occured. Please try again.')
            }
        }
    }

    @action
    async followBarangay(brgyId, index) {
        try {
            await followBarangay(brgyId);

            runInAction(() => {
                this.followingList[index].is_following = 1;
                this.data.stats.following_count += 1;
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
                this.data.stats.following_count -= 1;
            });

        } catch (e) {
            console.log(e);
        }
    }

    @action
    async unsharePost(postId, index) {
        try {
            await unsharePost(postId);

            runInAction(() => {
                this.sharedPosts.splice(index, 1);
                this.data.stats.shared_posts_count -= 1;
                alert('You have successfully deleted a post.');
            });
        } catch (e) {
            alert('An error occured. Please try again.')
        }
    }
}