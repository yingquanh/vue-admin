<template>
    <div>账号管理</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'Account',
    setup() {
        const state = reactive({

        });

        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="less">
    @import './index.less';
</style>