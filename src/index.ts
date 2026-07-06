export { default } from "./plugin";
export { default as ClassificationBanner } from "./runtime/components/ClassificationBanner.vue";

export {
  defaultClassificationColors,
  getReadableTextColor,
  normalizeClassificationText,
  resolveClassificationColor,
} from "./runtime/colors";

export {
  DEFAULT_CLASSIFICATION_PRETEXT,
  DEFAULT_CLASSIFICATION_TEXT,
  DEFAULT_CLASSIFICATION_SCALE,
  classificationBannerKey,
} from "./runtime/options";

export type {
  ClassificationBannerOptions,
  ClassificationBannerProps,
  ClassificationLevel,
} from "./runtime/types";
