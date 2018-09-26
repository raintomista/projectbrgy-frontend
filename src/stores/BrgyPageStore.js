import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getBarangayById,
    getBrgyPagePosts,
    getBrgyPageSharedPosts,
    getBrgyPageFollowersList,
    getBrgyPageFollowingList,
    followBarangay,
    unfollowBarangay,
} from 'services/BrgyPageService';
import {
    deletePost,
    unsharePost
} from 'services/PostService';

export default class BrgyPageStore {
    @observable data;
    @observable viewType;
    @observable pageStart = 0;
    @observable limit = 15;
    @observable hasMore = true;
    @observable posts = [];

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
            alert('An error occured. Please try again.')
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
            alert('An error occured. Please try again.')
        }
    }

    /*----- Follow/Unfollow in Barangay Page List -----*/
    @action
    async followBarangayFromList(loggedUserRole, loggedUserBrgyId, brgyId, index) {
        try {
            await followBarangay(brgyId);
            runInAction(() => {
                this.followingList[index].is_following = 1;
                if (loggedUserRole === 'barangay_page_admin' && loggedUserBrgyId === this.data.id) {
                    this.data.stats.following_count += 1;
                }
            });

        } catch (e) {
            alert('An error occured. Please try again.')
        }
    }

    @action
    async unfollowBarangayFromList(loggedUserRole, loggedUserBrgyId, brgyId, index) {
        try {
            await unfollowBarangay(brgyId);

            runInAction(() => {
                this.followingList[index].is_following = 0;
                if (loggedUserRole === 'barangay_page_admin' && loggedUserBrgyId === this.data.id) {
                    this.data.stats.following_count -= 1;
                }
            });

        } catch (e) {
            alert('An error occured. Please try again.')
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
    initBarangayPagePosts() {
        this.hasMore = true;
        this.posts = [];
    }

    @action
    async getBarangayPagePosts(brgyId, page) {
        try {
            const response = await getBrgyPagePosts(brgyId, page, this.limit, 'desc');
            let posts = [];
            if (page === 1) {
                posts = response.data.data.items;
            } else {
                posts = this.posts.slice();
                posts.push(...response.data.data.items);
            }

            setTimeout(() => {
                runInAction(() => {
                    this.posts = posts;
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
    async deleteBarangayPagePosts(postId, index) {
        try {
            const response = await deletePost(postId);
            alert(response.data.data.message);

            runInAction(() => {
                this.posts.splice(index, 1);
                this.data.stats.posts_count -= 1;
            });
        } catch (e) {
            alert('An error occured. Please try again.')
        }
    }

    @action
    initBarangayPageSharedPosts() {
        this.hasMore = true;
        this.sharedPosts = [];
    }

    @action
    async getBrgyPageSharedPosts(brgyId, page) {
        try {
            const response = await getBrgyPageSharedPosts(brgyId, page, this.limit, 'desc');
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
                    this.data.stats.shared_posts_count = response.data.data.total;
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

    @action
    initBarangayPageFollowers() {
        this.hasMore = true;
        this.followersList = [];
    }

    @action
    async getBrgyPageFollowersList(brgyId, page) {
        try {
            const response = await getBrgyPageFollowersList(brgyId, page, this.limit, 'asc');
            let followersList = [];
            if (page === 1) {
                followersList = response.data.data.items;
            } else {
                followersList = this.followersList.slice();
                followersList.push(...response.data.data.items);
            }

            setTimeout(() => {
                runInAction(() => {
                    this.followersList = followersList;
                    this.data.stats.followers_count = response.data.data.total;
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
    initBarangayPageFollowing() {
        this.hasMore = true;
        this.followingList = [];
    }

    @action
    async getBrgyPageFollowingList(brgyId, page) {
        try {
            const response = await getBrgyPageFollowingList(brgyId, page, this.limit, 'asc');
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
                    this.data.stats.following_count = response.data.data.total;
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
}