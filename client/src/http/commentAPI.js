
import {$authHost, $host} from "./index";

export const createComment = async (comment) => {
    const {data} = await $authHost.post('api/comment', comment)
    return data
}

export const fetchComments = async (userId, itemId, limit) => {
    const {data} = await $host.get('api/comment', {params: {
            userId, itemId, limit
        }})
    return data
}

export const fetchOneComment = async (id) => {
    const {data} = await $host.get('api/comment/' + id)
    return data
}


export const deleteComment = async (id) => {
    const {data} = await $authHost.delete('api/comment/' + id)
    return data
}

