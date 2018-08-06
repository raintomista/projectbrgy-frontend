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
    @observable hasMoreItems = true;
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
}