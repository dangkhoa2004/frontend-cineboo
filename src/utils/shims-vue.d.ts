declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'leaflet';

declare module '*.js' {
  const content: any;
  export default content;
}