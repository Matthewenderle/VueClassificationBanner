import type { App } from 'vue'
import ClassificationBanner from './runtime/components/ClassificationBanner.vue'
import { classificationBannerKey } from './runtime/options'
import type { ClassificationBannerOptions } from './runtime/types'

export interface VueClassificationBannerPlugin {
  install: (app: App, options?: ClassificationBannerOptions) => void
}

const VueClassificationBanner: VueClassificationBannerPlugin = {
  install(app: App, options: ClassificationBannerOptions = {}) {
    app.provide(classificationBannerKey, options)
    app.component('ClassificationBanner', ClassificationBanner)
  },
}

export default VueClassificationBanner
