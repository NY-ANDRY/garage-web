import { motion } from "motion/react";
import { mainPageTransitionProps } from "./tansition-pages";
import { type ReactNode } from "react";

export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div {...mainPageTransitionProps} className="flex-1 flex flex-col w-full h-full">
      {children}
    </motion.div>
  );
};
