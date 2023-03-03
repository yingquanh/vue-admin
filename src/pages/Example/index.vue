<template>
    <wrapper title="示例">
        <custom-filter>
            <a-form-item name="keyword">
                <a-input v-model:value="filterState.keyword" allowClear autocomplete="off" placeholder="关键字: 学员姓名" />
            </a-form-item>
        </custom-filter>
        <custom-table
            :loading="loading"
            :columns="columns"
            :dataSource="dataSource"
            :pagination="pagination"
        >
            <template #headerExtra>
                <a-button type="primary" @click="$router.push({ name: 'CreateTrain' })">
                    <template #icon><PlusOutlined /></template>新增
                </a-button>
                <a-button type="primary" @click="$router.push({ name: 'CreateTrain' })">
                    <template #icon><PlusOutlined /></template>添加标签
                </a-button>
                <a-button type="primary" @click="$router.push({ name: 'CreateTrain' })">
                    <template #icon><PlusOutlined /></template>导出数据
                </a-button>
                <custom-button type="default">
                    <template #icon><PlusOutlined /></template>导出数据
                </custom-button>
            </template>

            <template #bodyCell="{ column, record }">
                <!-- 自定义用时单元格 -->
                <template v-if="column.dataIndex === 'duration'">
                    <span>{{ parseInt(record.duration/60) < 10 ? '0'+parseInt(record.duration/60) : parseInt(record.duration/60) }} 分 {{ parseInt(record.duration%60) < 10 ? '0'+parseInt(record.duration%60) : parseInt(record.duration%60) }} 秒</span>
                </template>
                <!-- 自定义用时单元格 -->

                <!-- 自定义操作单元格 -->
                <template v-if="column.dataIndex === 'operate'">
                    <!-- <a-button type="primary" size="small" ghost @click="$router.push({ name: 'RankingDetails', query: { id: record.id } })">
                        <template #icon><right-circle-filled /></template>详情
                    </a-button>
                    <a-button type="primary" size="small" ghost :disabled="$hasPermission('admin.users.edit')" @click="$router.push({ name: 'EditUser', query: { id: record.id } })">
                        <template #icon><edit-filled /></template>编辑
                    </a-button>
                    <a-button danger size="small" ghost :disabled="$hasPermission('admin.users.delete')" @click="onDelete(record)">
                        <template #icon><delete-filled /></template>删除
                    </a-button> -->
                    <custom-button type="primary" size="small" ghost>
                        <template #icon><RightCircleFilled /></template>详情
                    </custom-button>
                    <custom-button type="primary" size="small" ghost>
                        <template #icon><EditFilled /></template>编辑
                    </custom-button>
                    <custom-button type="danger" size="small" ghost>
                        <template #icon><DeleteFilled /></template>删除
                    </custom-button>
                </template>
                <!-- 自定义操作单元格 -->
            </template>
        </custom-table>
    </wrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import Wrapper from '@/components/Wrapper';
import CustomFilter from '@/components/CustomFilter';
import CustomTable from '@/components/CustomTable';
import CustomButton from '@/components/CustomButton';
export default defineComponent({
    name: 'Example',
    components: {
        Wrapper,
        CustomFilter,
        CustomTable,
        CustomButton,
    },
    setup() {
        const state = reactive({
            filterState: {
                keyword: '',
            },
            columns: [
                {
                    title: '排行',
                    dataIndex: 'serial_no',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '学员',
                    dataIndex: 'name',
                    width: 120,
                    align: 'center'
                },
                {
                    title: '答题数',
                    dataIndex: 'num',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '用时',
                    dataIndex: 'duration',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    width: 360,
                    align: 'center'
                }
            ],
            dataSource: [
                {
                    id: 1,
                    serial_no: 1,
                    name: '张三',
                    num: 10,
                    duration: 30
                },
                {
                    id: 2,
                    serial_no: 2,
                    name: '李四',
                    num: 10,
                    duration: 30
                },
                {
                    id: 3,
                    serial_no: 3,
                    name: '王五',
                    num: 10,
                    duration: 30
                },
                {
                    id: 4,
                    serial_no: 4,
                    name: '宋六',
                    num: 10,
                    duration: 30
                },
            ],
            pagination: {
                total: 40000,
                current: 9,
                pageSize: 2,
                pageSizeOptions: ['2', '50', '100', '150'],
                showQuickJumper: false,
                showSizeChanger: true,
                //showTotal: (total: number) => `共 ${total} 条记录`
            },
            loading: false,
        });

        return {
            ...toRefs(state),
        }
    }
})
</script>

<style lang="less">

</style>