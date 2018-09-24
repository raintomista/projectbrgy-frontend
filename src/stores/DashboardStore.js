import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import { getPostsFromFollowing, postAnnouncement } from 'services/DashboardService';
import { deletePost } from 'services/PostService';

configure({
    enforceActions: true
});

export default class DashboardStore {
    @observable hasMoreItems = true;
    @observable newsfeedPosts = [];
    @observable pageStart = 0;
    @observable previewImg = [];

    @action
    async deleteAPost(postId, index) {
        try {
            const response = await deletePost(postId);
            alert(response.data.data.message);

            runInAction(() => {
                this.reloadNewsfeed();
            });
        }
        catch (e) {
            alert('An error occured. Please try again.');
        }
    }

    @action
    async getNewsfeedPosts(page, limit) {
        try {
            const response = await getPostsFromFollowing(page, limit);
            const data = response.data.data.items;

            setTimeout(() => {
                runInAction(() => {
                    this.newsfeedPosts.push(...data);
                });
            }, 1000);
        }
        catch (e) {
            setTimeout(() => {
                runInAction(() => {
                    this.hasMoreItems = false;
                });
            }, 1000);
        }
    }

    @action
    reloadNewsfeed() {
        this.pageStart = this.pageStart === 0 ? -1 : 0;
        this.hasMoreItems = true;
        this.newsfeedPosts = [];
    }

    @action
    initNewsfeed() {
        this.hasMoreItems = true;
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
}