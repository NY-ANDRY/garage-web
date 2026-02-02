import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useStartSync } from "@/domain";
import {
  SyncOptionWrapper,
} from "@/components/sync";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface SyncDialogProps {
  onSyncStarted: (syncId: number) => void;
  lastSyncDate?: string;
}

import { useEffect } from "react";

const SyncDialog: React.FC<SyncDialogProps> = ({ onSyncStarted, lastSyncDate }) => {
  const { t } = useTranslation();
  const [syncDate, setSyncDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [useLastSyncDate, setUseLastSyncDate] = useState<boolean>(false);
  const [useTask, setUseTask] = useState<boolean>(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lastSyncDate) {
      setSyncDate(new Date(lastSyncDate).toISOString().split("T")[0]);
    }
    if (open) setUseTask(true);
  }, [lastSyncDate, open]);

  const { mutate: sync, isLoading } = useStartSync();

  const handleSync = async () => {

    try {
      const result = await sync({ 
        date: useLastSyncDate ? syncDate : undefined,
        use_task: useTask
      });

      if (result && result.success) {
        toast.success(t("common.sync_started_success"));
        onSyncStarted(result.data.id);
        setOpen(false);
      } else {
        toast.error(t("common.sync_started_error"));
      }
    } catch (error) {
      toast.error(t("common.sync_started_error_catastrofic"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("common.new_sync")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{t("common.new_sync_title")}</DialogTitle>
          <DialogDescription>
            {t("common.new_sync_description")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {lastSyncDate && (
            <SyncOptionWrapper 
              id="use-last-date"
              label={<>{t("common.use_last_sync")}: <span className="font-mono text-xs">{format(new Date(lastSyncDate), "PPpp", { locale: fr })}</span></>}
              hint={t("common.use_last_sync_hint")}
              checked={useLastSyncDate}
              onCheckedChange={setUseLastSyncDate}
            />
           )}

          <SyncOptionWrapper 
            id="use-task"
            label={t("common.use_task")}
            description={t("common.use_task_hint")}
            hint={t("common.use_task_hover_hint")}
            checked={useTask}
            onCheckedChange={setUseTask}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSync} disabled={isLoading}>
            {isLoading ? t("common.syncing") : t("common.start_sync")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SyncDialog;
