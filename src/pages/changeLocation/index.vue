<template>
  <view class="searchbar-wrapper">
    <nut-searchbar
      v-model="searchValue"
      placeholder="请输入城市名，快速查询天气信息"
      input-background="#f2f2f2"
    >
      <template v-slot:leftin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
      <template v-slot:rightout> 取消 </template>
    </nut-searchbar>
  </view>
  <view class="options-wrapper">
    <view class="title">猜你想找</view>
    <view class="location-wrapper">
      <nut-button
        class="location-item"
        shape="square"
        type="primary"
        @click="gotoLocation"
      >
        定位</nut-button
      >
      <nut-button
        class="location-item location-item-other"
        v-for="city in cities"
        shape="square"
        type="default"
        plain
        @click="gotoCityLocation(city)"
        >{{ city.cityName }}</nut-button
      >
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { ref } from "vue";
import { useLocationStore } from "@/stores/location";
import { ICityOption } from "./interface.ts";

const locationStore = useLocationStore();
const searchValue = ref("");
const cities: ICityOption = [
  {
    cityName: "北京市",
    latitude: 39.90469,
    longitude: 116.407173,
  },
  {
    cityName: "上海市",
    latitude: 31.230416,
    longitude: 121.473658,
  },
  {
    cityName: "广州市",
    latitude: 23.129163,
    longitude: 113.264385,
  },
  {
    cityName: "深圳市",
    latitude: 22.54286,
    longitude: 114.059563,
  },
  {
    cityName: "杭州市",
    latitude: 30.274151,
    longitude: 120.155151,
  },
  {
    cityName: "南京市",
    latitude: 32.041544,
    longitude: 118.782577,
  },
  {
    cityName: "武汉市",
    latitude: 30.593099,
    longitude: 114.305393,
  },
  {
    cityName: "成都市",
    latitude: 30.572818,
    longitude: 104.066541,
  },
];

const gotoLocation = () => {
  Taro.getLocation({
    type: "wgs84",
    success: function (res) {
      locationStore.lat = res.latitude;
      locationStore.lng = res.longitude;
      Taro.redirectTo({
        url: "/pages/index/index",
      });
    },
  });
};

const gotoCityLocation = (city: ICityOption) => {
  locationStore.lat = city.latitude;
  locationStore.lng = city.longitude;
  locationStore.cityName = city.cityName;
  Taro.redirectTo({
    url: "/pages/index/index",
  });
};
</script>

<style lang="scss">
.searchbar-wrapper {
  padding: 4px 0;
  border-bottom: 1px solid #f2f2f2;
}
.options-wrapper {
  padding: 16px 16px;
  .title {
    font-size: 18px;
    margin-bottom: 4px;
  }
  .location-wrapper {
    .location-item {
      display: inline-block;
      width: calc(33.3% - 12px);
      margin: 6px 12px 0 0;
      box-sizing: border-box;
      border-radius: 4px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    .location-item-other {
      border: none;
      color: #6a6a6a;
      background: #f2f2f2;
    }
  }
}
</style>
