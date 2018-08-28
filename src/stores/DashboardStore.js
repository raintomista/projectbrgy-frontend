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
    @observable loadedPosts = [];
    
    @action
    async getPostsFromFollowing(page, limit) {
        try {
            const response = await getPostsFromFollowing(page, limit);
            const data = response.data.data.items;

            runInAction(() => {
                this.loadedPosts.push(...data);
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