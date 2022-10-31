
import {$authHost, $host} from "./index";

export const createProp = async ( content ) => {
    const {data} = await $authHost.post('api/prop/entity/', content)
    return data
}

export const fetchProps = async ( collectionId, itemId) => {
    const {data} = await $host.get('api/prop/entity/', {params: {
            collectionId, itemId
        }})
    return data
}

export const createPropValue = async ( propValue ) => {
    const {data} = await $authHost.post('api/prop/value/', propValue)
    return data
}

export const fetchOneProp = async ( id ) => {
    const {data} = await $host.get('api/prop/entity/' + id)
    return data
}

export const deleteProp = async (id) => {
    const {data} = await $authHost.delete('api/prop/entity/' + id)
    return data
}
