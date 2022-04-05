<template>
  <view class="daily-weather-wrapper">
    <view class="title">24小时预报</view>
    <scroll-view class="daily-weather" :scroll-x="true">
      <view
        class="daily-weather-item"
        v-for="item in dailyWeather"
        :key="item.fxTime"
      >
        <view class="text">{{ transHourTOText(item.fxTime) }}</view>
        <text
          :class="['icon', `qi-${item.icon}`]"
          :style="{
            color: transWeatherToIconColor(item.text),
          }"
        ></text>
        <view class="text">{{ item.temp }}°</view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch } from "vue";
import { useLocationStore } from "@/stores/location";
import { IDailyWeather, IDailyWeatherResponse } from "./interface/dailyWeather";
import Taro from "@tarojs/taro";
import apis from "../apis";
import { transHourTOText, transWeatherToIconColor } from "@/common/js";

const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();

const dailyWeather = ref<IDailyWeather[]>([]);

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
.daily-weather-wrapper {
  .title {
    padding: 96px 0 20px 32px;
    color: #000;
    font-size: 36px;
    font-weight: 700;
    border-bottom: 1px solid #e5e5e5;
  }
  .daily-weather {
    display: flex;
    height: 320px;
    white-space: nowrap;
    .daily-weather-item {
      width: 12.5%;
      display: inline-flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 24px 12px;
      .text {
        font-size: 28px;
        color: #a2a8b2;
        text-align: center;
        margin: 24px 0;
        font-weight: 700;
      }
      .icon {
        font-size: 48px;
        color: #75777b;
        text-align: center;
      }
    }
  }
}
</style>
