import React from "react";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "react-i18next";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AnimatePresence, motion } from "motion/react";
import { fade } from "@/components/transitions/tansitions";

interface SyncBadgesProps {
  statusId?: number;
  pollInterval?: number;
}

export const SyncBadges: React.FC<SyncBadgesProps> = ({
  statusId,
  pollInterval,
}) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence mode="wait">
      {statusId === 1 && (
        <motion.div key={1} {...fade}>
          <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Badge>
                <Spinner data-icon="inline-start" />
                {t("common.syncing")}
              </Badge>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit p-2 text-xs">
              {t("common.fetch_every", { count: (pollInterval || 0) / 1000 })}{" "}
              {(pollInterval || 0) / 1000}s
            </HoverCardContent>
          </HoverCard>
        </motion.div>
      )}

      {statusId === 2 && (
        <motion.div key={2} {...fade}>
          <Badge variant="success">{t("common.finished")}</Badge>
        </motion.div>
      )}

      {statusId === 3 && (
        <motion.div key={3} {...fade}>
          <Badge variant="destructive">{t("common.failed")}</Badge>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
