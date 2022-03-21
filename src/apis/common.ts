const weatherUrl = "https://devapi.qweather.com/v7";
const locationUrl = "https://restapi.amap.com/v3";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://music-player-server.immortalboy.cn"
    : "/api";

export { baseUrl, weatherUrl, locationUrl };
