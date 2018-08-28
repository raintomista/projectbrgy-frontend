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
    
    @action
    reloadNewsfeed() {
        this.pageStart = this.pageStart === 0 ? -1 : 0;
        this.hasMoreItems = true;
        this.newsfeedPosts = [];
    }

    @action
    async getNewsfeedPosts(page, limit) {
        try {
            const response = await getPostsFromFollowing(page, limit);
            const data = response.data.data.items;

            runInAction(() => {
                this.newsfeedPosts.push(...data);
            });
        }
        catch (e) {
            runInAction(() => {
                this.hasMoreItems = false;
            });
        }
    }

    @action
    async deleteAPost(postId, index) {
        try {
            const response = await deletePost(postId);
            runInAction(() => {
                this.loadedPosts.splice(index, 1);
                alert(response.data.data.message);      
            });
        }
        catch(e) {
            console.log(e);
        }
    }
}