import React, { SVGProps } from "react";

export function UimUser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path
        fill="currentColor"
        d="M12 14a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path>
      <path
        fill="currentColor"
        d="M15.7 12.713a5.975 5.975 0 01-7.405 0 9.992 9.992 0 00-6.23 8.179 1 1 0 00.886 1.102L20.94 22a1 1 0 00.995-1.108 9.995 9.995 0 00-6.233-8.179z"
        opacity=".5"></path>
    </svg>
  );
}
export default UimUser;
