export const defaultClassificationColors: Record<string, string> = {
  CUI: "#502B85",
  "CONTROLLED UNCLASSIFIED INFORMATION": "#502B85",

  UNCLASSIFIED: "#007A33",
  U: "#007A33",

  CONFIDENTIAL: "#0033A0",
  C: "#0033A0",

  SECRET: "#C8102E",
  S: "#C8102E",

  "TOP SECRET": "#FF8C00",
  TS: "#FF8C00",

  "TS//SCI": "#FCE83A",
  "TOP SECRET//SENSITIVE COMPARTMENT INFORMATION": "#FCE83A",
};

export function normalizeClassificationText(text?: string): string {
  return (text || "").trim().toUpperCase();
}

export function resolveClassificationColor(text?: string): string {
  const normalized = normalizeClassificationText(text);

  if (!normalized) {
    return defaultClassificationColors.UNCLASSIFIED;
  }

  // Check for exact match first
  if (normalized in defaultClassificationColors) {
    return defaultClassificationColors[normalized];
  }

  // For compartmented classifications (e.g., "TS//SCI/TK/NOFORN"), check progressively shorter prefixes
  if (normalized.includes("//")) {
    const parts = normalized.split("//");
    // Build progressively longer prefixes: "TS", "TS//SCI", "TS//SCI//TK", etc.
    for (let i = parts.length - 1; i > 0; i--) {
      const prefix = parts.slice(0, i).join("//");
      if (prefix in defaultClassificationColors) {
        return defaultClassificationColors[prefix];
      }
    }
    // If no compartmented match, check the base classification
    const baseClassification = parts[0];
    if (baseClassification in defaultClassificationColors) {
      return defaultClassificationColors[baseClassification];
    }
  }

  // Fallback to UNCLASSIFIED
  return defaultClassificationColors.UNCLASSIFIED;
}

function expandShortHex(hex: string): string {
  if (hex.length !== 3) {
    return hex;
  }

  return hex
    .split("")
    .map((character) => character + character)
    .join("");
}

export function getReadableTextColor(background: string): string {
  const hex = expandShortHex(background.replace("#", "").trim());

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    return "#fff";
  }

  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);

  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62 ? "#000" : "#fff";
}
