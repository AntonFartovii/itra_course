import {makeAutoObservable} from "mobx";

export class CollectionStore {
    constructor() {
        this._collections = []
        this._limit = 5
        this._totalCount = 0
        this._refresh = false
        makeAutoObservable( this )
    }

    setCollections(collections) {
        this._collections = collections
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    get collections() {
        return this._collections
    }

    get limit() {
        return this._limit
    }

    get totalCount() {
        return this._totalCount
    }
}