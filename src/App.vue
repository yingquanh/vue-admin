<template>
    <a-config-provider :getPopupContainer="getPopupContainer" :locale="locale">
        <router-view/>
    </a-config-provider>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
export default defineComponent({
    setup() {
        // const locale = zhCN;
        const getPopupContainer = (el: any, dialogContext: any) => {
            if (dialogContext) {
                return dialogContext.getDialogWrap();
            } else {
                return document.body;
            }
        }

        return {
            dayjs,
            locale: zhCN,
            getPopupContainer,
        }
    }
})
</script>