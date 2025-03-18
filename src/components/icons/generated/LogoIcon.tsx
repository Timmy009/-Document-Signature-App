import * as React from "react";
import type { SVGProps } from "react";

const SvgLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    fill="none"
    width="1em"
    height="1em"
    {...props}
  >
    <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="4" fill="none" />
    <path
      d="M20 40 L30 20 L40 40 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgLogoIcon;
