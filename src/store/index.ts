import { defineStore } from 'pinia'
import { useAuthPreferencesStore } from './auth-preferences'
import { useAuthEmailStore } from './auth-email'
import vuexStore from '@/store' // 逐步转换，见 fullUserDetails

interface State {
  firstName: string
  lastName: string
  userId: number | null
}

export const useAuthUserStore = defineStore('auth/user', {
  // 转换为函数
  state: (): State => ({
    firstName: '',
    lastName: '',
    userId: null
  }),
  getters: {
    // 不在需要 firstName getter，移除
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // 由于使用了 `this`，必须定义一个返回类型
    fullUserDetails (state): FullUserDetails {
      // 导入其他 store
      const authPreferencesStore = useAuthPreferencesStore()
      const authEmailStore = useAuthEmailStore()
      return {
        ...state,
        // `this` 上的其他 getter
        fullName: this.fullName,
        ...authPreferencesStore.$state,
        ...authEmailStore.details
      }

      // 如果其他模块仍在 Vuex 中，可替代为
      // return {
      //   ...state,
      //   fullName: this.fullName,
      //   ...vuexStore.state.auth.preferences,
      //   ...vuexStore.getters['auth/email'].details
      // }
    }
  },
  actions: {
    //没有作为第一个参数的上下文，用 `this` 代替
    async loadUser (id: number) {
      if (this.userId !== null) throw new Error('Already logged in')
      const res = await api.user.load(id)
      this.updateUser(res)
    },
    // mutation 现在可以成为 action 了，不再用 `state` 作为第一个参数，而是用 `this`。
    updateUser (payload) {
      this.firstName = payload.firstName
      this.lastName = payload.lastName
      this.userId = payload.userId
    },
    // easily reset state using `$reset`
    clearUser () {
      this.$reset()
    }
  }
})