
import {$authHost, $host} from "./index";

export const createItem = async (item) => {
    const {data} = await $authHost.post('api/item/', item)
    return data
}

export const fetchItems = async (userId, collectionId, limit, sort = "") => {
    const {data} = await $host.get('api/item/', {params: {
            userId, collectionId, limit, sort
        }})
    return data
}

export const itemAddTag = async (itemId, tagName) => {
    const {data} = await $host.post('api/item/tag', {itemId, tagName})
    return data
}

export const fetchOneItem = async (id) => {
    try {
        const {data} = await $host.get('api/item/' + id)
        return data
    } catch (e) {
        console.log( e )
        return e
    }
}

export const editItem = async ( item ) => {
    const {data} = await $authHost.put('api/item/', item)
    return data
}

export const deleteItem = async (id) => {
    const {data} = await $authHost.delete('api/item/' + id)
    return data
}
