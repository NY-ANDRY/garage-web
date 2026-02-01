import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Synchronisation } from "@/types/Types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface SyncListProps {
  syncs: Synchronisation[];
  onSelect?: (sync: Synchronisation) => void;
}

const SyncList: React.FC<SyncListProps> = ({ syncs, onSelect }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getStatusBadge = (sync: Synchronisation) => {
    const lastStatut = sync.statuts?.[0];
    if (!lastStatut) return <Badge variant="secondary">{t("common.unknown")}</Badge>;

    switch (lastStatut.id) {
      case 1:
        return <Badge variant="warning">{t("common.started")}</Badge>;
      case 2:
        return <Badge variant="success">{t("common.finished")}</Badge>;
      case 3:
        return <Badge variant="destructive">{t("common.failed")}</Badge>;
      default:
        return <Badge variant="outline">{lastStatut.statut}</Badge>;
    }
  };

  const handleSelectSync = (sync: Synchronisation) => {
    navigate(`/backoffice/sync/${sync.id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("common.sync_history")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("common.date_start")}</TableHead>
              <TableHead>{t("common.date_end")}</TableHead>
              <TableHead>{t("common.status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              syncs.map((sync) => (
                <TableRow
                  key={sync.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSelectSync(sync)}
                >
                  <TableCell>
                    {format(new Date(sync.created_at), "PPpp", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {format(new Date(sync.updated_at), "PPpp", { locale: fr })}
                  </TableCell>
                  <TableCell>{getStatusBadge(sync)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SyncList;
