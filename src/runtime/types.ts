export type ClassificationLevel =
  | "CUI"
  | "CONTROLLED UNCLASSIFIED INFORMATION"
  | "UNCLASSIFIED"
  | "U"
  | "CONFIDENTIAL"
  | "C"
  | "SECRET"
  | "S"
  | "TOP SECRET"
  | "TS"
  | "TS//SCI"
  | string;

export interface ClassificationBannerOptions {
  /** Classification text shown after the pretext. Example: "CUI" or "TS//SCI/TK/NOFORN". */
  text?: ClassificationLevel;

  /** Text shown before the classification. */
  pretext?: string;

  /** Banner background and top-border color. If omitted, the color is inferred from `text`. */
  color?: string;

  /** Text color. If omitted, a readable color is inferred from `color`. */
  textColor?: string;

  /** Scale factor for all banner dimensions. Default is 1. Example: 1.2 makes everything 20% larger. */
  scale?: number;

  /** Show dynamic page text. When true, displays "DYNAMIC PAGE - HIGHEST POSSIBLE CLASSIFICATION IS [classification]". Default is false. */
  dynamicContent?: boolean;
}

export type ClassificationBannerProps = ClassificationBannerOptions;
