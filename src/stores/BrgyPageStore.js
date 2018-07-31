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
    @observable isModalOpen = false;

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

    @action
    toggleModal(){
        this.isModalOpen = this.isModalOpen === false ? true : false;
    }
}