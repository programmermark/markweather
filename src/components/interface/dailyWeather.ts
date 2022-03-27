export interface IDailyWeather {
  fxTime: string /** 预报时间 */;
  temp: string /** 温度 */;
  icon: string /** 天气图标 */;
  text: string /** 天气描述 */;
  wind360: string /** 风向360 */;
  windDir: string /** 风向 */;
  windScale: string /** 风力等级 */;
  windSpeed: string /** 风速 */;
  humidity: string /** 湿度 */;
  pop: string /** 降水概率 */;
  precip: string /** 降水量 */;
  pressure: string /** 气压 */;
  cloud: string /** 云量 */;
  dew: string /** 露点温度 */;
}

export interface IDailyWeatherResponse<T> {
  status: string /** 状态码 */;
  updateTime: string /** 当前API的最近更新时间 */;
  fxLink: string /** 当前数据的响应式页面，便于嵌入网站或应用 */;
  hourly: T[] /** 结果集 */;
}
