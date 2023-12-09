import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import env from 'src/env';
import useNotification from 'src/composables/useNotification';


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: env.apiUrl });


export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;

  api.interceptors.response.use(undefined, (error: any) => {
    const { notify } = useNotification()

    if (error.response) {
      error.response.data.message
        ? notify(error.response.data.message)
        : error.response.data.error
          ? notify(error.response.data.error)
          : notify(error.response.statusText);
    } else {
      notify(
        error.message
          ? error.message
          : 'Ocurrio un error al procesar esta solicitud',
      );
    }
    return Promise.reject(error);
  });
});

export { api };
