import {makeAutoObservable} from "mobx";

export default class ItemStore{
    constructor() {
        this._items = []
        this._item = {}
        this._comments = []
        this._limit = 5
        this._totalCount = 0
        this._refresh = false
        makeAutoObservable( this, {})
    }

    setItems(items) {
        this._items = items
    }

    setComments(comments) {
        this._comments = comments
    }


    setItem(item) {
        this._item = item
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


    get item() {
        return this._item
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

    get comments() {
        return this._comments
    }
}