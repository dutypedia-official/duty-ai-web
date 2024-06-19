import React, { SVGProps } from "react";

export function UimSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M11 18a7 7 0 117-7 7.008 7.008 0 01-7 7z"
        opacity=".5"></path>
      <path
        fill="currentColor"
        d="M11 2a9 9 0 100 18 9.01 9.01 0 009-9 9 9 0 00-9-9zm0 16a7 7 0 117-7 7.008 7.008 0 01-7 7z"></path>
      <path
        fill="currentColor"
        d="M21.706 20.292l-3.681-3.681a9.053 9.053 0 01-1.414 1.414l3.68 3.68.003.003a1 1 0 001.412-1.416z"></path>
    </svg>
  );
}
export default UimSearch;
