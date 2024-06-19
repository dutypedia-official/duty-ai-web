import React, { SVGProps } from "react";

export function UimNotes(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      viewBox="0 0 24 24"
      {...props}>
      <path
        d="M18 22H6c-1.7 0-3-1.3-3-3V5c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v14c0 1.7-1.3 3-3 3z"
        fill="currentColor"
        opacity="0.5"></path>
      <path
        d="M16 12h-6c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1s-.4 1-1 1zm-4-4c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 8c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V3c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zm0 8H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"
        fill="currentColor"></path>
    </svg>
  );
}
export default UimNotes;
