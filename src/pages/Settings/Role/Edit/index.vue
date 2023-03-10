<template>
    <wrapper title="编辑角色">
        <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            :labelCol="{ span: 6 }"
            :wrapperCol="{ span: 14 }"
            autocomplete="off"
            @finish="onSubmit"
        >
            <a-form-item label="角色" name="title">
                <a-input v-model:value="formState.title" placeholder="请填写角色名称" />
            </a-form-item>
            <a-form-item label="描述" name="description">
                <a-textarea v-model:value="formState.description" :rows="6" placeholder="请填写角色描述" />
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 14, offset: 6 }">
                <custom-button type="primary" size="large" htmlType="submit" :loading="loading">提交</custom-button>
                <custom-button type="primary" size="large" ghost @click="onReset">重置</custom-button>
            </a-form-item>
        </a-form>
    </wrapper>
</template>

<script lang="ts">
import { message as $message } from 'ant-design-vue';
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import * as RoleServerAPis from '@/apis/role';
export default defineComponent({
    name: 'EditRole',
    setup() {
        const route = useRoute();
        const state = reactive({
            loading: false,
            formRef: null,
            formState: {
                id: null,
                title: '',
                description: '',
            },
            rules: {
                title: [{
                    required: true,
                    validator: async (_rule: any, value: string) => {
                        if (value === '') {
                            return Promise.reject('角色为必填项')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
            },
        });

        // 提交数据
        const onSubmit = () => {
            if (!state.loading) {
                // 加锁
                state.loading = true;
                // 网络请求
                RoleServerAPis.update(Object.assign({}, state.formState)).then((res: any) => {
                    const { errcode, errmsg } = res.data;
                    if (!errcode) {
                        $message.success('提交成功');
                    } else {
                        $message.warning(errmsg);
                    }
                }).catch((err: any) => {
                    $message.error(`未知系统错误: ${err.message}`);
                }).finally(() => {
                    state.loading = false;
                })
            }
        }

        // 重置表单
        const onReset = () => {
            state.formRef.resetFields();
        }

        // 组件挂载前生命钩子
        onBeforeMount(async () => {
            // 加载角色信息
            RoleServerAPis.info({
                id: route.query.id,
            }).then((res: any) => {
                const { errcode, data } = res.data;
                if (!errcode) {
                    state.formState = Object.assign(state.formState, data);
                }
            }).catch((err: any) => {
                console.log(err)
            })
        })

        return {
            ...toRefs(state),
            onSubmit,
            onReset,
        }
    }
})
</script>

<style lang="less" scoped>
.custom-wrapper {

    :deep(.ant-form) {
        width: 640px;
        margin: auto;

        .custom-button {
            .ant-btn {
                width: 140px;
            }
        }
    }
}
</style>