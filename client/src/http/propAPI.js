
import {$authHost, $host} from "./index";

export const createProp = async ( content ) => {
    const {data} = await $authHost.post('api/prop/', content)
    return data
}

export const fetchProps = async ( name, collectionId ) => {
    const {data} = await $host.get('api/prop/', {params: {
            name, collectionId
        }})
    return data
}

export const fetchOneProp = async ( id ) => {
    const {data} = await $host.get('api/prop/' + id)
    return data
}


export const deleteProp = async (id) => {
    const {data} = await $authHost.delete('api/prop/' + id)
    return data
}
