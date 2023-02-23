<template>
    <div class="sign-flow-page">
        <a-card class="login-wrap">
            <div class="login-wrap-body-left">
                <div class="login-wrap-body-left__content">
                    <div class="logo">
                        <img alt="logo" src="@/assets/logo.png"/>
                    </div>
                    <h3 class="title">上海检察院学习平台</h3>
                    <p class="sub-title">Shanghai Procuratorate Learning Platform</p>
                </div>
            </div>
            <div class="login-wrap-body-right">
                <div class="login-wrap-body-right__content">
                    <div class="header">
                        <span>用户登录 </span>
                        <span>USER LOGIN</span>
                    </div>
                    <a-form
                        class="SignForm"
                        ref="formRef"
                        :model="formState"
                        :rules="rules"
                        :label-col="{span: 0}"
                        :wrapper-col="{span: 24}"
                        @finish="onSubmit"
                    >
                        <a-form-item ref="name" name="account">
                            <a-input v-model:value="formState.account" autocomplete="off" spellcheck="false" placeholder="请输入登录账号" size="large">
                                <template #prefix>
                                    <UserOutlined/>
                                </template>
                            </a-input>
                        </a-form-item>
                        <a-form-item ref="password" name="password">
                            <a-input-password v-model:value="formState.password" autocomplete="off" spellcheck="false" placeholder="请输入登录密码" size="large">
                                <template #prefix>
                                    <LockOutlined/>
                                </template>
                            </a-input-password>
                        </a-form-item>
                        <a-form-item name="captcha" :autoLink="false">
                            <div class="captcha-wrap">
                                <a-input
                                    v-model:value="formState.captcha"
                                    autocomplete="off"
                                    spellcheck="false"
                                    placeholder="请输入右侧校验码"
                                    size="large"
                                    :maxlength="4"
                                >
                                    <template #prefix>
                                        <SafetyCertificateOutlined/>
                                    </template>
                                </a-input>
                                <div class="captcha" @click="onReloadCaptcha">
                                    <a-image alt=验证码 :preview="false" :src="captcha"/>
                                </div>
                            </div>
                        </a-form-item>
                        <div class="remember-forgot">
                            <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
                            <a-tooltip>
                                <template #title>请联系管理员重置登录密码</template>
                                <span class="forgot-passwd">忘记密码？</span>
                            </a-tooltip>
                        </div>
                        <a-form-item>
                            <a-button type="primary" size="large" :disabled="loading" block html-type="submit">
                                <span v-if="loading">登录中...</span>
                                <span v-else>登录</span>
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { notification } from 'ant-design-vue';
import { timeState } from '@/utils/tools';
import CryptoJS from '@/utils/crypto';
import * as CommonServiceAPis from '@/apis/common';
import * as AuthServiceAPis from '@/apis/auth';
export default defineComponent({
    name: 'Login',
    setup() {
        const router = useRouter();
        const state = reactive({
            formRef: null,
            formState: {
                account: '',
                password: '',
                captcha: '',
                remember: false,
            },
            rules: {
                account: [{
                    required: true,
                    validator: async (_rule: any, value: any) => {
                        if (value === '') {
                            return Promise.reject('请填写用户账号');
                        }

                        return Promise.resolve();
                    },
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    validator: async (_rule: any, value: any) => {
                        if (value === '') {
                            return Promise.reject('请填写登录密码');
                        } else if (!/^.{8,24}$/.test(value)) {
                            return Promise.reject('登录密码长度为8~24个字符');
                        }

                        return Promise.resolve();
                    },
                    trigger: 'blur'
                }],
                captcha: [{
                    required: true,
                    validator: async (_rule: any, value: any) => {
                        if (value === '') {
                            return Promise.reject('请填写校验码');
                        }

                        return Promise.resolve();
                    },
                    trigger: 'change'
                }]
            },
            captcha: null,
            captchaKey: null,
            loading: false,
        });

        // 校验码数据重载
        const onReloadCaptcha = () => {
            CommonServiceAPis.checkCode().then((res: any) => {
                const { errcode, data } = res.data;
                if (!errcode) {
                    state.captcha = data;
                    state.captchaKey = res.headers['captcha-key'];
                }
            }).catch((err: any) => [
                console.log(err)
            ])
        }

        // 提交表单
        const onSubmit = () => {
            if (!state.loading) {
                // 加锁，防止重复提交
                state.loading = true;
                // 网络请求
                AuthServiceAPis.login(Object.assign({}, state.formState, {
                    password: CryptoJS.encrypt(state.formState.password),
                }), { 
                    'Captcha-Key': state.captchaKey,
                }).then((res: any) => {
                    const { errcode, errmsg, data } = res.data;
                    if (!errcode) {
                        // 登录提示
                        notification.success({
                            message: "登录成功",
                            description: `${timeState}, 欢迎回来!`,
                        });

                        // 重定向页面
                        router.replace({name: 'Home'});
                    } else {
                        // 失败提示
                        notification.warning({
                            message: "登录失败",
                            description: errmsg
                        })
                    }
                }).catch((err: any) => {
                    // 错误提示
                    notification.error({
                        message: '系统未知错误',
                        description: err.message
                    })
                }).finally(() => {
                    // 取消登录态
                    state.loading = false;
                    // 清除表单输入的校验码
                    state.formState.captcha = '';
                    // 重载校验码图像  
                    onReloadCaptcha();
                })
            }
        }


        onMounted(async () => {
            onReloadCaptcha();
        })

        return {
            ...toRefs(state),
            onReloadCaptcha,
            onSubmit,
        }
    }
})
</script>

<style lang="less">
    @import './index.less';
</style>