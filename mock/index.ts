import { MockMethod } from 'vite-plugin-mock'
import ExampleList from './data/example'

export default [
    {
        url: '/api/example/list',
        method: 'get',
        response: () => {
            return ExampleList
        }
    },
] as MockMethod[]