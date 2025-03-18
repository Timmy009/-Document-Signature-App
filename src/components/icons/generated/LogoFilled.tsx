import * as React from "react";
import type { SVGProps } from "react";

const SvgLogoFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 32"
    fill="none"
    width="1em"
    height="1em"
    {...props}
  >
    <rect width="356" height="32" rx="6" fill="#1E2F97" />
    <path
      d="M40 16h40M80 16l-6-6M80 16l-6 6M100 16h40M140 16l-6-6M140 16l-6 6M160 16h40M200 16l-6-6M200 16l-6 6M220 16h20M240 16l-6-6M240 16l-6 6"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgLogoFilled;
