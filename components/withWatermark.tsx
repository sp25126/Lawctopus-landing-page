"use client";

import React from "react";
import { WATERMARK } from "../hooks/useWatermark";

/**
 * A Higher-Order Component that wraps any target component and injects the encoded
 * zero-width watermark string as a prop.
 */
export function withWatermark<P extends object>(
  WrappedComponent: React.ComponentType<P & { watermark?: string }>
) {
  const ComponentWithWatermark = (props: P) => {
    return <WrappedComponent {...props} watermark={WATERMARK} />;
  };

  ComponentWithWatermark.displayName = `withWatermark(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithWatermark;
}
