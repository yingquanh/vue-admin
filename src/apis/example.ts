import axios from "@/utils/axios";

// api地址
const api = {
    list: 'http://localhost:5173/api/example/list',
}

/**
 * 示例列表
 * @param params {*}
 * @returns 
 */
export const list = (params: any = {}) => {
    return new Promise((resolve, reject) => {
        axios.get(api.list, { params })
            .then((response: any) => resolve(response))
            .catch((error: any) => reject(error))
    })
}