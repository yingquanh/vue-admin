import axios from '@/utils/axios'

// api地址
const api = {
    captcha: '/common/captcha',
}

/**
 * 登录校验码
 * @param {*} params 
 * @returns 
 */
export const checkCode = (params: any = {}) => {
    return new Promise((resolve: any, reject: any) => {
        axios.get(api.captcha, { params })
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}