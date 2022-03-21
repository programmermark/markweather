ITreeDayWeatherResponse, , ITreeDayWeather
<template>
  <view :class="['wrapper', realTimeWeatherBg]">
    <view class="location-wrapper">
      <text class="iconfont icon-location icon" />
      <view class="location-text">
        <text class="text">{{ district }}</text>
        <text>{{ street }}</text>
      </view>
      <text class="iconfont icon-arrow-down icon" />
    </view>
    <view>
      <view class="temperature-wrapper">
        <text class="number">{{ realTimeWeather?.temp }}</text>
        <text class="unit">°</text>
      </view>
      <view class="air-quality">
        <text class="text">{{ realTimeWeather?.text }}</text>
        <view class="quality" :style="airQualityBgColor">
          <text class="aqi">{{ realTimeAirQuality?.aqi }}</text>
          <text class="category">{{ realTimeAirQuality?.category }}</text>
        </view>
      </view>
      <view class="other-info">
        <view class="wind-scale"
          >风力
          <text class="value">{{ realTimeWeather?.windScale }}级</text>
        </view>
        <view class="wind-scale"
          >湿度
          <text class="value">{{ realTimeWeather?.humidity }}%</text>
        </view>
        <view class="wind-scale"
          >气压
          <text class="value">{{ realTimeWeather?.pressure }}hPa</text>
        </view>
      </view>
    </view>
    <view class="tree-day-wrapper">
      <view
        class="daily-weather"
        v-for="(weather, index) in twoDayWeather"
        :key="index"
      >
        <view class="flex-wrapper temperature">
          <text>{{ index === 0 ? "今天" : "明天" }}</text>
          <view class="flex-col-reverse flex-wrapper">
            <view class="flex-row-reverse">
              <text>{{ weather.tempMax }}</text>
              <text class="sperate">/</text>
              <text>{{ weather.tempMin }}</text>
            </view>
          </view>
        </view>
        <view class="flex-wrapper">
          <text>{{
            transWeatherText(weather.textDay, weather.textNight)
          }}</text>
          <view class="flex-col-reverse flex-wrapper">
            <view class="flex-row-reverse">
              <text
                :class="[
                  new Date().getHours() > 12
                    ? `qi-${weather.iconDay}`
                    : `qi-${weather.iconNight}`,
                  'icon',
                ]"
                :style="{
                  color: transWeatherToIconColor(
                    transWeatherText(weather.textDay, weather.textNight)
                  ),
                }"
              >
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { onMounted, ref, watch, toRefs, computed } from "vue";
import { useLocationStore } from "@/stores/location";
import { transAirQualityToColor, transWeatherToIconColor } from "@/common/js";
import apis from "../apis";
import { ITreeDayWeatherResponse, IWeatherResponse } from "./interface";
import {
  IGetLocationByGeo,
  ILocation,
  IRealTimeAirQuality,
  IRealTimeWeather,
  ITreeDayWeather,
} from "./interface/realTimeWeather";

const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();

const location = ref<ILocation>();
const realTimeWeather = ref<IRealTimeWeather>();
const treeDayWeather = ref<ITreeDayWeather[]>();
const realTimeAirQuality = ref<IRealTimeAirQuality>();

/** 今天和明天天气 */
const twoDayWeather = computed(() => {
  if (treeDayWeather.value === undefined) {
    return [];
  }
  return treeDayWeather.value.slice(0, 2);
});

/** 转换天气为文字 */
const transWeatherText = (textDay: string, textNight: string) => {
  return new Date().getHours() > 12 ? textDay : textNight;
};

/** 空气质量背景色 */
const airQualityBgColor = computed(() => {
  if (realTimeAirQuality.value) {
    return `background-color: ${transAirQualityToColor(
      Number(realTimeAirQuality.value.aqi)
    )}`;
  }
  return "";
});

/** 实时天气背景样式 */
const realTimeWeatherBg = computed(() => {
  let bgClass = "";
  if (!realTimeWeather.value) {
    return bgClass;
  }
  const text = realTimeWeather.value.text;
  if (text.includes("雨")) {
    bgClass = "bg-rainy";
  } else if (text.includes("雪")) {
    bgClass = "bg-snow";
  } else if (text.includes("云") || text.includes("阴")) {
    bgClass = "bg-cloudy";
  } else if (text.includes("晴")) {
    bgClass = "bg-sunny";
  } else if (text.includes("风")) {
    bgClass = "bg-windy";
  } else {
    bgClass = "bg-sunny";
  }
  return bgClass;
});

/** 区县 */
const district = computed(() => {
  if (location.value) {
    return location.value.district;
  }
  return "";
});

/** 街道 */
const street = computed(() => {
  if (location.value) {
    return location.value.streetNumber.street;
  }
  return "";
});

/** 获取实时天气 */
const getRealTimeWeather = async () => {
  const url = `${apis.realTimeWeather}?location=${locationStore.lng},${locationStore.lat}&key=${apis.weatherKey}`;
  const res = await Taro.request<IWeatherResponse<IRealTimeWeather>>({
    url: url,
  });
  if (res.data.code === "200") {
    realTimeWeather.value = res.data.now;
  } else {
    Taro.showToast({
      title: "获取天气信息失败",
      icon: "error",
    });
  }
};

/** 获取实时空气质量 */
const getRealTimeAirQuality = async () => {
  const url = `${apis.realTimeAirQuality}?location=${locationStore.lng},${locationStore.lat}&key=${apis.weatherKey}`;
  const res = await Taro.request<IWeatherResponse<IRealTimeAirQuality>>({
    url: url,
  });
  if (res.data.code === "200") {
    realTimeAirQuality.value = res.data.now;
  } else {
    Taro.showToast({
      title: "获取空气质量信息失败",
      icon: "error",
    });
  }
};

/**
 * 获取三天天气
 */
const getTreeDayWeather = async () => {
  const url = `${apis.treeDayWeather}?location=${locationStore.lng},${locationStore.lat}&key=${apis.weatherKey}`;
  const res = await Taro.request<ITreeDayWeatherResponse<ITreeDayWeather>>({
    url: url,
  });
  if (res.data.code === "200") {
    treeDayWeather.value = res.data.daily;
  } else {
    Taro.showToast({
      title: "获取天气信息失败",
      icon: "error",
    });
  }
};

/** 根据经纬度获取位置信息 */
const getLocationByGeo = async () => {
  const url = `${apis.getLocationByGeo}?location=${locationStore.lng},${locationStore.lat}&key=${apis.locationKey}`;
  const res = await Taro.request<IGetLocationByGeo>({
    url: url,
  });
  if (res.data.status === "1") {
    location.value = res.data.regeocode.addressComponent;
  } else {
    Taro.showToast({
      title: "获取位置信息信息失败",
      icon: "error",
    });
  }
};

watch(isFetch, (val) => {
  if (val) {
    getRealTimeWeather();
    getRealTimeAirQuality();
    getLocationByGeo();
    getTreeDayWeather();
  }
});

onMounted(() => {
  Taro.nextTick(() => {
    getRealTimeWeather();
    getRealTimeAirQuality();
    getLocationByGeo();
    getTreeDayWeather();
  });
});
</script>

<style lang="scss">
.wrapper {
  width: 100%;
  height: 1000px;
  position: relative;
}
.wrapper::after {
  content: "";
  opacity: 0.4;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(2px);
}
.bg-cloudy::after {
  background-image: url(../assets/image/cloudy.jpg);
}
.bg-rainy::after {
  background-image: url(../assets/image/rainy.jpg);
}
.bg-snow::after {
  background-image: url(../assets/image/snow.jpg);
}
.bg-sunny::after {
  background-image: url(../assets/image/sunny.jpg);
}
.bg-windy::after {
  background-image: url(../assets/image/windy.jpg);
}

.location-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #000;
  padding-top: 48px;
  .location-text {
    display: flex;
    align-items: center;
    padding: 0 16px;
    .text {
      padding-right: 8px;
    }
  }
}
.icon {
  font-size: 36px;
  color: #000;
}

.temperature-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 80px;
  font-size: 240px;
  font-weight: 100;
  .unit {
    font-size: 120px;
    position: relative;
    top: 20px;
  }
}

.air-quality {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 40px;
  .text {
    color: #000;
    padding-right: 32px;
    border-right: 1px solid #8c9194;
  }
  .quality {
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 36px;
    margin-left: 30px;
    padding: 8px 16px;
    border-radius: 8px;
    .aqi {
      margin: 0 16px;
    }
    .category {
      margin-right: 16px;
    }
  }
}
.other-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 64px;
  .wind-scale {
    display: flex;
    align-items: center;
    color: #333;
    margin-right: 40px;
    font-size: 32px;
    .value {
      padding-left: 12px;
    }
  }
}
.tree-day-wrapper {
  width: 100%;
  position: relative;
  margin-top: 128px;
  padding: 20px 0;
  .daily-weather {
    display: inline-block;
    width: 50%;
    padding: 0 32px;
    box-sizing: border-box;
    font-size: 36px;
    &:first-child {
      border-right: 1px solid #e1e2e4;
    }
    .temperature {
      padding-bottom: 20px;
    }
  }
}

.flex-wrapper {
  display: flex;
  align-items: center;
}
.flex-col-reverse {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
}
.flex-row-reverse {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  .sperate {
    padding: 0 8px;
  }
  .icon {
    font-size: 40px;
  }
}
</style>
