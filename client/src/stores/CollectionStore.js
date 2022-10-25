import {makeAutoObservable} from "mobx";

export class CollectionStore {
    constructor() {
        this._collections = []
        this._limit = 5
        this._totalCount = 0
        this._refresh = false
        this._name = ''
        this._description = ''
        this._theme = ''
        this._collection = {}
        makeAutoObservable(this)
    }

    setName(name) {
        this._name = name
    }

    setDescription(description) {
        this._description = description
    }

    setTheme(theme) {
        this._theme = theme
    }

    setCollections(collections) {
        this._collections = collections
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setRefresh(bool) {
        this._refresh = bool
    }

    setCollection(collection) {
        this._collection = collection
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

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get theme() {
        return this._theme
    }

    get collection() {
        return this._collection
    }

    get refresh() {
        return this._refresh
    }
}