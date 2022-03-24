export interface IIndicesWeather {
  date: string /** 预报日期 */;
  type: string /** 生活指数类型ID */;
  name: string /** 生活指数类型的名称 */;
  level: string /** 生活指数预报等级 */;
  category: string /** 生活指数预报级别名称 */;
  text: string /** 生活指数预报的详细描述，可能为空 */;
}
