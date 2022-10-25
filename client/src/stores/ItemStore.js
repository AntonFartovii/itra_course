import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor() {
        this._items = []
        this._limit = 5
        this._totalCount = 0
        this._refresh = false
        makeAutoObservable( this )
    }

    setItems(items) {
        this._items = items
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setRefresh(bool) {
        this._refresh = bool
    }

    get items() {
        return this._items
    }

    get refresh() {
        return this._refresh
    }

    get limit() {
        return this._limit
    }

    get totalCount() {
        return this._totalCount
    }
}