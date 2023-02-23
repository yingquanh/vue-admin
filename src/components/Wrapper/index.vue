<template>
    <a-card
        class="custom-wrapper"
        :title="title"
    >
        <!-- Header Extra -->
        <template #extra>
            <slot name="extra"></slot>
        </template>
        <!-- Header Extra -->

        <!-- Default Slot -->
        <slot></slot>
        <!-- Default Slot -->

        <!-- Actions -->
        <template #actions>
            <slot name="actions"></slot>
        </template>
        <!-- Actions -->
    </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'Wrapper',
    props: {
        title: {
            type: String,
            default: ''
        },
    },
    setup() {
        const state = reactive({

        });

        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="less" scoped>
.custom-wrapper {
    min-height: 100%;
    border-radius: 10px;

    :deep(.ant-card-head) {
        background: #f9f9f9;
        border-radius: 10px 10px 0 0;

        .ant-card-head-title {
            color: #666;
        }
    }
}
</style>