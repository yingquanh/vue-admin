<template>
    <div>角色管理</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'Role',
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