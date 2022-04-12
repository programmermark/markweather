import path from "path";

const config = {
  projectName: "Markweather",
  date: "2022-3-20",
  // designWidth: 750,
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: ["taro-plugin-pinia", "@tarojs/plugin-html"],
  sass: {
    resource: [
      path.resolve(__dirname, "..", "src/assets/css/nutui-theme.scss"),
    ],
    data: `@import "@nutui/nutui-taro/dist/styles/variables.scss";`,
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "vue3",
  alias: {
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/stores": path.resolve(__dirname, "..", "src/stores"),
    "@/apis": path.resolve(__dirname, "..", "src/apis"),
    "@/common": path.resolve(__dirname, "..", "src/common"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
