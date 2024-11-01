import axios from "axios";
import type { App } from "vue";

interface PlatformConfigs {
  [key: string]: any;
}

let config: PlatformConfigs = {};
const { VITE_PUBLIC_PATH } = import.meta.env;

const setConfig = (cfg?: PlatformConfigs) => {
  config = Object.assign(config, cfg);
};

const getConfig = (key?: string): PlatformConfigs | null => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data: PlatformConfigs | null = config;
      for (const v of arr) {
        if (data && typeof data === "object" && v in data) {
          data = data[v];
        } else {
          return null;
        }
      }
      return data;
    }
  }
  return config;
};

export const getPlatformConfig = async (app: App): Promise<PlatformConfigs | undefined> => {
  app.config.globalProperties.$config = getConfig();
  return axios({
    method: "get",
    url: `${VITE_PUBLIC_PATH}platform-config.json`
  })
    .then(({ data: newConfig }) => {
      let $config = app.config.globalProperties.$config;
      console.log(newConfig)
      if (app && $config && typeof newConfig === "object") {
        $config = Object.assign($config, newConfig);
        app.config.globalProperties.$config = $config;
        setConfig($config);
      }
      return $config;
    })
    .catch(() => {
      throw new Error("Vui lòng thêm nó vào thư mục công cộng platform-config.json Tệp cấu hình");
    });
};

const responsiveStorageNameSpace = (): string | undefined => getConfig()?.ResponsiveStorageNameSpace;

export { getConfig, setConfig, responsiveStorageNameSpace };
