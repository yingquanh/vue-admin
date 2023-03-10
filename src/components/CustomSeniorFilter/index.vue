<template>
    <div class="custom-senior-filter">
        <!-- 高级筛选器按钮 -->
        <a-button type="link" @click="onClick">
            <template #icon><FilterOutlined /></template>高级筛选
        </a-button>
        <!-- 高级筛选器按钮 -->

        <!-- Custom Filter Senior Drawer -->
        <a-drawer
            class="custom-filter-drawer"
            v-model:visible="visible"
            :closable="false"
            placement="right"
            size="large"
        >
            <!-- Custom Title -->
            <template #title>
                <FilterOutlined />高级筛选
            </template>
            <!-- Custom Title -->

            <!-- Custom Right Extra -->
            <template #extra>
                <a-button type="link" @click="onClose">
                    <template #icon><RightCircleOutlined /></template>收起
                </a-button>
            </template>
            <!-- Custom Right Extra -->

            <a-form
                ref="filterRef"
                layout="inline"
                :model="filterState"
                autocomplete="off"
                @finish="onFinish"
            >
                <slot></slot>
                
                <a-form-item>
                    <custom-button type="primary">
                        <template #icon><SearchOutlined /></template>查询
                    </custom-button>
                    <custom-button type="primary" ghost>
                        <template #icon><UndoOutlined /></template>重置
                    </custom-button>
                </a-form-item>
            </a-form>
        </a-drawer>
        <!-- Custom Filter Senior Drawer -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'CustomSeniorFilter',
    emits: ['submit', 'reset'],
    setup(props, context) {
        const state = reactive({
            visible: false,
            filterRef: null,
            filterState: {
                keyword: ''
            },
        });

        // 开启高级筛选器
        const onClick = () => {
            state.visible = true;
        }

        // 关闭高级筛选器
        const onClose = () => {
            state.visible = false;
        }

        // 提交表单
        const onFinish = () => {
            context.emit('submit');
        }

        // 重置表单
        const onReset = () => {
            context.emit('reset');
        }

        return {
            ...toRefs(state),
            onClick,
            onClose,
            onFinish,
            onReset,
        }
    }
})
</script>

<style lang="less" scoped>
.custom-senior-filter {
    display: inline-block;   
}
</style>