import AppData from 'stores/AppData';
import BrgyPageStore from 'stores/BrgyPageStore';

class RootStore {
    constructor(){
        this.AppData = new AppData();
        this.BrgyPageStore = new BrgyPageStore();
    }
}

export default new RootStore();