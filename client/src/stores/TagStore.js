import {makeAutoObservable} from "mobx";

export class TagStore {
    constructor() {
        this._tags = []
        this._tag = {}
        this._limit = 5
        makeAutoObservable( this )
    }

    setTags(tags) {
        this._tags = tags
    }

    setTag(tag) {
        this._tag = tag
    }

    get tags() {
        return this._tags
    }

    get tag() {
        return this._tag
    }

    get limit() {
        return this._limit
    }
}