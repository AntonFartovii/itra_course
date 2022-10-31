import {makeAutoObservable} from "mobx";

export class AdminStore {
    constructor() {
        this._users = []
        this._limit = 15
        makeAutoObservable( this )
    }

    setUsers(tags) {
        this._tags = tags
    }

    get users() {
        return this._users
    }

    get limit() {
        return this._limit
    }
}