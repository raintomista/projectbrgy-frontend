import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getPostsFromFollowing
} from 'services/DashboardService';
import {
    deletePost
} from 'services/PostService';

configure({
    enforceActions: true
});

export default class DashboardStore {
    @observable hasMore = true;
    @observable limit = 15;
    @observable newsfeedPosts = [];
    @observable pageStart = 0;
    @observable previewImg = [];
    @observable previewFile = null;
    @observable isFileUploadOpen = false;

    @action
    async deleteAPost(postId, index) {
        try {
            const response = await deletePost(postId);
            alert(response.data.data.message);

            runInAction(() => {
                this.reloadNewsfeed();
            });
        } catch (e) {
            alert('An error occured. Please try again.');
        }
    }

    @action
    async getNewsfeedPosts(page) {
        try {
            const response = await getPostsFromFollowing(page, this.limit, 'desc');
            let newsfeedPosts = [];
            if (page === 1) {
                newsfeedPosts = response.data.data.items;
            } else {
                newsfeedPosts = this.newsfeedPosts.slice();
                newsfeedPosts.push(...response.data.data.items);
            }

            if (response.data.data.items.length === 0) {
                runInAction(() => {
                    this.hasMore = false;
                });
            }

            runInAction(() => {
                this.newsfeedPosts = newsfeedPosts;
            });

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
    reloadNewsfeed() {
        this.pageStart = this.pageStart === 0 ? -1 : 0;
        this.hasMore = true;
        this.newsfeedPosts = [];
    }

    @action
    initNewsfeed() {
        this.hasMore = true;
        this.newsfeedPosts = [];
        this.pageStart = 0;
    }

    @action
    setPreviewImg(previewImg) {
        this.previewImg = previewImg;
    }

    @action
    removeSelectedImg(img, index) {
        this.previewImg.splice(index, 1);
    }

    @action
    setPreviewFile(previewFile) {
        this.previewFile = previewFile;
    }

    @action
    removePreviewFile() {
        this.previewFile = null;
    }
}