
import {$authHost, $host} from "./index";

function createFormData( collection ) {
    let formData = new FormData()
    formData.append('name', collection.name)
    formData.append('theme', collection.theme)
    formData.append('img', collection.file)
    formData.append('description', collection.description)
    formData.append('userId', collection.userId)
    return formData
}

export const createCollection = async (collection) => {

    const formData = createFormData( collection )

    const {data} = await $authHost.post('api/collection/', formData)
    return data
}

export const editCollection = async (collection) => {

    const formData = createFormData( collection )
    formData.append('id', collection.id)
    formData.append('prevImg', collection.prevImg)
    formData.append('newImg', collection.newImg)
    const {data} = await $authHost.put('api/collection/', formData)

    return data
}



export const fetchCollections = async (userId, limit) => {
    const {data} = await $host.get('api/collection/', {params: {
            userId, limit
        }})
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

