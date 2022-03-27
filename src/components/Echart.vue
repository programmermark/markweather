<template>
  <EcCanvas ref="echartRef" :canvas-id="canvasId" :ec="ec" />
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { onMounted, ref, toRefs, watch } from "vue";
import * as echarts from "echarts";
import EcCanvas from "./ec-canvas/index.vue";
import { isEqual } from "lodash/core";
import { ECOption } from "./interface/echart";

const props = withDefaults(
  defineProps<{
    canvasId: string;
    option: ECOption;
  }>(),
  {
    canvasId: "",
  }
);

const { option } = toRefs(props);
const echartRef = ref<any>(null);
const chart = ref<any>(null);

const initChart = (canvas, width, height, dpr) => {
  chart.value = echarts.init(canvas, undefined, {
    width,
    height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);
  refresh(option.value);
  return chart;
};

const ec: {
  lazyLoad?: boolean;
  onInit: (canvas, width, height, dpr) => void;
} = {
  // lazyLoad: true,
  onInit: initChart,
};

const refresh = (option) => {
  chart.value?.setOption(option);
};

const init = (option) => {
  echartRef.value.init((canvas, width, height, dpr) => {
    chart.value = echarts.init(canvas, undefined, {
      width,
      height,
      devicePixelRatio: dpr,
    });
    canvas.setChart(chart);
    refresh(option);
    return chart;
  });
};

watch(option, (nv, ov) => {
  if (!isEqual(nv, ov)) {
    refresh(option.value);
  }
});

onMounted(() => {
  Taro.nextTick(() => {
    ec.lazyLoad && init(option.value);
  });
});
</script>

<style lang="scss"></style>
