import {makeAutoObservable} from "mobx";

export class TagStore {
    constructor() {
        this._tags = []
        this._limit = 5
        makeAutoObservable( this )
    }

    setTags(tags) {
        this._tags = tags
    }

    get tags() {
        return this._tags
    }

    get limit() {
        return this._limit
    }
}