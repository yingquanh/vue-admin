<template>
    <div class="custom-table">
        <!-- Table Header -->
        <div class="table-header">
            <div class="table-header-extra">
                <slot name="headerExtra"></slot>
            </div>
            <div class="table-header-operate">
                <a-tooltip title="刷新">
                    <a-button type="text" @click="onRefresh">
                        <template #icon><SyncOutlined /></template>
                    </a-button>
                </a-tooltip>
                <a-tooltip title="密度">
                    <a-dropdown placement="bottom" trigger="click">
                        <a-button type="text">
                            <template #icon><ColumnHeightOutlined /></template>
                        </a-button>
                        <template #overlay>
                            <a-menu v-model:selectedKeys="tableSize" selectable>
                                <a-menu-item key="default">默认</a-menu-item>
                                <a-menu-item key="middle">中等</a-menu-item>
                                <a-menu-item key="small">紧凑</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </a-tooltip>
                <a-tooltip title="列设置">
                    <a-button type="text" @click="showVisible">
                        <template #icon><SettingOutlined /></template>
                    </a-button>
                    <!-- <a-popover title="自定义显示列项" placement="bottomRight" trigger="click">
                        <a-button type="text" @click="showVisible">
                            <template #icon><SettingOutlined /></template>
                        </a-button>
                        <template #content>
                            <p>Content</p>
                            <p>Content</p>
                        </template>
                    </a-popover> -->
                </a-tooltip>
            </div>
        </div>
        <!-- Table Header -->

        <!-- Table Content -->
        <a-table
            :childrenColumnName="childrenColumnName"
            :columns="columns"
            :components="components"
            :dataSource="dataSource"
            :defaultExpandAllRows="defaultExpandAllRows"
            :defaultExpandedRowKeys="defaultExpandedRowKeys"
            :expandedRowKeys="expandedRowKeys"
            :expandedRowRender="expandedRowRender"
            :expandFixed="expandFixed"
            :expandIcon="expandIcon"
            :expandRowByClick="expandRowByClick"
            :indentSize="indentSize"
            :loading="loading"
            :locale="locale"
            :pagination="false"
            :rowClassName="(_record: any, index: number) => index % 2 === 1 ? 'table-striped' : null"
            :rowKey="rowKey"
            :rowSelection="rowSelection"
            :scroll="scroll"
            :showExpandColumn="showExpandColumn"
            :showHeader="showHeader"
            :size="tableSize[0]"
            :sortDirections="sortDirections"
        >
            <!-- Ant design vue table body cell slot -->
            <template #bodyCell="{ text, record, index, column }">
                <slot name="bodyCell" :text="text" :record="record" :index="index" :column="column"></slot>
            </template>
            <!-- Ant design vue table body cell slot -->

            <!-- Ant design vue table summary slot -->
            <template #summary>
                <slot name="summary"></slot>
            </template>
            <!-- Ant design vue table summary slot -->

            <!-- Ant design vue table footer slot -->
            <template #footer>
                <div class="table-footer-selector">
                    <template v-if="pagination">
                        <a-button type="default">选择全部</a-button>
                        <a-button type="default">反向选择</a-button>
                        <a-button type="default">更多操作</a-button>
                    </template>
                </div>

                <!-- Custom pagination -->
                <a-pagination 
                    :current="pagination.current || 1" 
                    :pageSize="pagination.pageSize || 10"
                    :pageSizeOptions="pagination.pageSizeOptions || ['10', '20', '50', '100']"
                    :hideOnSinglePage="pagination.hideOnSinglePage || true"
                    :showLessItems="pagination.showLessItems || true"
                    :showQuickJumper="pagination.showQuickJumper || true"
                    :showSizeChanger="pagination.showSizeChanger || true"
                    :showTotal="pagination.showTotal || null"
                    :total="pagination.total || 0" 
                    @change="onChange"
                />
                <!-- Custom pagination -->
            </template>
            <!-- Ant design vue table footer slot -->
        </a-table>
        <!-- Table Content -->

        <!-- Columns settings modal -->
        <a-modal v-model:visible="visible" title="自定义显示列项">

        </a-modal>
        <!-- Columns settings modal -->
    </div>
</template>

<script lang="ts">
import { SyncOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
    name: "CustomTable",
    props: {
        childrenColumnName: {
            type: String,
            default: "children"
        },
        columns: {
            type: Array
        },
        components: {
            type: Object
        },
        dataSource: {
            type: Array
        },
        defaultExpandAllRows: {
            type: Boolean,
            default: false
        },
        defaultExpandedRowKeys: {
            type: Array
        },
        expandedRowKeys: {
            type: Array
        },
        expandedRowRender: {
            type: Function
        },
        expandFixed: {
            type: [Boolean, String],
            default: false
        },
        expandIcon: {
            type: Function
        },
        expandRowByClick: {
            type: Boolean,
            default: false
        },
        indentSize: {
            type: Number,
            default: 15
        },
        loading: {
            type: [Boolean, Object],
            default: false
        },
        locale: {
            type: Object,
            default() {
                return { filterConfirm: "确定", filterReset: "重置", emptyText: "暂无数据" };
            }
        },
        pagination: {
            type: Object,
            default() {
                return {};
            }
        },
        rowKey: {
            type: [String, Function],
            default: "key"
        },
        rowSelection: {
            type: Object,
            default() {
                return null;
            }
        },
        scroll: {
            type: Object
        },
        showExpandColumn: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        sortDirections: {
            type: Array,
            default() {
                return ["ascend", "descend"];
            }
        },
    },
    emits: ["refresh", "change"],
    setup(_props, context) {
        const state = reactive({
            visible: false,
            tableSize: ["default"],
        });

        // 显示自定义列项Modal
        const showVisible = () => {
            state.visible = true;
        }

        // 刷新表格
        const onRefresh = () => {
            context.emit("refresh");
        };

        // 分页、排序、筛选变化时触发
        const onChange = (page: any, pageSize: any) => {
            context.emit("change", page, pageSize);
        };

        return {
            ...toRefs(state),
            showVisible,
            onRefresh,
            onChange,
        };
    },
    components: { SyncOutlined }
})
</script>

<style lang="less" scoped>
.custom-table {
    .table-header {
        display: flex;
        justify-content: space-between;
        margin-left: -8px;
        margin-right: -8px;

        .table-header-extra {
            :deep(.ant-btn) {
                margin-left: 8px;
            }
        }

        .table-header-operate {
            :deep(.ant-btn) {
                margin-right: 8px;
            }
        }
    }

    :deep(.ant-table-wrapper) {
        margin-top: 16px;

        .ant-table-container {
            .ant-table-content {
                border-top: 1px solid #e9e9e9;
                border-left: 1px solid #e9e9e9;
                border-right: 1px solid #e9e9e9;
            }

            .ant-table-thead > tr > th {
                color: #666;
                font-weight: 700;
                background: #f2f2f2;
            }

            .table-striped td {
                background-color: #f5f5f5;
            }

            .ant-table-tbody>tr.ant-table-row:hover>td, .ant-table-tbody>tr>td.ant-table-cell-row-hover {
                background: transparent;
            }

            .ant-table-tbody>tr.ant-table-row.table-striped:hover>td, .ant-table-tbody>tr.table-striped>td.ant-table-cell-row-hover {
                background: #f5f5f5;
            }
        }

        .ant-table-footer {
            display: flex;
            flex-wrap: wrap;
            row-gap: 8px;
            justify-content: space-between;
            padding: 0;
            margin: 16px 0;
            background: unset;

            .table-footer-selector {
                margin-left: -8px;

                .ant-btn {
                    margin-left: 8px;
                }
            }
        }
    }

}
</style>