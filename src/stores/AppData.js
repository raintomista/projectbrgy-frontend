import {
    action,
    configure,
    observable,
    runInAction
} from 'mobx';

import {
    getUserDetailsViaToken
} from 'services/DashboardService';

configure({
    enforceActions: true
});

export default class AppData {
    @observable loggedUser = null;

    /*--------------- Get User Details Using Token ---------------*/
    @action
    async getUserDetails() {
        try {
            const response = await getUserDetailsViaToken();
            const loggedUser = response.data.data;

            runInAction(() => {
                this.loggedUser = loggedUser;
            });
        } catch (e) {
            if(e.response.data.errors[0].code === 'UNAUTH') {
                alert('Your session has expired. Please login again.');
                // Add navigation here
            }
        }
    }

    /*--------------- Sidebar ---------------*/
    @observable isSidebarOpen = false;

    @action
    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }
}