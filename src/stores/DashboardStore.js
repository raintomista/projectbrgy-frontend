import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import { getPostsFromFollowing, postAnnouncement } from 'services/DashboardService';

configure({
    enforceActions: true
});

export default class DashboardStore {
    @observable currentPage = 1;
    @observable loadedPosts = [];

    @action
    async postAnnouncement(message) {
        try {
            const response = await postAnnouncement(message);
            const data = response.data.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    @action
    async getPostsFromFollowing(limit) {
        try {
            const response = await getPostsFromFollowing(this.currentPage, limit);
            const data = response.data.data.items;
            runInAction(() => {
                this.loadedPosts = this.loadedPosts.concat(data);
                this.currentPage += 1;
            });
        }
        catch (e) {

        }
    }
}