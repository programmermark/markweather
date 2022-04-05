<template>
  <view class="index">
    <!-- 实时天气信息 -->

    <RealTimeWeather :isFetch="hasGetLocation" />
    <!-- 今明两天天气信息 -->
    <!-- 24小时天气预报 -->
    <DailyWeather :isFetch="hasGetLocation" />
    <!-- 7天天气预报 -->
    <SevenDayWeather :isFetch="hasGetLocation" />
    <!-- 生活指数 -->
    <IndicesWeather :isFetch="hasGetLocation" />
  </view>
</template>

<script lang="ts" setup>
import Taro, { useReady } from "@tarojs/taro";
import "./index.scss";
import { useLocationStore } from "@/stores/location";
import RealTimeWeather from "@/components/RealTimeWeather.vue";
import { ref } from "vue";
import apis from "@/apis/index";
import { IGetGeoByLocation } from "@/components/interface";
import IndicesWeather from "@/components/IndicesWeather.vue";
import DailyWeather from "@/components/DailyWeather.vue";
import SevenDayWeather from "@/components/SevenDayWeather.vue";

const locationStore = useLocationStore();
const defaultCity = "北京";
/** 已经获取到位置信息 */
const hasGetLocation = ref(false);

/**
 * 根据位置信息获取经纬度
 * @param text 位置名，如：北京
 */
const getGeoByLocation = (text: string) => {
  Taro.request<IGetGeoByLocation>({
    url: `${apis.getGeoByLocation}?address=${text}&key=${apis.locationKey}`,
  }).then((res) => {
    const { geocodes } = res.data;
    const filterGeocodes = geocodes.filter((geocode) =>
      geocode.city.includes(defaultCity)
    );
    if (filterGeocodes.length > 0) {
      const locationArr = filterGeocodes[0].location.split(",");
      locationStore.lng = Number(locationArr[0]);
      locationStore.lat = Number(locationArr[1]);
      hasGetLocation.value = true;
    }
  });
};

/**
 * 用户拒绝授权后的弹窗
 */
const showModal = () => {
  Taro.showModal({
    title: "定位失败",
    content: `请先允许“使用我的地理位置”后，再查看定位城市天气信息，小源天气默认为您展示${defaultCity}天气信息。`,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        Taro.openSetting({
          success: function (res) {
            if (!res.authSetting["scope.userLocation"]) {
              getGeoByLocation(defaultCity);
            }
          },
        });
      }
    },
  });
};

/**
 * 获取位置信息
 */
const getLocation = () => {
  Taro.getLocation({
    type: "wgs84",
    success: function (res) {
      locationStore.lat = res.latitude;
      locationStore.lng = res.longitude;
      hasGetLocation.value = true;
    },
  });
};

useReady(() => {
  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.userLocation" 这个 scope
  Taro.getSetting({
    success: function (res) {
      if (!res.authSetting["scope.userLocation"]) {
        Taro.authorize({
          scope: "scope.userLocation",
          success: function () {
            // 用户已经同意小程序使用位置功能，后续调用 Taro.getLocation 接口不会弹窗询问
            getLocation();
          },
          fail: function () {
            showModal();
          },
        });
      } else {
        getLocation();
      }
    },
  });
});
</script>
