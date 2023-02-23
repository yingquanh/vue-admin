<template>
    <div>新增账号</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'CreateAccount',
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