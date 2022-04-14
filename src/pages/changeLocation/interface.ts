export interface ICityOption {
  cityName: string;
  latitude: number;
  longitude: number;
}

export interface IPoi {
  id: string;
  name: string /** 位置名 */;
  location: string /** 经纬度, 格式：X,Y */;
  pname: string /** 所在省份名称 */;
  cityname: string /** 所在城市名称 */;
}

export interface IGetLocationByText {
  pois: IPoi[];
}
