"use client";

export default function WatermarkSVG() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      data-author="Saumya Patel"
      data-linkedin="www.linkedin.com/in/saumya-rajeshbhai-patel-857290372"
      data-github="https://github.com/sp25126"
      data-created="2026-06-27"
    >
      <desc>
        Designed by Saumya Patel | linkedin.com/in/saumya-rajeshbhai-patel-857290372 | github.com/sp25126
      </desc>
    </svg>
  );
}
