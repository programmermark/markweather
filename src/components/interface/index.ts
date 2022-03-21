export interface IWeatherResponse<T> {
  code: string /** API状态码，具体含义请参考状态码 */;
  updateTime: string /** 当前API的最近更新时间 */;
  fxLink: string /** 当前数据的响应式页面，便于嵌入网站或应用 */;
  now: T /** 当前天气情况 */;
}

export interface ITreeDayWeatherResponse<T> {
  code: string /** API状态码，具体含义请参考状态码 */;
  updateTime: string /** 当前API的最近更新时间 */;
  fxLink: string /** 当前数据的响应式页面，便于嵌入网站或应用 */;
  daily: T[] /** 三天天气情况 */;
}

export interface IGeocode {
  formatted_address: string /** 结构化地址信息: 省份＋城市＋区县＋城镇＋乡村＋街道＋门牌号码  */;
  country: string /** 国家, 国内地址默认返回中国 */;
  province: string /** 地址所在的省份名, 例如：北京市。此处需要注意的是，中国的四大直辖市也算作省级单位。 */;
  city: string /** 地址所在的城市名, 例如：北京市 */;
  citycode: string /** 城市编码 */;
  district: string[] /** 地址所在的区县名, 例如：海淀区 */;
  street: string[] /** 地址所在的街道名, 例如：阜通东大街 */;
  number: string[] /** 地址所在的门牌号码, 例如：科技园路6号 */;
  adcode: string /** 地址所在的区域编码, 例如：110101 */;
  location: string /** 地址所在的经纬度坐标, 例如：39.98871, 116.43234 */;
  level: string /** 地址所在的匹配级别, 参见下方的地理编码匹配级别列表 */;
}

export interface IGetGeoByLocation {
  status: "0" | "1" /** 返回值为 0 或 1，0 表示请求失败；1 表示请求成功。 */;
  count: string /** 返回结果的个数 */;
  info: string /** 当 status 为 0 时，info 会返回具体错误原因，否则返回“OK”。详情可以参阅info状态表 */;
  geocodes: IGeocode[];
}
