<template>
    <wrapper title="新建账号">
        <a-form
            ref="formRef"
            :model="formState"
            :rules="rules"
            :labelCol="{span: 6}"
            :wrapperCol="{span: 14}"
            autocomplete="off"
            @finish="onSubmit"
        >
            <a-form-item label="角色" name="roleid">
                <a-select v-model:value="formState.roleid" placeholder="请选择管理员角色">
                    <a-select-option :value="1">超级管理员</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="用户名" name="account">
                <a-input v-model:value="formState.account" placeholder="请输入管理员账号" />
            </a-form-item>
            <a-form-item label="姓名" name="name">
                <a-input v-model:value="formState.name" placeholder="请输入管理员姓名" />
            </a-form-item>
            <a-form-item label="邮箱" name="email">
                <a-input v-model:value="formState.email" placeholder="请输入管理员邮箱" />
            </a-form-item>
            <a-form-item label="手机" name="mobile">
                <a-input v-model:value="formState.mobile" placeholder="请输入管理员手机" />
            </a-form-item>
            <a-form-item label="密码" name="password">
                <a-input v-model:value="formState.password" type="password" placeholder="请输入登录密码" />
            </a-form-item>
            <a-form-item :wrapperCol="{span: 14, offset: 6}">
                <custom-button type="primary" size="large" htmlType="submit" :loading="loading">提交</custom-button>
                <custom-button type="primary" size="large" ghost @click="onReset">重置</custom-button>
            </a-form-item>
        </a-form>
    </wrapper>
</template>

<script lang="ts">
import { message as $message } from 'ant-design-vue';
import { defineComponent, reactive, toRefs } from 'vue';
import * as AccountServerAPis from '@/apis/account';
export default defineComponent({
    name: 'CreateAccount',
    setup() {
        const state = reactive({
            loading: false,
            formRef: null,
            formState: {
                roleid: undefined,
                account: '',
                name: '',
                email: '',
                mobile: '',
                password: '',
            },
            rules: {
                roleid: [{
                    required: true,
                    validator: async (_rule: any, value: number) => {
                        if (value === undefined) {
                            return Promise.reject('角色为必选项')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
                account: [{
                    required: true,
                    validator: async (_rule: any, value: string) => {
                        if (value === '') {
                            return Promise.reject('账号为必填项')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    validator: async (_rule: any, value: string) => {
                        if (value === '') {
                            return Promise.reject('姓名为必填项')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
                email: [{
                    type: 'string',
                    validator: async (_rule: any, value: string) => {
                        if (value != '' && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                            return Promise.reject('邮箱格式不正确')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
                mobile: [{
                    type: 'string',
                    validator: async (_rule: any, value: string) => {
                        if (value != '' && !/^1\d{10}$/.test(value)) {
                            return Promise.reject('手机格式不正确')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    validator: async (_rule: any, value: string) => {
                        if (value === '') {
                            return Promise.reject('密码为必填项')
                        }
                        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,26}$/.test(value)) {
                            return Promise.reject('密码必须包含大小写字母和数字的组合, 可以使用特殊字符, 长度在8-26之间')
                        }

                        return Promise.resolve()
                    },
                    trigger: 'blur'
                }],
            },
        });

        // 提交表单
        const onSubmit = () => {
            if (!state.loading) {
                // 加锁
                state.loading = true;
                // 网络请求
                AccountServerAPis.create(Object.assign({}, state.formState)).then((res: any) => {
                    const { errcode, errmsg } = res.data;
                    if (!errcode) {
                        $message.success('提交成功');
                        
                        // 重置表单
                        onReset();
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