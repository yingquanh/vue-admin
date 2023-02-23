import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 路由全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {

    // 更新页面标题
    document.title = to.meta.title;

    next();
});

export default router;