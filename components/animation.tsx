"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const Animation = ({
  children,
  animationType,
  className,
}: {
  children: React.ReactNode;
  className?: any;
  animationType:
    | "slideLeftToRight"
    | "slideRightToLeft"
    | "fadeUp"
    | "fadeDown";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getAnimationVariants = () => {
    switch (animationType) {
      case "slideLeftToRight":
        return {
          hidden: {
            x: "-100%",
            opacity: 0,
          },
          visible: {
            x: 0,
            opacity: 1,
          },
        };
      case "slideRightToLeft":
        return {
          hidden: {
            x: "100%",
            opacity: 0,
          },
          visible: {
            x: 0,
            opacity: 1,
          },
        };
      case "fadeUp":
        return {
          hidden: {
            y: "100%",
            opacity: 0,
          },
          visible: {
            y: 0,
            opacity: 1,
          },
        };
      case "fadeDown":
        return {
          hidden: {
            y: "-100%",
            opacity: 0,
          },
          visible: {
            y: 0,
            opacity: 1,
          },
        };
      default:
        return {
          hidden: {},
          visible: {},
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      transition={{ duration: 0.8 }}
      className={className}>
      {children}
    </motion.div>
  );
};
