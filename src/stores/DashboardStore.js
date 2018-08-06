import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import { postAnnouncement } from 'services/DashboardService';

configure({
    enforceActions: true
});

export default class DashboardStore {
    @action
    async postAnnouncement(message) {        
        try {
            const response = await postAnnouncement(message);
            const data = response.data.data;
        }
        catch(e) {
            console.log(e);
        }
    }
}