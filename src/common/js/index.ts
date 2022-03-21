/**
 * 转换空气质量指数为等级颜色
 * @param aqi 空气质量指数
 */
export const transAirQualityToColor = (aqi: number) => {
  let color = "";
  if (aqi >= 0 && aqi <= 50) {
    return "#56AE88";
  } else if (aqi >= 51 && aqi <= 100) {
    return "#E6C65C";
  } else if (aqi >= 101 && aqi <= 150) {
    return "#FFA500";
  } else if (aqi >= 151 && aqi <= 200) {
    return "#FF0000";
  } else if (aqi >= 201 && aqi <= 300) {
    return "#734A12";
  } else if (aqi > 300) {
    return "#B22222";
  }
  return color;
};

/**
 * 转换天气文本为图标颜色
 * @param weather
 */
export const transWeatherToIconColor = (weather: string) => {
  let color = "";
  if (weather.includes("雨")) {
    color = "#4FA4F8";
  } else if (weather.includes("雪")) {
    color = "#F5FAFC";
  } else if (weather.includes("云") || weather.includes("阴")) {
    color = "#bce3ff";
  } else if (weather.includes("晴")) {
    color = "#F2CA5B";
  } else if (weather.includes("风")) {
    color = "#eeeeee";
  } else {
    color = "#F2CA5B";
  }
  return color;
};
