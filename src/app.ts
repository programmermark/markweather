import { createApp } from "vue";
import { createPinia } from "pinia";

import "./common/css/iconfont/iconfont.scss";
import "./common/css/qweather/qweather.scss";
import "./app.scss";

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia());

export default App;
