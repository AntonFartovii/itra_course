
import {$authHost, $host} from "./index";

export const createLike = async ( content ) => {
    const {data} = await $authHost.post('api/like/', content)
    return data
}

export const fetchLikes = async ( userId, itemId ) => {
    const {data} = await $host.get('api/like/', {params: {
            userId, itemId
        }})
    return data
}

export const fetchOneLike = async ( id ) => {
    const {data} = await $host.get('api/like/' + id)
    return data
}


export const deleteLike = async (id) => {
    const {data} = await $authHost.delete('api/like/' + id)
    return data
}
