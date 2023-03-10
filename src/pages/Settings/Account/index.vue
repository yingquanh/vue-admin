<template>
    <wrapper title="账号列表">
        <custom-filter 
            :model="filterState"
            @filter="onFilter"
        >
            <a-form-item name="keyword">
                <a-input v-model:value="filterState.keyword" allowClear autocomplete="off" placeholder="账号/姓名/邮箱/手机" />
            </a-form-item>
            <a-form-item name="roleid">
                <a-select v-model:value="filterState.roleid" allowClear placeholder="管理员角色">
                    <a-select-option :value="1">超级管理员</a-select-option>
                </a-select>
            </a-form-item>
        </custom-filter>
        
        <custom-table
            :loading="loading"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="pagination"
            :scroll="{x: 1300}"
            @change="onChange"
            @refresh="onRefresh"
        >
            <template #headerExtra>
                <a-button type="primary" @click="$router.push({ name: 'CreateAccount' })">
                    <template #icon><PlusOutlined /></template>新建账号
                </a-button>
            </template>

            <template #bodyCell="{ column, record }">
                <!-- 自定义头像单元格 -->
                <template v-if="column.dataIndex === 'avatar'">
                    <a-avatar v-if="record.avatar==''" size="24">
                        <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <a-avatar v-else size="24" :src="record.avatar" />
                </template>
                <!-- 自定义头像单元格 -->

                <!-- 自定义状态单元格 -->
                <template v-if="column.dataIndex === 'status'">
                    <a-badge 
                        :status="['error', 'success', 'warning'][record.status+1]" 
                        :text="['异常', '正常', '禁用'][record.status+1]" 
                        style="color: #999;" 
                    />
                </template>
                <!-- 自定义状态单元格 -->

                <!-- 自定义操作单元格 -->
                <template v-if="column.dataIndex === 'operate'">
                    <!-- <a-button type="primary" size="small" ghost @click="$router.push({ name: 'RankingDetails', query: { id: record.id } })">
                        <template #icon><right-circle-filled /></template>详情
                    </a-button>
                    <a-button danger size="small" ghost :disabled="$hasPermission('admin.users.delete')" @click="onDelete(record)">
                        <template #icon><delete-filled /></template>删除
                    </a-button> -->
                    <!-- <custom-button type="primary" size="small" ghost>
                        <template #icon><RightCircleFilled /></template>详情
                    </custom-button> -->
                    <custom-button type="primary" size="small" ghost @click="$router.push({name: 'EditRole', query: {id: record.id}})">
                        <template #icon><EditFilled /></template>编辑
                    </custom-button>
                    <custom-button v-if="record.status==-1||record.status==1" type="success" size="small" ghost @click="onRecover(record)">
                        <template #icon><CheckCircleFilled /></template>恢复
                    </custom-button>
                    <custom-button v-if="record.status==0" type="warning" size="small" ghost @click="onForbidden(record)">
                        <template #icon><MinusCircleFilled /></template>禁用
                    </custom-button>
                    <custom-button type="danger" size="small" ghost @click="onDelete(record)">
                        <template #icon><DeleteFilled /></template>删除
                    </custom-button>
                </template>
                <!-- 自定义操作单元格 -->
            </template>
        </custom-table>
    </wrapper>
</template>

<script lang="ts">
import { message as $message, Modal as $modal } from 'ant-design-vue';
import { defineComponent, onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import * as AccountServerAPis from '@/apis/account';
export default defineComponent({
    name: 'Account',
    setup() {
        const state = reactive({
            loading: false,
            locking: false,
            filterState: {
                keyword: '',
                roleid: undefined,
            },
            columns: [
                {
                    title: '账号',
                    dataIndex: 'account',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '角色',
                    dataIndex: 'role',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '头像',
                    dataIndex: 'avatar',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '姓名',
                    dataIndex: 'name',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '电子邮箱',
                    dataIndex: 'email',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '手机',
                    dataIndex: 'mobile',
                    width: 142,
                    align: 'center'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '更新时间',
                    dataIndex: 'updated_at',
                    width: 180,
                    align: 'center'
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    width: 240,
                    align: 'center'
                }
            ],
            dataSource: [],
            pagination: {
                total: 0,
                current: 1,
                pageSize: 20,
                pageSizeOptions: ['20', '50', '100', '150'],
                showQuickJumper: false,
                showSizeChanger: true,
                //showTotal: (total: number) => `共 ${total} 条记录`
            },
        });

        // 筛选数据
        const onFilter = () => {
            state.pagination.current = 1;
            onloadListData();
        }

        const onChange = (pagination: any) => {
            state.pagination = Object.assign(state.pagination, pagination);
        }

        // 刷新表格
        const onRefresh = () => {
            onloadListData();
        }

        // 删除记录
        const onDelete = (record: any) => {
            if (!state.locking) {
                // 加锁，防止重复操作
                state.locking = true;
                // 操作确认
                $modal.confirm({
                    title: '删除操作确认',
                    content: '确定要删除当前记录吗?',
                    onCancel: () => state.locking = false,
                    onOk: () => {
                        // 操作执行提示
                        $message.loading({
                            key: 'updatable',
                            content: '正在删除数据...'
                        });
                        // 网络
                        onRemoveRecords();
                    }
                });
                // 网络请求
                const onRemoveRecords = () => {
                    AccountServerAPis.remove({
                        id: record.id,
                    }).then((res: any) => {
                        const { errcode, errmsg } = res.data;
                        if (!errcode) {
                            // 操作成功提示
                            $message.success({
                                key: 'updatable',
                                content: '数据删除成功'
                            });
                            // 重新加载列表数据
                            onloadListData();
                        } else {
                            // 操作失败提示
                            $message.warning({
                                key: 'updatable',
                                content: errmsg
                            });
                        }
                    }).catch((err: any) => {
                        // 执行异常提示
                        $message.error({
                            key: 'updatable',
                            content: `未知系统错误: ${err.message}`
                        });
                    }).finally(() => {
                        // 释放锁
                        state.locking = false;
                    })
                }
            }
        }

        // 恢复账号
        const onRecover = (record: any) => {
            if (!state.locking) {
                // 加锁
                state.locking = true;
                // 操作确认
                $modal.confirm({
                    title: '恢复操作确认',
                    content: '确定要恢复当前记录吗?',
                    onCancel: () => state.locking = false,
                    onOk: () => {
                        // 操作执行提示
                        $message.loading({
                            key: 'updatable',
                            content: '正在恢复数据...'
                        });
                        // 网络请求
                        onRecoverAccount();
                    }
                });
                // 网络请求
                const onRecoverAccount = () => {
                    AccountServerAPis.recover({
                        id: record.id,
                    }).then((res: any) => {
                        const { errcode, errmsg } = res.data;
                        if (!errcode) {
                            // 操作成功提示
                            $message.success({
                                key: 'updatable',
                                content: '数据恢复成功'
                            });
                            // 重新加载数据
                            onloadListData();
                        } else {
                            // 操作失败提示
                            $message.warning({
                                key: 'updatable',
                                content: errmsg
                            });
                        }
                    }).catch((err: any) => {
                        // 执行异常提示
                        $message.error({
                            key: 'updatable',
                            content: `未知系统错误: ${err.message}`
                        });
                    }).finally(() => {
                        // 释放锁
                        state.locking = false;
                    })
                }
            }
        }

        // 禁用账号
        const onForbidden = (record: any) => {
            if (!state.locking) {
                // 加锁
                state.locking = true;
                // 操作确认
                $modal.confirm({
                    title: '禁用操作确认',
                    content: '确定要禁用当前记录吗?',
                    onCancel: () => state.locking = false,
                    onOk: () => {
                        // 操作执行提示
                        $message.loading({
                            key: 'updatable',
                            content: '正在禁用数据...'
                        });
                        // 网络请求
                        onForbiddenAccount();
                    }
                });
                // 网络请求
                const onForbiddenAccount = () => {
                    AccountServerAPis.forbidden({
                        id: record.id,
                    }).then((res: any) => {
                        const { errcode, errmsg } = res.data;
                        if (!errcode) {
                            // 操作成功提示
                            $message.success({
                                key: 'updatable',
                                content: '数据禁用成功'
                            });
                            // 重新加载数据
                            onloadListData();
                        } else {
                            // 操作失败提示
                            $message.warning({
                                key: 'updatable',
                                content: errmsg
                            });
                        }
                    }).catch((err: any) => {
                        // 执行异常提示
                        $message.error({
                            key: 'updatable',
                            content: `未知系统错误: ${err.message}`
                        });
                    }).finally(() => {
                        // 释放锁
                        state.locking = false;
                    })
                }
            }
        }

        const onloadListData = () => {
            if (!state.loading) {
                // 加锁
                state.loading = true;
                // 网络加载
                AccountServerAPis.list(Object.assign({
                    page: state.pagination.current,
                    pageSize: state.pagination.pageSize,
                }, state.filterState)).then((res: any) => {
                    const { errcode, data } = res.data;
                    if (!errcode) {
                        state.dataSource = data.lists;
                        state.pagination.total = data.total;
                        state.pagination.current = data.page;
                        state.pagination.pageSize = data.pageSize;
                    }
                })
                .catch((err: any) => {})
                .finally(() => {
                    state.loading = false;
                })
            }
        }

        // 组件挂载前生命钩子
        onBeforeMount(async () => {
            onloadListData();
        })

        onMounted(async () => {
            // onloadListData();
        })

        return {
            ...toRefs(state),
            onFilter,
            onChange,
            onRefresh,
            onDelete,
            onRecover,
            onForbidden,
        }
    }
})
</script>

<style lang="less" scoped>

</style>