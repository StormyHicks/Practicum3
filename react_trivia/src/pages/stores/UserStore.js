import {action, makeObservable, observable} from 'mobx';

/**
 * UserStore
 */
class UserStore{    
    loading = false;
    isLoggedIn = false;
    isAdmin = false;
    username = '';
    userId = 0;


    constructor() {
        makeObservable(this, {
            
            loading: observable,
            isLoggedIn: observable,
            isAdmin: observable,
            username: observable,
            userId: observable,
            resetUser: action
        })
    }

    resetUser = () => {
        this.isLoggedIn = false;
        this.isAdmin = false;
        this.username = '';
        this.userId = 0;
        sessionStorage.clear();
    }
}

export const userStore = new UserStore();