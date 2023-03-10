import axios from '@/utils/axios';

// api地址
const api = {
    login: '/auth/login',
    logout: '/auth/logout',
}

/**
 * 登录系统
 * @param {*} data 
 * @param {*} headers 
 * @returns 
 */
export const login = (data: any, headers: any = {}) => {
    return new Promise((resolve: any, reject: any) => {
        axios.post(api.login, data, { headers })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 登出系统
 * @param {*} data 
 * @returns 
 */
export const logout = (data: any) => {
    return new Promise((resolve: any, reject: any) => {
        axios.post(api.logout, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}