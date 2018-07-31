import {
    action,
    computed,
    configure,
    observable,
    runInAction
} from 'mobx';

configure({
    enforceActions: true
});


export default class AppData {
    @observable loggedUser = {
        id: "cbba552f-4f64-43c7-885a-138a76a34497",
        name: "Juan Dela Cruz",
        barangay: 'Barangay 113',
        municipality: "Caloocan City",
        role: "barangay_member"
    }
}