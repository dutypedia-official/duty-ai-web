import React, { SVGProps } from "react";

export const StockIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="none"
      viewBox="0 0 32 32"
      {...props}>
      <path
        stroke="currentColor"
        strokeWidth="2.906"
        d="M1.453 6.418a4.965 4.965 0 014.965-4.965h19.164a4.965 4.965 0 014.965 4.965v19.164a4.965 4.965 0 01-4.965 4.965H1.453V6.418z"></path>
      <path
        fill="currentColor"
        d="M9.647 20.864l4.87-4.87 2.987 2.986a.912.912 0 001.333-.037l6.589-7.416a.923.923 0 00-.037-1.259.919.919 0 00-1.332.037l-5.872 6.598-3.024-3.023a.915.915 0 00-1.296 0L8.27 19.485a.916.916 0 000 1.296l.082.083a.915.915 0 001.296 0z"></path>
    </svg>
  );
};
