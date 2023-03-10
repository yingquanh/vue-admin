<template>
    <a-card
        class="custom-wrapper"
        :activeTabKey="activeTabKey"
        :tabList="tabList"
        :title="title"
        @tabChange="tabChange"
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
    name: "Wrapper",
    props: {
        activeTabKey: {
            type: String,
            default: ""
        },
        tabList: {
            type: Array,
            default() {
                return [];
            }
        },
        title: {
            type: String,
            default: ""
        },
    },
    emits: ["tabChange"],
    setup(_props, context) {
        const state = reactive({});
        // 页签切换的回调
        const tabChange = (key: string) => {
            context.emit("tabChange", key);
        };
        return {
            ...toRefs(state),
            tabChange,
        };
    }
})
</script>

<style lang="less" scoped>
.custom-wrapper {
    min-width: 1000px;
    min-height: 100%;
    border-radius: 10px;

    :deep(.ant-card-head) {
        background: #f9f9f9;
        border-radius: 10px 10px 0 0;

        .ant-card-head-title {
            color: #666;
        }

        .ant-tabs-tab {
            font-weight: 500;
            color: #666;
        }
    }
}
</style>