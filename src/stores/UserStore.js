import {
    configure,
    decorate,
    observable
} from 'mobx';

configure({ enforceActions: true });

class UserStore {
    loggedUser = {
        id: "795d2bc8-96b9-402c-b09e-6ca791a14299",
        name: "Juan Dela Cruz",
        barangay: 'Barangay 113',
        municipality: "Caloocan City",
        role: "barangay_member"
    }


}

decorate(UserStore, {
    loggedUser: observable,
});

export default new UserStore();