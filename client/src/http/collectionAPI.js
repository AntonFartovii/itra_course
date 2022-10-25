
import {$authHost, $host} from "./index";


export const createCollection = async (collection) => {
    const {data} = await $authHost.post('api/collection/', collection)
    return data
}

export const fetchCollections = async (userId, limit) => {
    const {data} = await $host.get('api/collection/', {params: {
            userId, limit
        }})
    // console.log( 'collections: ', data )
    return data
}

export const fetchOneCollection = async (id) => {
    const {data} = await $host.get('api/collection/' + id)
    return data
}

export const deleteCollection = async (id) => {
    const {data} = await $authHost.delete('api/collection/' + id)
    return data
}

export const editCollection = async (collection) => {
    const {data} = await $authHost.put('api/collection/', collection)
    console.log(collection)
    return data
}