import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._isBan = false
        this._user = {}
        this._isAuthor = false
        makeAutoObservable( this )
    }

    setIsAuthor(bool) {
        this._isAuthor = bool
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setIsBan(bool) {
        this._isBan = bool
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get isBan() {
        return this._isBan
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }

    get isAuthor() {
        return this._isAuthor
    }
}