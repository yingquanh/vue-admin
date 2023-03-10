import axios from "@/utils/axios";

// api地址
const api = {
    list: '/account/list',
    info: '/account/info',
    create: '/account/create',
    update: '/account/update',
    delete: '/account/delete',
    recover: '/account/recover',
    forbidden: '/account/forbidden',
}

/**
 * 查询账号列表
 * @param params {*}
 * @returns 
 */
export const list = (params: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(api.list, { params })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 查询账号信息
 * @param params {*}
 * @returns 
 */
export const info = (params: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(api.info, { params })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 新建账号
 * @param data {*}
 * @returns 
 */
export const create = (data: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(api.create, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 更新账号
 * @param data {*}
 * @returns 
 */
export const update = (data: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(api.update, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 删除账号
 * @param data {*}
 * @returns 
 */
export const remove = (data: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.delete(api.delete, { data })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 恢复账号
 * @param data {*}
 * @returns 
 */
export const recover = (data: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(api.recover, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}

/**
 * 禁用账号
 * @param data {*}
 * @returns 
 */
export const forbidden = (data: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(api.forbidden, data)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}