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
import { useStore } from '@/store';
import CryptoJS from '@/utils/crypto';
import * as CommonServiceAPis from '@/apis/common';
import * as AuthServiceAPis from '@/apis/auth';
export default defineComponent({
    name: 'Login',
    setup() {
        const router = useRouter();
        const store = useStore();
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
                        } else if (!/^.{8,26}$/.test(value)) {
                            return Promise.reject('登录密码长度为8~26个字符');
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
                    state.captcha = data.base64url;
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
                            description: `${timeState()}, 欢迎回来!`,
                        });

                        // 存储 token
                        store.setAccessToken(data.token);

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
                        message: '未知系统错误',
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

<style lang="less" scoped>
.sign-flow-page {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url("@/assets/bg-login.svg") no-repeat center;
    background-color: #eceff4;
    overflow-y: auto;

    .login-wrap {
        position: absolute;
        width: 900px;
        height: 450px;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        background: url("@/assets/bg-sign.svg") no-repeat center;
        box-shadow: 0 0 10px rgb(0 0 0 / .15);

        :deep(.ant-card-body) {
            display: flex;
            height: 100%;
            padding: 0;

            .login-wrap-body-left {
                position: relative;
                width: 336px;
                text-align: center;

                .login-wrap-body-left__content {
                    position: absolute;
                    width: 320px;
                    top: 40%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-40%);
                    -webkit-transform: translateX(-50%) translateY(-40%);

                    .logo {
                        height: 100px;
                        line-height: 100px;
                        
                        img {
                            width: 64px;
                            height: 64px;
                        }
                    }

                    .title {
                        line-height: 30px;
                        font-size: 22px;
                        color: #fff;
                        margin: 0;
                    }

                    .sub-title {
                        line-height: 30px;
                        font-size: 16px;
                        color: #fff;
                        margin: 0;
                    }
                }
            }

            .login-wrap-body-right {
                position: relative;
                flex: 1;

                .login-wrap-body-right__content {
                    position: absolute;
                    width: 380px;
                    top: 32%;
                    left: 50%;
                    transform: translateX(-50%) translateY(-32%);
                    -webkit-transform: translateX(-50%) translateY(-32%);

                    .header {
                        height: 60px;
                        line-height: 60px;
                        text-align: left;
                        margin-bottom: 8px;

                        span {
                            &:first-child {
                                font-weight: 700;
                                font-size: 18px;
                                color: #666666;
                            }

                            &:last-child {
                                font-weight: 400;
                                font-size: 14px;
                                color: #999999;
                            }
                        }
                    }

                    .ant-form {
                        .ant-input-affix-wrapper {
                            height: 50px;
                            border-radius: 5px;
                            background: transparent;

                            .ant-input {
                                background: transparent;
                            }
                        }

                        .captcha-wrap {
                            display: flex;

                            .ant-input-affix-wrapper {
                                flex: 1;
                            }

                            .captcha {
                                position: relative;
                                width: 124px;
                                height: 50px;
                                margin-left: 8px;

                                .ant-image {
                                    width: 100%;
                                    height: 50px;
                                    user-select: none;

                                    .ant-image-img {
                                        height: inherit;
                                    }
                                }

                                &::after {
                                    content: "";
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    width: 100%;
                                    height: 100%;
                                    border: 1px solid rgba(228, 228, 228, 1);
                                    border-radius: 5px;
                                    -moz-box-shadow: none;
                                    -webkit-box-shadow: none;
                                    box-shadow: none;
                                    cursor: pointer;
                                }
                            }
                        }

                        

                        .remember-forgot {
                            display: flex;
                            position: relative;
                            top: -6px;
                            margin-bottom: 8px;
                            justify-content: space-between;

                            .forgot-passwd {
                                color: #409eff;
                                font-size: 14px;
                            }
                        }

                        .ant-btn {
                            height: 50px;
                            border-radius: 5px;

                            span {
                                font-size: 18px;
                                font-weight: 700;
                                font-style: normal;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>