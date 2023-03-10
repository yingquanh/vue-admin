<template>
    <wrapper title="角色列表">
        <custom-filter 
            :model="filterState" 
            @filter="onFilter" 
        >
            <a-form-item name="keyword">
                <a-input v-model:value="filterState.keyword" allowClear autocomplete="off" placeholder="角色名称" />
            </a-form-item>
        </custom-filter>
        <custom-table
            :loading="loading"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="pagination"
            :rowSelection="{selections: true}"
            @change="onChange"
            @refresh="onRefresh"
        >
            <template #headerExtra>
                <a-button type="primary" @click="$router.push({ name: 'CreateRole' })">
                    <template #icon><PlusOutlined /></template>新建角色
                </a-button>
            </template>

            <template #bodyCell="{ column, record }">
                <!-- 自定义显示单元格 -->
                <template v-if="column.dataIndex === 'visible'">
                    <a-switch v-model:checked="record.visible" :checkedValue="1" :unCheckedValue="0"></a-switch>
                </template>
                <!-- 自定义显示单元格 -->

                <!-- 自定义状态单元格 -->
                <template v-if="column.dataIndex === 'status'">
                    <a-badge status="success"></a-badge><span style="color: #999;">已完成</span>
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
                    <custom-button type="primary" size="small" ghost>
                        <template #icon><RightCircleFilled /></template>详情
                    </custom-button>
                    <custom-button type="primary" size="small" ghost @click="$router.push({name: 'EditRole', query: {id: record.id}})">
                        <template #icon><EditFilled /></template>编辑
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
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import * as RoleServerAPis from '@/apis/role';
export default defineComponent({
    name: 'Role',
    components: {

    },
    setup() {
        const state = reactive({
            filterState: {
                keyword: '',
            },
            columns: [
                {
                    title: '角色',
                    dataIndex: 'title',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '描述',
                    dataIndex: 'description',
                    width: 300,
                    align: 'left'
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
            loading: false,
            locking: false,
        });

        // 筛选
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
                    RoleServerAPis.remove({
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

        const onloadListData = () => {
            if (!state.loading) {
                // 加锁
                state.loading = true;
                // 网络加载
                RoleServerAPis.list(Object.assign({
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

        onMounted(async () => {
            onloadListData();
        })

        return {
            ...toRefs(state),
            onFilter,
            onChange,
            onRefresh,
            onDelete,
        }
    }
})
</script>

<style lang="less" scoped>

</style>