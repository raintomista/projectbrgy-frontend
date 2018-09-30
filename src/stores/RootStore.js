import AppData from 'stores/AppData';
import BrgyPageStore from 'stores/BrgyPageStore';
import DashboardStore from './DashboardStore';
import MessagingStore from './MessagingStore';
import ReportOverviewStore from './ReportOverviewStore';
import UserProfileStore from './UserProfileStore';

class RootStore {
    constructor() {
        this.AppData = new AppData();
        this.BrgyPageStore = new BrgyPageStore();
        this.DashboardStore = new DashboardStore();
        this.MessagingStore = new MessagingStore();        
        this.ReportOverviewStore = new ReportOverviewStore();
        this.UserProfileStore = new UserProfileStore();
    }
}

export default new RootStore();