import AppData from 'stores/AppData';
import BrgyPageStore from 'stores/BrgyPageStore';
import UserProfileStore from './UserProfileStore';

class RootStore {
    constructor(){
        this.AppData = new AppData();
        this.BrgyPageStore = new BrgyPageStore();
        this.UserProfileStore = new UserProfileStore();
    }
}

export default new RootStore();