import { AnimatePresence, motion } from "motion/react";
import { Skeleton } from "@/components/ui/skeleton";
import { fade } from "@/components/transitions/tansitions";
import type { ReactNode } from "react";

type AnimatedPlaceholderProps = {
  loading: boolean;
  skeletonCount?: number;
  skeletonClassName?: string;
  children: ReactNode;
};

const AnimatedPlaceholder = ({
  loading,
  skeletonCount = 6,
  skeletonClassName = "aspect-video h-24 w-full",
  children,
}: AnimatedPlaceholderProps) => {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          {...fade}
          className="flex flex-col gap-1"
        >
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Skeleton key={i} className={skeletonClassName} />
          ))}
        </motion.div>
      ) : (
        <motion.div key="content" {...fade} className="flex flex-col h-full">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedPlaceholder;
