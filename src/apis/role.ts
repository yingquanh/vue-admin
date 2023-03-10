import axios from "@/utils/axios";

// api地址
const api = {
    list: '/role/list',
    info: '/role/info',
    create: '/role/create',
    update: '/role/update',
    delete: '/role/delete',
}

/**
 * 查询角色列表
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
 * 查询角色信息
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
 * 新建角色
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
 * 更新角色
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
 * 删除角色
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