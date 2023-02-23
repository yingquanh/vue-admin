<template>
    <div class="admins-menu-wrapper">
        <a-dropdown overlayClassName="admins-dropdown-menu-overlay" :trigger="['click', 'hover']">
            <span>
                <div class="menu-dropdown-avatar">
                    <a-avatar :size="24">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                </div>
                <div class="menu-dropdown-username">
                    <span class="username">{{ username }}</span>
                    <DownOutlined />
                </div>
            </span>
            <template #overlay>
                <a-menu @click="onClick">
                    <a-menu-item key="profile">
                        <FormOutlined />&nbsp;&nbsp;资料设置
                    </a-menu-item>
                    <a-menu-item key="password">
                        <SafetyOutlined />&nbsp;&nbsp;修改密码
                    </a-menu-item>
                    <a-menu-item key="logger">
                        <UserOutlined />&nbsp;&nbsp;登录记录
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="logout">
                        <LogoutOutlined />&nbsp;&nbsp;退出系统
                    </a-menu-item>
                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script lang="ts">
import { Modal as $modal, MenuProps } from 'ant-design-vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthAdminStore } from '@/store/admins';
import * as AuthServiceAPis from '@/apis/auth';
export default defineComponent({
    name: 'HeaderDropdown',
    setup() {
        const router = useRouter();
        const store = useAuthAdminStore();
        const state = reactive({
            username: store.adminName,
        });

        // 下拉菜单点击事件
        const onClick: MenuProps['onClick'] = ({ key }) => {
            switch (key) {
                case 'profile':
                    // 资料设置
                    router.push({path: '/'});
                    break;
                case 'password':
                    // 修改密码
                    router.push({path: '/profile'});
                    break;
                case 'logger':
                    // 登录记录
                    router.push({ path: '/' });
                    break;
                case "logout":
                    // 登出系统
                    $modal.confirm({
                        title: '操作确认',
                        content: '确定要退出当前账号?',
                        onOk: () => {
                            // onloadAdminLogout();
                            store.adminLogoutSystem();
                        }
                    });
                    break;
            }
        }


        // 登出系统
        /* const onloadAdminLogout = () => {
            AuthServiceAPis.logout({}).then((res: any) => {
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
            }).catch(err => {
                // 渲染错误提示
                $message.error(`未知错误: ${err.message}`)
            })
        } */

        return {
            ...toRefs(state),
            onClick,
        }
    }
})
</script>

<style lang="less" scoped>
.admins-menu-wrapper {
    float: right;
    width: 124px;
    font-size: 16px;
    color: #f2f2f2;

    .menu-dropdown-avatar {
        float: left;
        width: 32px;
        text-align: center;

        .ant-avatar {
            color: #40a9ff;
            background: #fff;
        }
    }

    .menu-dropdown-username {
        padding-left: 32px;
        text-align: right;
        font-size: 12px;

        .anticon-down {
            padding-left: 2px;
            font-size: 12px;
        }
    }
}
</style>