import type { InjectionKey } from "vue";
import type { ClassificationBannerOptions } from "./types";

export const DEFAULT_CLASSIFICATION_TEXT = "UNCLASSIFIED";
export const DEFAULT_CLASSIFICATION_PRETEXT = "";
export const DEFAULT_CLASSIFICATION_SCALE = 1;

export const classificationBannerKey: InjectionKey<ClassificationBannerOptions> =
  Symbol("VueClassificationBannerOptions");
