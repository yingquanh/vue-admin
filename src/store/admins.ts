import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { message as $message } from "ant-design-vue";
import * as AuthServerAPis from "@/apis/auth";

interface State {
    adminName: string
}

/**
 * Auth Admin Store
 */
export const useAuthAdminStore = defineStore('auth_admin', {
    state: (): State => ({
        adminName: 'administrator',
    }),
    getters: {

    },
    actions: {
        // 登出系统
        adminLogoutSystem: () => {
            const router = useRouter();
            AuthServerAPis.logout({}).then((res: any) => {
                const { errcode, errmsg } = res.data;
                if (!errcode) {
                    // 清理数据
                    localStorage.clear();

                    // 跳转至登录页面
                    router.replace({name: 'Login'});
                } else {
                    // 渲染失败提示
                    $message.warning(errmsg)
                }
            }).catch((err: any) => {
                // 渲染错误提示
                $message.error(`未知错误: ${err.message}`)
            })
        }
    }
})