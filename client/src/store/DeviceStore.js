import {makeAutoObservable} from "mobx";

export default class DeviceStore{
    constructor() {
        this._types = [
            {id: 1, name: 'Refregirator'},
            {id: 2, name: 'Smartphone'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'}
        ]
        this._devices = [
            {id: 1, name: 'Iphonr 12', price: 123132, rating: 5, img: ''},
            {id: 2, name: 'Iphonr 13', price: 1231332, rating: 6, img: ''},
            {id: 3, name: 'Iphonr 14', price: 12313332, rating: 7, img: ''},
            {id: 4, name: 'Iphonr 15', price: 123132333, rating: 8, img: ''}
        ]
        makeAutoObservable( this )
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
}