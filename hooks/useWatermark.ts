"use client";

import { useEffect, useState } from "react";

const ZERO_WIDTH_MAP = {
  "00": "\u200B",
  "01": "\u200C",
  "10": "\u200D",
  "11": "\uFEFF",
};

/**
 * Encodes clear text into an invisible zero-width character sequence using base-4.
 */
export function encodeWatermark(text: string): string {
  const binary = text
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
  
  const pairs = binary.match(/.{2}/g);
  if (!pairs) return "";
  
  return pairs
    .map((pair) => ZERO_WIDTH_MAP[pair as keyof typeof ZERO_WIDTH_MAP])
    .join("");
}

export const WATERMARK = encodeWatermark(
  "Saumya Patel | linkedin.com/in/saumya-rajeshbhai-patel-857290372 | github.com/sp25126"
);

/**
 * Client-safe hook to access the pre-encoded zero-width watermark string.
 */
export function useWatermark() {
  const [watermark, setWatermark] = useState("");

  useEffect(() => {
    setWatermark(WATERMARK);
  }, []);

  return watermark;
}
