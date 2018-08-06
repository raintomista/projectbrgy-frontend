import AppData from 'stores/AppData';
import BrgyPageStore from 'stores/BrgyPageStore';
import UserProfileStore from './UserProfileStore';
import DashboardStore from './DashboardStore';

class RootStore {
    constructor(){
        this.AppData = new AppData();
        this.BrgyPageStore = new BrgyPageStore();
        this.DashboardStore = new DashboardStore();
        this.UserProfileStore = new UserProfileStore();
    }
}

export default new RootStore();