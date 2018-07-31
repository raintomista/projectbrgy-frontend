import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

import { getBarangayById, followBarangay, unfollowBarangay } from 'services/BrgyPageService';

export default class BrgyPageStore {
    constructor() { }

    @observable data;
    @observable viewType;

    @action
    async fetchBrgyPageData(id) {
        this.data = null; //reset data for every request

        try {
            const response = await getBarangayById(id);
            const data = response.data.data;

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
            });

        } catch (e) {
            console.log(e);
        }
    }
}