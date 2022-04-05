export interface IDateFormat {
  "M+": number;
  "d+": number;
  "h+": number;
  "m+": number;
  "s+": number;
  "q+": number;
  S: number;
  [index: string]: number;
}

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

/**
 * 转换传入的时间为指定的格式
 * @param timestamp 时间戳(支持字符串和数字)
 * @param pattern 时间格式，如: yyyy-MM-dd hh:mm:ss
 * @returns
 */
export function formatTime(
  timestamp: number | string = 1585734546,
  pattern = "yyyy-MM-dd hh:mm:ss"
): string {
  let dateObj;
  if (typeof timestamp === "number") {
    dateObj = new Date(timestamp);
  } else if (typeof timestamp === "string") {
    if (!isNaN(Number(timestamp))) {
      dateObj = new Date(Number(timestamp));
    } else {
      const timeString = timestamp.replace(/-/g, "/");
      dateObj = new Date(Date.parse(timeString));
    }
  } else {
    return "请传入时间戳或者时间字符串";
  }
  return dateFormat(dateObj, pattern);
}

/**
 * 把时间对象转换成指定的格式
 * @param date 时间对象
 * @param pattern 时间格式，如: yyyy-MM-dd
 * @returns
 */
function dateFormat(date: Date, pattern: string) {
  if (date instanceof Date) {
    const o: IDateFormat = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(pattern)) {
      pattern = pattern.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp("(" + k + ")").test(pattern)) {
        const replaceStr =
          RegExp.$1.length === 1
            ? String(o[k])
            : `00${o[k]}`.substr(String(o[k]).length);
        pattern = pattern.replace(RegExp.$1, replaceStr);
      }
    }
    return pattern;
  } else {
    return date;
  }
}

export function getWeek(date: Date) {
  const week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return week[date.getDay()];
}

/**
 * 转换日期字符串为小时数文本
 * @param dateStr 日期字符串
 * @returns
 */
export function transHourTOText(dateStr: string) {
  const nowHour = new Date().getHours();
  const nowDay = new Date().getDate();
  const dateHour = new Date(dateStr).getHours();
  const dateDay = new Date(dateStr).getDate();
  let text = "";
  if (nowHour === dateHour && nowDay === dateDay) {
    text = "现在";
  } else if (dateHour === 0) {
    text = "明天";
  } else if (dateHour < 10) {
    text = `0${dateHour}:00`;
  } else {
    text = `${dateHour}:00`;
  }
  return text;
}

/**
 * 转换日期字符串为星期文本
 * @param dateStr 日期字符串
 * @returns
 */
export function transDateToWeek(dateStr: string) {
  const date = new Date(dateStr);
  const isYesterday = date.getDate() === new Date().getDate() - 1;
  const isToday = date.getDate() === new Date().getDate();
  if (isYesterday) {
    return "昨天";
  }
  if (isToday) {
    return "今天";
  }
  const week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  return week[date.getDay()];
}
