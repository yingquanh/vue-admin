<template>
    <div class="custom-filter">
        <a-form
            ref="formRef"
            layout="inline"
            :model="formState"
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
                <a-button type="link" @click="onClick">
                    <template #icon><FilterOutlined /></template>高级筛选
                </a-button>
            </a-form-item>
            <!-- Operate Button -->
        </a-form>

        <!-- Custom Filter Senior Drawer -->
        <a-drawer
            v-model:visible="visible"
            class="custom-filter-drawer"
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

            <a-form>
                <a-row>
                    <a-col :span="12">
                        <a-form-item name="搜索查询">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item name="会员等级">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item name="用户标签">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item name="注册渠道">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item name="注册时间">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item name="消费金额">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item name="账号状态">
                            <a-input value="keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item>
                            <a-button type="primary">查询</a-button>
                            <a-button type="default">重置</a-button>
                        </a-form-item>
                    </a-col>
                </a-row>
            </a-form>
        </a-drawer>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: 'CustomFilter',
    setup() {
        const state = reactive({
            visible: false,
            formState: {},
        });

        const onFinish = () => {

        }

        const onReset = () => {

        }

        const onClick = () => {
            state.visible = true;
        }

        const onClose = () => {
            state.visible = false;
        }

        return {
            ...toRefs(state),
            onFinish,
            onReset,
            onClick,
            onClose,
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
    }

    .ant-btn {

        &:not(:last-child) {
            margin-right: 8px;
        }
        
    }
}
</style>

<style lang="less">
.custom-filter-drawer {
    .ant-drawer-header {
        background: #f5f5f5;
    }

    .ant-drawer-extra {
        .ant-btn {
            color: #999;
        }
    }
}
</style>