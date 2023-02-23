<template>
    <div>编辑角色</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'EditRole',
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