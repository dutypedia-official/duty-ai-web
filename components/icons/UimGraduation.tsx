import React, { SVGProps } from "react";

export function UimGraduation(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M15 20.5H7c-1.7 0-3-1.3-3-3v-5.3c0-.6.4-1 1-1h12c.6 0 1 .4 1 1v5.3c0 1.7-1.3 3-3 3z"
        opacity=".5"></path>
      <path
        fill="currentColor"
        d="M21.5 10.2l-1-.5-9-5c-.3-.2-.7-.2-1 0l-9 5c-.5.2-.6.8-.4 1.3.1.2.2.3.4.4l9 5c.3.2.7.2 1 0l8.5-4.7v2.9c0 .6.4 1 1 1s1-.4 1-1v-3.4c0-.5-.2-.8-.5-1z"></path>
    </svg>
  );
}
export default UimGraduation;
