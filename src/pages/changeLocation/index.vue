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
      <template v-slot:rightout>
        <view @click="handleClearSearchBar">取消</view>
      </template>
    </nut-searchbar>
  </view>
  <view class="options-wrapper" v-show="searchResult.length === 0">
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
  <scroll-view class="search-result-list" v-show="searchResult.length > 0">
    <view
      class="search-result-item"
      v-for="place in searchResult"
      :key="place.id"
      @click="gotoTextLocation(place)"
      >{{ place.name }}，{{ place.cityname }}，{{ place.pname }}</view
    >
  </scroll-view>
</template>

<script lang="ts" setup>
import Taro from "@tarojs/taro";
import { ref, watch } from "vue";
import { useLocationStore } from "@/stores/location";
import { ICityOption, IGetLocationByText, IPoi } from "./interface";
import apis from "@/apis/index";

const locationStore = useLocationStore();
const searchValue = ref("");
const cities: ICityOption[] = [
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
const searchResult = ref<IPoi[]>([]);

/**
 * 根据关键字搜索模糊匹配地名
 * @param text 关键字
 */
const getLocationByText = (text: string) => {
  Taro.request<IGetLocationByText>({
    url: `${apis.getPlaceByText}?keywords=${text}&key=${apis.locationKey}`,
  }).then((res) => {
    const { pois } = res.data;
    searchResult.value = pois;
  });
};

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

const gotoTextLocation = (location: IPoi) => {
  const locationArr = location.location.split(",");
  locationStore.lng = Number(locationArr[0]);
  locationStore.lat = Number(locationArr[1]);
  locationStore.cityName = location.name;
  Taro.redirectTo({
    url: "/pages/index/index",
  });
};

const handleClearSearchBar = () => {
  searchValue.value = "";
};

watch(searchValue, (val) => {
  if (val) {
    getLocationByText(val);
  } else {
    searchResult.value = [];
  }
});
</script>

<style lang="scss">
.searchbar-wrapper {
  position: fixed;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  padding: 4px 0 0;
  border-bottom: 1px solid #f2f2f2;
}
.options-wrapper {
  padding: 20px 16px;
  padding-top: 64px;
  .title {
    font-size: 16px;
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
.search-result-list {
  padding-top: 58px;
  .search-result-item {
    font-size: 14px;
    color: #000;
    padding: 12px 16px;
    border-bottom: 1px solid #f3f3f3;
  }
}
</style>
