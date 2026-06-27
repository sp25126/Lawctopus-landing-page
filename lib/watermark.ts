export const ZERO_WIDTH = {
  "0": "\u200B", // Zero-width space
  "1": "\u200C", // Zero-width non-joiner
  "2": "\u200D", // Zero-width joiner
  "3": "\uFEFF", // Zero-width no-break space
};

export const ZERO_WIDTH_REVERSE: Record<string, string> = {
  "\u200B": "0",
  "\u200C": "1",
  "\u200D": "2",
  "\uFEFF": "3",
};

/**
 * Encodes a standard text string into an invisible zero-width string.
 * It converts each character to 8-bit binary, splits them into 2-bit pairs,
 * and maps each pair (0-3) to a corresponding zero-width character.
 */
export function encodeWatermark(text: string): string {
  const binary = text
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");

  const pairs = binary.match(/.{2}/g);
  if (!pairs) return "";

  return pairs
    .map((pair) => ZERO_WIDTH[parseInt(pair, 2).toString() as keyof typeof ZERO_WIDTH])
    .join("");
}

/**
 * Decodes an invisible zero-width string back into the readable text string.
 */
export function decodeWatermark(watermark: string): string {
  let binary = "";
  for (const char of watermark) {
    const val = ZERO_WIDTH_REVERSE[char];
    if (val !== undefined) {
      binary += parseInt(val, 10).toString(2).padStart(2, "0");
    }
  }

  const bytes = binary.match(/.{8}/g);
  if (!bytes) return "";

  return bytes
    .map((byte) => String.fromCharCode(parseInt(byte, 2)))
    .join("");
}

export const WATERMARK_TEXT = "Saumya Patel | linkedin.com/in/saumya-patel | github.com/saumya-patel";
export const encodedWatermark = encodeWatermark(WATERMARK_TEXT);
