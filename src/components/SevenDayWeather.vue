<template>
  <view class="seven-day-weather">
    <view class="title">7天预报</view>
    <scroll-view class="scroll-view" :scroll-x="true">
      <Echart
        v-if="sevenDayWeatherOptions"
        canvas-id="daily-line"
        :option="sevenDayWeatherOptions"
      />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import Taro from "@tarojs/taro";
import { ref, toRefs, watch } from "vue";
import apis from "../apis";
import Echart from "./Echart.vue";
import { ITreeDayWeatherResponse } from "./interface";
import { ECOption } from "./interface/echart";
import { ITreeDayWeather } from "./interface/realTimeWeather";
const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();

const sevenDayWeather = ref<ITreeDayWeather[]>();

const sevenDayWeatherOptions: ECOption = {
  tooltip: {
    show: false,
  },
  toolbox: {
    show: false,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    show: false,
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: "line",
      data: [10, 11, 13, 11, 12, 12, 9],
      color: "#c9ecf7",
      symbol: "circle",
      symbolSize: 8,
      label: {
        show: true,
        position: "top",
        fontSize: 15,
        padding: [0, 0, 4, 0],
        formatter: "{c}°",
      },
    },
    {
      type: "line",
      label: {
        show: true,
        position: "bottom",
        fontSize: 15,
        padding: [0, 0, 4, 0],
        formatter: "{c}°",
      },
      data: [1, -2, 2, 5, 3, 2, 0],
      color: "#ffed96",
      symbol: "circle",
      symbolSize: 8,
    },
  ],
};

/**
 * 获取三天天气
 */
const getSevenDayWeather = async () => {
  const url = `${apis.sevenDayWeather}?location=${locationStore.lng},${locationStore.lat}&key=${apis.weatherKey}`;
  const res = await Taro.request<ITreeDayWeatherResponse<ITreeDayWeather>>({
    url: url,
  });
  if (res.data.code === "200") {
    sevenDayWeather.value = res.data.daily;
  } else {
    Taro.showToast({
      title: "获取天气信息失败",
      icon: "error",
    });
  }
};

watch(isFetch, (val) => {
  if (val) {
    getSevenDayWeather();
  }
});
</script>

<style lang="scss">
.seven-day-weather {
  .title {
    padding: 32px;
    color: #000;
    font-size: 36px;
    font-weight: 700;
    border-bottom: 1px solid #e5e5e5;
  }
  .scroll-view {
    width: 140%;
    height: 400px;
  }
}
</style>
