import { motion } from "motion/react";
import { fade } from "./tansitions";
import { type ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div {...fade} className="flex-1 flex flex-col w-full h-full">
      {children}
    </motion.div>
  );
};

export default PageTransition;
