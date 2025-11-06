<template>
  <div class="data-table">
    <div v-if="loading" class="loading">加载中...</div>
    <table v-else>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :style="{ width: column.width }"
          >
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="getRowKey(row)">
          <td v-for="column in columns" :key="column.key">
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
            >
              {{ formatCellValue(row[column.key], column) }}
            </slot>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="empty">暂无数据</td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination && total > 0" class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        上一页
      </button>
      <span class="page-info">
        第 {{ currentPage }} 页，共 {{ totalPages }} 页
      </span>
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { computed } from 'vue';

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  formatter?: (value: any) => string;
}

interface Props {
  columns: TableColumn[];
  data: T[];
  loading?: boolean;
  rowKey?: string | ((row: T) => string | number);
  pagination?: boolean;
  pageSize?: number;
  total?: number;
  currentPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: false,
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const emit = defineEmits<{
  pageChange: [page: number];
}>();

const totalPages = computed(() => {
  return Math.ceil(props.total / props.pageSize);
});

const getRowKey = (row: T): string | number => {
  if (typeof props.rowKey === 'function') {
    return props.rowKey(row);
  }
  return props.rowKey ? row[props.rowKey] : JSON.stringify(row);
};

const formatCellValue = (value: any, column: TableColumn): string => {
  if (column.formatter) {
    return column.formatter(value);
  }
  if (value === null || value === undefined) {
    return '-';
  }
  return String(value);
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit('pageChange', page);
  }
};
</script>

<style scoped>
.data-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f8f9fa;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
  color: #666;
}

tbody tr:hover {
  background: #f8f9fa;
}

.empty {
  text-align: center;
  color: #999;
  padding: 40px;
}

.loading {
  padding: 40px;
  text-align: center;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.pagination button {
  padding: 8px 16px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #666;
}
</style>
