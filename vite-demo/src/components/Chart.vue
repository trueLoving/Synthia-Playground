<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

export interface ChartOption {
  title?: any;
  tooltip?: any;
  legend?: any;
  xAxis?: any;
  yAxis?: any;
  series?: any[];
  [key: string]: any;
}

interface Props {
  option: ChartOption;
  width?: string | number;
  height?: string | number;
  theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  theme: 'default',
});

const chartContainer = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value, props.theme);
    chartInstance.setOption(props.option);

    // 响应式调整
    const resizeObserver = new ResizeObserver(() => {
      chartInstance?.resize();
    });
    resizeObserver.observe(chartContainer.value);

    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  }
});

watch(
  () => props.option,
  newOption => {
    if (chartInstance) {
      chartInstance.setOption(newOption, true);
    }
  },
  { deep: true }
);

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>

<style scoped>
.chart-container {
  width: v-bind('typeof width === "string" ? width : width + "px"');
  height: v-bind('typeof height === "string" ? height : height + "px"');
}
</style>
