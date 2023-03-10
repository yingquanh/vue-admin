import { createApp, h } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// import store from './store'
import App from './App.vue'
import Antd from 'ant-design-vue'
import Components from './plugins/components'
import * as Icons from "@ant-design/icons-vue"

import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/modal/style/css'
import 'ant-design-vue/es/notification/style/css'
import './global.style.less'

const pinia = createPinia()
const app = createApp(App)

// 全局注册 icons 组件
const icons: any = Icons;
for (const i in icons) {
    // 循环注册组件
    app.component(i, icons[i]);
}
app.use(pinia)
.use(router)
.use(Antd)
.use(Components)
.mount('#app')
