<template>
  <view class="indices-weather-wrapper">
    <view class="title">
      <text> 生活指数 </text>
    </view>
    <view>
      <view
        class="card"
        v-for="item in indicesWeather"
        :key="item.name"
        @tap="() => handleTap(item.text)"
      >
        <view>
          <text :class="[transTypeToIcon(item.type), 'icon']"></text>
        </view>
        <view class="category">{{ item.category }}</view>
        <view class="name">{{ transTypeToText(item.type) }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import Taro from "@tarojs/taro";
import { ref, toRefs, watch } from "vue";
import apis from "../apis";
import { ITreeDayWeatherResponse } from "./interface";
import { IIndicesWeather } from "./interface/indicesWeather";

const props = withDefaults(defineProps<{ isFetch: boolean }>(), {
  isFetch: false,
});

const { isFetch } = toRefs(props);

const locationStore = useLocationStore();
/** 指数类型 */
const types = ["8", "2", "3", "9", "1", "6", "5", "10"];
const indicesWeather = ref<IIndicesWeather[]>([]);

/**
 * 转换指数类型为对应图标
 * @param type 指数类型
 */
const transTypeToIcon = (type: string) => {
  let icon = "";
  switch (type) {
    case "8":
      icon = "sofa";
      break;
    case "2":
      icon = "wash-car";
      break;
    case "3":
      icon = "clothes";
      break;
    case "9":
      icon = "catch-cold";
      break;
    case "1":
      icon = "exercise";
      break;
    case "6":
      icon = "airplane";
      break;
    case "5":
      icon = "umbrella";
      break;
    case "10":
      icon = "air-pollution";
      break;
    default:
      icon = "sofa";
      break;
  }
  return icon ? `iconfont icon-${icon}` : "";
};

/**
 * 转换指数类型为简化的文本描述
 * @param type 指数类型
 */
const transTypeToText = (type: string) => {
  let text = "";
  switch (type) {
    case "8":
      text = "舒适度";
      break;
    case "2":
      text = "洗车";
      break;
    case "3":
      text = "穿衣";
      break;
    case "9":
      text = "感冒";
      break;
    case "1":
      text = "运动";
      break;
    case "6":
      text = "旅游";
      break;
    case "5":
      text = "紫外线";
      break;
    case "10":
      text = "空气污染";
      break;
    default:
      text = "";
      break;
  }
  return text;
};

/**
 * 获取生活指数
 */
const fetchIndicesWeather = async () => {
  const url = `${apis.indicesWeather}?location=${locationStore.lng},${
    locationStore.lat
  }&key=${apis.weatherKey}&type=${String(types)}`;
  const res = await Taro.request<ITreeDayWeatherResponse<IIndicesWeather>>({
    url: url,
  });
  if (res.data.code === "200") {
    let dataList = res.data.daily;
    let sortList: IIndicesWeather[] = [];
    for (let i = 0; i < types.length; i++) {
      const item = dataList.find((item) => item.type === types[i]);
      if (item) {
        sortList.push(item);
      }
    }
    indicesWeather.value = sortList;
  } else {
    Taro.showToast({
      title: "获取生活指数信息失败",
      icon: "error",
    });
  }
};

const handleTap = (msg: string) => {
  Taro.showToast({
    title: msg,
    icon: "none",
  });
};

watch(isFetch, (val) => {
  if (val) {
    fetchIndicesWeather();
  }
});
</script>

<style lang="scss">
.indices-weather-wrapper {
  padding: 60px 0;
  .title {
    font-size: 18px;
    padding-left: 16px;
    padding-bottom: 12px;
    font-weight: 600;
    border-bottom: 1px solid #e5e5e5;
  }
  .card {
    display: inline-block;
    width: 25%;
    text-align: center;
    padding: 16px;
    border-right: 1px dotted #e5e5e5;
    border-bottom: 1px dotted #e5e5e5;
    box-sizing: border-box;
    .category {
      margin-top: 8px;
      color: #111111;
      font-size: 16px;
    }
    .name {
      margin-top: 8px;
      color: #9f9f9f;
      font-size: 14px;
    }
    .icon {
      font-size: 26px;
      color: #66b2ff;
    }
  }
}
</style>
