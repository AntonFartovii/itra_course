
import jwt_decode from "jwt-decode";
import {$authHost, $host} from "./index";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/auth/registration', {email, password, role: 'ADMIN'})
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
    localStorage.setItem('token', data.accessToken)
    return jwt_decode(data.accessToken)
}