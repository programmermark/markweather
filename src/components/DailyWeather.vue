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

const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();

const dailyWeather = ref<IDailyWeather[]>([]);
const dailyWeatherOptions = ref<ECOption>({
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      areaStyle: {},
    },
  ],
});

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
