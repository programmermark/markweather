/** 实时天气接口定义 */
export interface IRealTimeWeather {
  cloud: string /** 云量，百分比数值。可能为空 */;
  dew: string /**露点温度。可能为空 */;
  feelsLike: string /** 体感温度，默认单位：摄氏度 */;
  humidity: string /** 相对湿度，百分比数值 */;
  icon: string /** 天气状况和图标的代码，图标可通过天气状况和图标下载 */;
  obsTime: string /** 数据观测时间 */;
  precip: string /** 当前小时累计降水量，默认单位：毫米 */;
  pressure: string /** 大气压强，默认单位：百帕 */;
  temp: string /** 温度，默认单位：摄氏度 */;
  text: string /** 天气状况的文字描述，包括阴晴雨雪等天气状态的描述 */;
  vis: string /** 能见度，默认单位：公里 */;
  wind360: string /** 风向360角度 */;
  windDir: string /** 风向 */;
  windScale: string /** 风力等级 */;
  windSpeed: string /** 风速，公里/小时 */;
}

/** 实时空气质量接口定义 */
export interface IRealTimeAirQuality {
  pubTime: string /** 空气质量数据发布时间 */;
  aqi: string /** 空气质量指数 */;
  level: string /** 空气质量指数等级 */;
  category: string /** 空气质量指数级别 */;
  primary: string /** 空气质量的主要污染物，空气质量为优时，返回值为NA */;
  pm10: string /** PM10的浓度，单位：微克/立方米 */;
  pm2p5: string /** PM2.5的浓度，单位：微克/立方米 */;
  no2: string /** 二氧化氮的浓度，单位：微克/立方米 */;
  so2: string /** 二氧化硫的浓度，单位：微克/立方米 */;
  co: string /** 一氧化碳的浓度，单位：微克/立方米 */;
  o3: string /** 臭氧的浓度，单位：微克/立方米 */;
}

/** 三天天气预报接口定义 */
export interface ITreeDayWeather {
  fxDate: string /** 日期 */;
  tempMax: string /** 最高温度 */;
  tempMin: string /** 最低温度 */;
  iconDay: string /** 白天天气状况图标代码 */;
  textDay: string /** 白天天气状况描述 */;
  iconNight: string /** 夜间天气状况图标代码 */;
  textNight: string /** 晚间天气状况描述 */;
}

export interface ILocation {
  province: string /** 地址所在的省份名, 例如：北京市。此处需要注意的是，中国的四大直辖市也算作省级单位。 */;
  city: string /** 地址所在的城市名, 例如：北京市 */;
  citycode: string /** 城市编码 */;
  district: string[] /** 地址所在的区县名, 例如：海淀区 */;
  adcode: string /** 地址所在的区域编码, 例如：110101 */;
  township: string /**  坐标点所在乡镇/街道（此街道为社区街道，不是道路信息） */;
  towncode: string /** 乡镇街道编码, 例如：110101001000 */;
  /** 社区信息列表 */
  neighborhood: {
    name: string /** 社区名称, 例如：北京大学  */;
    type: string /** POI类型, 例如：科教文化服务;学校;高等院校 */;
  };
  /** 楼信息列表 */
  building: {
    name: string /** 建筑名称, 例如：万达广场 */;
    type: string /** 类型, 例如：科教文化服务;学校;高等院校 */;
  };
  /** 门牌信息列表 */
  streetNumber: {
    street: string /** 街道名称, 例如：中关村北二条 */;
    number: string /** 门牌号码, 例如：10号楼 */;
    location: string /** 坐标点，经纬度，经度在前，纬度在后，经纬度间以","分隔 */;
    direction: string /** 坐标点的方向，坐标点所处街道方位, 单位为度，0-360 */;
    distance: string /** 坐标点到经纬度的距离，单位为米 */;
  };
}

/**
 * 根据geo获取地址信息
 */
export interface IGetLocationByGeo {
  status: "0" | "1" /** 返回值为 0 或 1，0 表示请求失败；1 表示请求成功。 */;
  info: string /** 当 status 为 0 时，info 会返回具体错误原因，否则返回“OK”。详情可以参阅info状态表 */;
  regeocode: {
    formatted_address: string /** 地址信息 */;
    addressComponent: ILocation;
  };
}
