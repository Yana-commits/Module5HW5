import {
    action, makeAutoObservable,
    makeObservable,
    observable,
    runInAction,
} from "mobx";
import {IUser} from "../../interfaces/users";
import * as userApi from "../../api/modules/users";
import AuthStore from "../../stores/AuthStore";


class RegisterStore {

    private authStore: AuthStore;

    email = '';
    password = '';           
    error = '';
    isLoading = false;

    constructor(authStore: AuthStore) {
        this.authStore = authStore;
        makeAutoObservable(this);
    }

    changeData(email: string, password: string) {
        this.email = email;
        this.password = password;
        if (!!this.error) {
            this.error = '';
        }
    }

    changeEmail(email: string) {
        this.email = email;
    }

    changePassword(password: string) {
        this.password = password;
    }

    async register() {
        try {
            this.isLoading = true;
            await this.authStore.register(this.email, this.password);
        }
        catch (e) {
            if (e instanceof Error) {
                this.error = e.message;
            }
        }
        this.isLoading = false;
    }
}

export default RegisterStore;