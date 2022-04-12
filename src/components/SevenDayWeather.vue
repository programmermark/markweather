<template>
  <view class="seven-day-weather-wrapper">
    <view class="title">7天预报</view>
    <view class="seven-day-weather">
      <view
        class="seven-day-weather-item"
        v-for="(item, index) in sevenDayWeather"
        :key="index"
      >
        <view class="date">
          <view class="week-text">{{ transDateToWeek(item.fxDate) }}</view>
          <view class="date-text">{{
            formatTime(item.fxDate, "MM月dd日")
          }}</view>
        </view>
        <text
          :class="['icon', `qi-${item.iconDay}`]"
          :style="{
            color: transWeatherToIconColor(item.textDay),
          }"
        ></text>
        <view class="text">{{ item.tempMax }}°</view>
        <view class="temp-bar"></view>
        <view class="text">{{ item.tempMin }}°</view>
        <text
          :class="['icon', `qi-${item.iconNight}`]"
          :style="{
            color: transWeatherToIconColor(item.textNight),
          }"
        ></text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import Taro from "@tarojs/taro";
import { ref, toRefs, watch } from "vue";
import apis from "../apis";
import {
  transWeatherToIconColor,
  formatTime,
  transDateToWeek,
} from "@/common/js";
import { ITreeDayWeatherResponse } from "./interface";
import { ITreeDayWeather } from "./interface/realTimeWeather";

const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();

const sevenDayWeather = ref<ITreeDayWeather[]>();

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
.seven-day-weather-wrapper {
  .title {
    padding: 12px 0 10px 16px;
    color: #000;
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid #e5e5e5;
  }
  .seven-day-weather {
    width: 100%;
    margin-top: 24px;
    .seven-day-weather-item {
      display: flex;
      align-items: center;
      background-color: #fafcfd;
      margin: 8px 20px 0;
      padding: 12px 12px;
      border-radius: 8px;
      .date {
        display: flex;
        flex-direction: column;
        margin-right: 17px;
        .week-text {
          font-size: 18px;
          color: #000;
        }
        .date-text {
          font-size: 16px;
          color: #767676;
        }
      }
      .icon {
        margin: 0 12px;
      }
      .text {
        font-size: 16px;
        color: #000;
        padding: 0 8px;
      }
      .temp-bar {
        flex: 1;
        height: 4px;
        background-color: #000;
        border-radius: 4px;
        background: linear-gradient(to right, #ff8766, #436fff);
      }
    }
  }
}
</style>
