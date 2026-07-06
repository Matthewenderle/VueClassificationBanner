import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { classificationBannerKey } from './options'
import type { ClassificationBannerOptions } from './types'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.vueApp.provide(
    classificationBannerKey,
    (config.public.classificationBanner || {}) as ClassificationBannerOptions,
  )
})
