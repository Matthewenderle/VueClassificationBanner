import {
  addComponent,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from "@nuxt/kit";
import type { ClassificationBannerOptions } from "./runtime/types";

export interface ModuleOptions extends ClassificationBannerOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "vue-classification-banner",
    configKey: "classificationBanner",
    compatibility: {
      nuxt: "^3.0.0 || ^4.0.0",
    },
  },

  defaults: {
    text: "UNCLASSIFIED",
    pretext: "",
    scale: process.env.CLASSIFICATION_SCALE
      ? parseFloat(process.env.CLASSIFICATION_SCALE)
      : 1,
  },

  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.options.runtimeConfig.public.classificationBanner = {
      ...options,
      ...(nuxt.options.runtimeConfig.public.classificationBanner as
        | Record<string, unknown>
        | undefined),
    };

    addPlugin(resolver.resolve("./runtime/plugin"));

    addComponent({
      name: "ClassificationBanner",
      filePath: resolver.resolve(
        "./runtime/components/ClassificationBanner.vue",
      ),
      global: true,
    });
  },
});
