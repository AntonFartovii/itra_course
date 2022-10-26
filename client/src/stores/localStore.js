import {makeAutoObservable} from "mobx";
import localStorageKeys from "../constants/localStorageKeys";

export default class LocalStore{
    constructor() {
        this._localization = ''
        makeAutoObservable( this )
    }

    setLocalization(value) {
        this._localization = value
        localStorage.setItem(localStorageKeys.LOCALIZATION, value);
    }


    get localization() {
        return this._localization
    }

}