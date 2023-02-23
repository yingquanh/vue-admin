<template>
    <div>新增角色</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'CreateRole',
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