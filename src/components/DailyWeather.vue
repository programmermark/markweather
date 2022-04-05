<template>
  <view class="daily-weather">
    <Echart
      v-if="dailyWeatherOptions"
      canvas-id="daily-line"
      :option="dailyWeatherOptions"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";
import { useLocationStore } from "@/stores/location";
import { IDailyWeather, IDailyWeatherResponse } from "./interface/dailyWeather";
import Taro from "@tarojs/taro";
import apis from "../apis";
import Echart from "./Echart.vue";
import { ECOption } from "./interface/echart";
import { transHourTOText } from "@/common/js";

const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();

const dailyWeather = ref<IDailyWeather[]>([]);
const dailyWeatherOptions = ref<ECOption>();
const xAxis = ref<string[]>([]);

const setDailyWeatherOptions = (seriesData: number[]): ECOption => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      show: false,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: seriesData,
        type: "line",
        symbol: "none",
        color: "#7cb3e9",
        lineStyle: {
          width: 1,
        },
        areaStyle: {
          color: "#ebf4fd",
        },
        smooth: true,
        label: {
          show: true,
          position: "top",
          fontSize: 15,
          padding: [0, 0, 4, 0],
          formatter: "{c}°",
        },
      },
    ],
  };
};

/**
 * 获取24小时天气
 */
const fetchHoursWeather = async () => {
  const url = `${apis.dailyWeather}?location=${locationStore.lng},${locationStore.lat}&key=${apis.weatherKey}`;
  const { data } = await Taro.request<IDailyWeatherResponse<IDailyWeather>>({
    url: url,
  });
  console.log("data.hourly", data.hourly);
  dailyWeather.value = data.hourly;
  xAxis.value = dailyWeather.value
    .filter((_item, index) => index % 2)
    .map((item) => transHourTOText(item.fxTime));
  const seriesData = dailyWeather.value.map((item) => Number(item.temp));
  dailyWeatherOptions.value = setDailyWeatherOptions(seriesData);
};

watch(isFetch, (val) => {
  if (val) {
    fetchHoursWeather();
  }
});
</script>

<style lang="scss">
.daily-weather {
  height: 400px;
}
</style>
