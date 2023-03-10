<template>
    <a-layout class="layout-wrapper">
        <!-- Layout Header -->
        <a-layout-header>
            <div class="logo" @click="() => {$router.push({name: 'Dashboard'})}">
                <img src="@/assets/logo.png" />
                <h1>上海检察院学习平台</h1>
            </div>

            <!-- <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys1" :style="{ lineHeight: '64px' }">
                <a-menu-item key="1">nav 1</a-menu-item>
                <a-menu-item key="2">nav 2</a-menu-item>
                <a-menu-item key="3">nav 3</a-menu-item>
            </a-menu> -->

            <header-dropdown></header-dropdown>
        </a-layout-header>
        <!-- Layout Header -->

        <a-layout has-sider>
            <!-- Layout Sider -->
            <a-layout-sider theme="light" width="200">
                <a-menu 
                    v-model:openKeys="openKeys"
                    v-model:selectedKeys="selectedKeys" 
                    theme="light" 
                    mode="inline"
                >
                    <a-menu-item key="Example">
                        <router-link :to="{name: 'Example'}">
                            <SolutionOutlined />
                            示例
                        </router-link>
                    </a-menu-item>
                    <a-sub-menu key="Settings">
                        <template #title>
                            <span>
                                <SettingOutlined />
                                系统设置
                            </span>
                        </template>
                        <a-menu-item key="Role">
                            <router-link :to="{name: 'Role'}">角色管理</router-link>
                        </a-menu-item>
                        <a-menu-item key="Account">
                            <router-link :to="{name: 'Account'}">账号管理</router-link>
                        </a-menu-item>
                    </a-sub-menu>

                    <template v-for="menu:any in menus" :key="menu.id">
                        <!-- 没有二级菜单的 -->
                        <template v-if="!menu.children.length">
                            <a-menu-item :key="menu.route">
                                <router-link :to="{name: menu.route}">
                                    <component :is="menu.icon" v-if="menu.icon"></component>
                                    {{ menu.title }}
                                </router-link>
                            </a-menu-item>
                        </template>
                        <!-- 有二级菜单的 -->
                        <template v-else>
                            <a-sub-menu :key="menu.route">
                                <template #title>
                                    <component :is="menu.icon" v-if="menu.icon"></component>
                                    {{ menu.title }}
                                </template>
                                <!-- 子菜单 -->
                                <!-- <template v-for="child in menu.children" :key="child.id">
                                    <a-menu-item :key="child.route">
                                        <router-link :to="{name: child.route}">{{ child.title }}</router-link>
                                    </a-menu-item>
                                </template> -->
                                <a-menu-item v-for="child in menu.children" :key="child.route">
                                    <router-link :to="{name: child.route}">{{ child.title }}</router-link>
                                </a-menu-item>
                            </a-sub-menu>
                        </template>
                    </template>
                </a-menu>
            </a-layout-sider>
            <!-- Layout Sider -->

            <a-layout class="layout-wrap">
                <!-- 面包屑导航 -->
                <breadcrumb :routes="breadcrumb"></breadcrumb>
                <!-- 面包屑导航 -->

                <!-- 内容区域 -->
                <a-layout-content>
                    <router-view v-slot="{ Component, route }">
                        <KeepAlive>
                            <component 
                                :is="Component" 
                                :key="route.meta.usePathKey ? route.path : undefined"
                            />
                        </KeepAlive>
                    </router-view>
                </a-layout-content>
                <!-- 内容区域 -->

                <!-- <a-layout-footer class="copyright">
                    <p class="copyright">©本系统由恩享(上海)网络科技公司提供技术支持</p>
                </a-layout-footer> -->
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, reactive, toRefs, computed, onBeforeMount } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import HeaderDropdown from '@/components/HeaderDropdown';
import Breadcrumb from '@/components/Breadcrumb';
import * as AuthServiceAPis from '@/apis/auth';
export default defineComponent({
    name: 'DefaultLayout',
    components: {
        HeaderDropdown,
        Breadcrumb,
    },
    setup() {
        const route = useRoute();
        // const store = useStore();
        const state = reactive({
            breadcrumb: [],
            openKeys: [],
            selectedKeys: [],
            // menus: computed(() => store.state.menus) || [],
            menus: [],
        });

        // 监听路由变化事件
        watch(route, (newVal) => {
            // 侧边导航
            let openKeys: any = [], selectedKeys: any = [];
            const selectedMenus = newVal.matched.filter(route => { return route.meta.isNavigationMenu });
            selectedMenus.forEach(route => {
                if (route.meta.hasSubmenu) {
                    openKeys.push(route.name);
                } else {
                    selectedKeys.push(route.name);
                }
            });
            state.openKeys = openKeys;
            state.selectedKeys = selectedKeys;

            // 面包屑导航
            state.breadcrumb = <any>newVal.matched.filter(route => { return route.meta.showInbreadcrumb });
        });

        // 组件挂载之前生命钩子函数
        onBeforeMount(async () => {
            // store.dispatch('onloadLoginAdminsInformation');
        });

        // 组件挂载完成生命钩子函数
        onMounted(async () => {
            // 侧边导航
            let openKeys: any = [], selectedKeys: any = [];
            const selectedMenus = route.matched.filter(route => { return route.meta.isNavigationMenu });
            selectedMenus.forEach(route => {
                if (route.meta.hasSubmenu) {
                    openKeys.push(route.name);
                } else {
                    selectedKeys.push(route.name);
                }
            });
            state.openKeys = openKeys;
            state.selectedKeys = selectedKeys;

            // 面包屑导航
            state.breadcrumb = <any>route.matched.filter(route => { return route.meta.showInbreadcrumb });

        })

        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="less" scoped>
.layout-wrapper {
    height: 100vh;

    :deep(.ant-layout-header) {
        padding: 0 16px;
        background: linear-gradient(140deg,#1891ff 20%,#40a9ff 50%,#00b4aa);
        /* background: rgba(24, 145, 255, 1); */

        .logo {
            display: flex;
            float: left;
            height: 64px;
            cursor: pointer;

            & > img {
                height: 36px;
                margin: auto;
            }

            & > h1 {
                font-weight: bold;
                color: #fff;
                padding-left: 16px;
                margin: 0;
            }
        }
    }

    :deep(.ant-layout-sider) {
        border-right: 1px solid #e9e9e9;
    }

    :deep(.layout-wrap) {
        .ant-breadcrumb {
            padding: 13.5px 24px;
            background: #fff;
            border-bottom: 1px solid #e9e9e9;
        }

        .ant-layout-content {
            min-height: unset;
            overflow-y: auto;
            padding: 16px 24px 24px;
        }

        .copyright {
            position: absolute;
            width: 100%;
            height: 24px;
            line-height: 24px;
            bottom: 0;
            font-size: 12px;
            color: #aaa;
            text-align: center;
            padding: 0;
            margin: 0;
        }
    }
}
</style>