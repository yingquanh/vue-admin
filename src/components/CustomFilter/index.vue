<template>
    <div class="custom-filter">
        <a-form
            ref="filterRef"
            layout="inline"
            :model="filterState"
            @finish="onFinish"
        >
            <!-- Default Slot -->
            <slot></slot>
            <!-- Default Slot -->

            <!-- Operate Button -->
            <a-form-item>
                <a-button type="primary" html-type="submit">
                    <template #icon><SearchOutlined /></template>查询
                </a-button>
                <a-button @click="onReset">
                    <template #icon><UndoOutlined /></template>重置
                </a-button>
                <slot name="senior"></slot>
            </a-form-item>
            <!-- Operate Button -->
        </a-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'CustomFilter',
    props: {
        model: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    emits: ['filter'],
    setup(props: any, context: any) {
        const state = reactive({
            filterRef: null,
            filterState: props.model,
        });

        // 提交表单
        const onFinish = () => {
            context.emit('filter');
        }

        // 重置表单
        const onReset = () => {
            state.filterRef.resetFields();
            context.emit('filter');
        }

        return {
            ...toRefs(state),
            onFinish,
            onReset,
        }
    }
})
</script>

<style lang="less" scoped>
.custom-filter {
    :deep(.ant-form-item) {
        width: 290px;
        margin-bottom: 24px;

        .ant-form-item-control {

            .ant-select-selector {
                border-radius: 5px;
            }

            .ant-input-affix-wrapper {
                border-radius: 5px;
            }
        }

        .ant-btn {
            &:not(:last-child) {
                margin-right: 8px;
            }
        }
    }
}
</style>