import { weatherUrl, locationUrl } from "./common";

export default {
  /** 获取实时天气 */
  realTimeWeather: weatherUrl + "/weather/now",
  /** 获取实时空气质量 */
  realTimeAirQuality: weatherUrl + "/air/now",
  /** 根据经纬度获取当前位置 */
  getLocationByGeo: locationUrl + "/geocode/regeo",
  /** 根据当前位置获取经纬度 */
  getGeoByLocation: locationUrl + "/geocode/geo",
  /** 获取三天逐天天气预报 */
  treeDayWeather: weatherUrl + "/weather/3d",
  /** 获取七天逐天天气预报 */
  sevenDayWeather: weatherUrl + "/weather/7d",
  /** 获取24小时天气预报 */
  dailyWeather: weatherUrl + "/weather/24h",
  /** 获取生活指数 */
  indicesWeather: weatherUrl + "/indices/1d",
};
