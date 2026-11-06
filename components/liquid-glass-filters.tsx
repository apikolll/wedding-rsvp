"use client";
import { useEffect } from "react";

/**
 * SVG filters for the liquid-glass surfaces. Rendered once in the root layout.
 * - #lg-refract: warps what's behind the bar (backdrop-filter, Chromium only).
 * - #lg-rim: lights the pill's edge like a thick glass slab (every browser).
 */
export const LiquidGlassFilters = () => {
  useEffect(() => {
    // Only Chromium renders SVG filters inside backdrop-filter. Others would
    // discard the whole declaration (losing the blur too), so opt in here.
    const brands = (
      navigator as Navigator & {
        userAgentData?: { brands: { brand: string }[] };
      }
    ).userAgentData?.brands;
    if (brands?.some((b) => b.brand === "Chromium")) {
      document.documentElement.classList.add("lg-refract");
    }
  }, []);

  return (
    <svg aria-hidden className="absolute size-0 overflow-hidden">
      <defs>
        <filter
          id="lg-refract"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* Smooth, low-frequency noise = gentle liquid ripples, not static */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.018"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2.5" result="ripples" />
          {/* Frost first, then warp the frosted backdrop */}
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="5"
            edgeMode="duplicate"
            result="frost"
          />
          <feDisplacementMap
            in="frost"
            in2="ripples"
            scale="34"
            xChannelSelector="R"
            yChannelSelector="G"
            result="warped"
          />
          {/* Slight chromatic split: red drifts right, green+blue stay */}
          <feColorMatrix
            in="warped"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="red"
          />
          <feOffset in="red" dx="1.2" result="redShift" />
          <feColorMatrix
            in="warped"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="greenBlue"
          />
          <feBlend in="redShift" in2="greenBlue" mode="screen" />
        </filter>

        <filter id="lg-rim" colorInterpolationFilters="sRGB">
          {/* Soften the pill's edge into a bevel, then light it from top-left */}
          <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="bevel" />
          <feSpecularLighting
            in="bevel"
            surfaceScale="5"
            specularConstant="1.1"
            specularExponent="30"
            lightingColor="#fffdf3"
            result="shine"
          >
            <feDistantLight azimuth="235" elevation="38" />
          </feSpecularLighting>
          {/* Drop the faint sheen on the flat middle; keep the bright edge */}
          <feComponentTransfer in="shine" result="edgeOnly">
            <feFuncA type="linear" slope="1.8" intercept="-0.45" />
          </feComponentTransfer>
          <feComposite in="edgeOnly" in2="SourceAlpha" operator="in" />
        </filter>
        {/* Same idea, wider bevel for big shapes (e.g. the itinerary blob) */}
        <filter id="lg-rim-soft" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="bevel" />
          <feSpecularLighting
            in="bevel"
            surfaceScale="7"
            specularConstant="1"
            specularExponent="24"
            lightingColor="#fffdf3"
            result="shine"
          >
            <feDistantLight azimuth="235" elevation="40" />
          </feSpecularLighting>
          {/* Smooth the stair-stepping lighting gets from 8-bit alpha */}
          <feGaussianBlur in="shine" stdDeviation="1.2" result="shineSoft" />
          <feComponentTransfer in="shineSoft" result="edgeOnly">
            <feFuncA type="linear" slope="1.8" intercept="-0.5" />
          </feComponentTransfer>
          <feComposite in="edgeOnly" in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilters;
