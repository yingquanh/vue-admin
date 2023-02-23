<template>
    <span class="custom-button">
        <a-button 
            :block="block"
            :disabled="disabled"
            :ghost="ghost"
            :href="href"
            :htmlType="htmlType"
            :loading="loading"
            :shape="shape"
            :size="size"
            :target="target"
            :type="type"
        >
            <!-- Icon Slot -->
            <template #icon>
                <slot name="icon"></slot>
            </template>
            <!-- Icon Slot -->

            <slot></slot>
        </a-button>
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CustomButton',
    props: {
        block: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        ghost: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
        },
        htmlType: {
            type: String,
            default: 'button'
        },
        loading: {
            type: [Boolean, Object],
            default: false
        },
        shape: {
            type: String,
            default: 'default',
            validator: (value: string) => {
                return ['default', 'circle', 'round'].includes(value)
            }
        },
        size: {
            type: String,
            default: 'middle',
            validator: (value: string) => {
                return ['large', 'middle', 'small'].includes(value)
            }
        },
        target: {
            type: String,
        },
        type: {
            type: String,
            default: 'default',
            validator: (value: string) => {
                return ['primary', 'ghost', 'dashed', 'link', 'text', 'default', 'success', 'warning', 'danger'].includes(value)
            }
        },
    },
    setup() {

    }
})
</script>

<style lang="less" scoped>
.custom-button {
    margin: 0 4px;

    .ant-btn.ant-btn-background-ghost {
        color: #999;
        border-color: #e4e4e4;
        background: #f9f9f9;

        &:hover, &:focus {
            color: #409eff;
            border-color: #7abbff;
            background: #f0f7ff;
        }
    }

    .ant-btn-primary.ant-btn-background-ghost {
        color: #409eff;
        border-color: #7abbff;
        background: #f0f7ff;

        &:hover, &:focus {
            color: #fff;
            border-color: #409eff;
            background: #409eff;
        }
    }

    .ant-btn-success {
        color: #fff;
        border-color: #19be6b;
        background: #19be6b;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px 0 rgb(0 0 0 / 5%);

        &:hover, &:focus {
            color: #fff;
            border-color: #6cd5a1;
            background: #6cd5a1;
        }
    }

    .ant-btn-success.ant-btn-background-ghost {
        color: #19be6b;
        border-color: #84dcb0;
        background: #e7f4ee;

        &:hover, &:focus {
            color: #fff;
            border-color: #19be6b;
            background: #19be6b;
        }
    }

    .ant-btn-warning {
        color: #fff;
        border-color: #fe9400;
        background: #fe9400;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px 0 rgb(0 0 0 / 5%);

        &:hover, &:focus {
            color: #fff;
            border-color: #ffad33;
            background: #ffad33;
        }
    }

    .ant-btn-warning.ant-btn-background-ghost {
        color: #fe9400;
        border-color: #ffb84d;
        background: #fff7eb;

        &:hover, &:focus {
            color: #fff;
            border-color: #ff9900;
            background: #ff9900;
        }
    }

    .ant-btn-danger {
        color: #fff;
        border-color: #ff4d4f;
        background: #ff4d4f;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
        box-shadow: 0 2px 0 rgb(0 0 0 / 5%);

        &:hover, &:focus {
            color: #fff;
            border-color: #ff7875;
            background: #ff7875;
        }
    }

    .ant-btn-danger.ant-btn-background-ghost {
        color: #ff4d4f;
        border-color: #f89898;
        background: #fef3f3;

        &:hover, &:focus {
            color: #fff;
            border-color: #ff4d4f;
            background: #ff4d4f;
        }
    }

    .ant-btn-sm {
        font-size: 12px;
    }

    .ant-btn[disabled], .ant-btn[disabled]:hover, .ant-btn[disabled]:focus, .ant-btn[disabled]:active {
        color: rgba(0, 0, 0, 0.25);
        border-color: #d9d9d9;
        background: #f5f5f5;
    }
}
</style>