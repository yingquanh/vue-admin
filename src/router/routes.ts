import Layout from '@/layouts/Default';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Role from '@/pages/Settings/Role';
import CreateRole from '@/pages/Settings/Role/Create';
import EditRole from '@/pages/Settings/Role/Edit';
import Account from '@/pages/Settings/Account';
import CreateAccount from '@/pages/Settings/Account/Create';
import EditAccount from '@/pages/Settings/Account/Edit';
import Example from '@/pages/Example';

export default [
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        meta: {
            title: '系统首页',
            showInbreadcrumb: true,
            isNavigationMenu: false,
            hasSubmenu: false,
        },
        component: Layout,
        children: [
            {
                path: '',
                name: 'Dashboard',
                meta: {
                    title: '仪表盘',
                    showInbreadcrumb: false,
                    isNavigationMenu: false,
                    hasSubmenu: false,
                },
                component: Dashboard
            },
            {
                path: 'settings',
                name: 'Settings',
                meta: {
                    title: '系统设置',
                    showInbreadcrumb: true,
                    isNavigationMenu: true,
                    hasSubmenu: true,
                },
                redirect: { name: 'Role' },
                children: [
                    {
                        path: 'role',
                        name: 'Role',
                        meta: {
                            title: '角色管理',
                            showInbreadcrumb: true,
                            isNavigationMenu: true,
                            hasSubmenu: false,
                        },
                        redirect: { name: 'RoleList' },
                        children: [
                            {
                                path: 'list',
                                name: 'RoleList',
                                meta: {
                                    title: '角色列表',
                                    showInbreadcrumb: false,
                                    isNavigationMenu: false,
                                    hasSubmenu: false,
                                },
                                component: Role
                            },
                            {
                                path: 'create',
                                name: 'CreateRole',
                                meta: {
                                    title: '新建角色',
                                    showInbreadcrumb: true,
                                    isNavigationMenu: false,
                                    hasSubmenu: false,
                                },
                                component: CreateRole
                            },
                            {
                                path: 'edit',
                                name: 'EditRole',
                                meta: {
                                    title: '编辑角色',
                                    showInbreadcrumb: true,
                                    isNavigationMenu: false,
                                    hasSubmenu: false,
                                },
                                component: EditRole
                            },
                        ]
                    },
                    {
                        path: 'account',
                        name: 'Account',
                        meta: {
                            title: '账号管理',
                            showInbreadcrumb: true,
                            isNavigationMenu: true,
                            hasSubmenu: false,
                        },
                        redirect: { name: 'AccountList' },
                        children: [
                            {
                                path: 'list',
                                name: 'AccountList',
                                meta: {
                                    title: '账号列表',
                                    showInbreadcrumb: false,
                                    isNavigationMenu: false,
                                    hasSubmenu: false,
                                },
                                component: Account
                            },
                            {
                                path: 'create',
                                name: 'CreateAccount',
                                meta: {
                                    title: '新增账号',
                                    showInbreadcrumb: true,
                                    isNavigationMenu: false,
                                    hasSubmenu: false,
                                },
                                component: CreateAccount
                            },
                            {
                                path: 'edit',
                                name: 'EditAccount',
                                meta: {
                                    title: '编辑账号',
                                    showInbreadcrumb: true,
                                    isNavigationMenu: false,
                                    hasSubmenu: false,
                                },
                                component: EditAccount
                            },
                        ]
                    },
                ]
            },

            {
                path: '/example',
                name: 'Example',
                meta: {
                    title: '示例',
                    showInbreadcrumb: true,
                    isNavigationMenu: true,
                    hasSubmenu: false,
                },
                component: Example
            },
        ]
    },
];