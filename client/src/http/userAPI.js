
import jwt_decode from "jwt-decode";
import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/auth/registration', {email, password, role: ['USER']})
    console.log(data)
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/auth/login', {email, password})
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}

export const check = async () => {
    const {data} = await $authHost.get('api/auth/check' )
    // data = {accessToken, refreshToken}
    localStorage.setItem('token', data.accessToken)
    const userData = jwt_decode(data.accessToken)
    return fetchUser( userData.id )
}

export const fetchUser = async ( id ) => {
    const {data} = await $authHost.get('api/user/' + id)
    // console.log( data )
    return data
}