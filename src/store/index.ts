import { defineStore } from 'pinia'

interface State {
    token: string,
    isLogin: boolean,
}

export const useStore = defineStore('main', {
    state: (): State => ({
        token: '',
        isLogin: false,
    }),
    getters: {
        accessToken: (state) => state.token || localStorage.getItem('token'),
        isLogged: (state) => state.isLogin,
    },
    actions: {
        setAccessToken(token: string) {
            this.token = token;
            this.isLogin = true;

            // 本地存储
            localStorage.setItem('token', token);
        }
    }
})
