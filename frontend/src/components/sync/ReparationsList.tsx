import React from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Reparation } from "@/types/Types";

interface ReparationsListProps {
  reparations: Reparation[];
}

export const ReparationsList: React.FC<ReparationsListProps> = ({
  reparations,
}) => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("common.client")}</TableHead>
          <TableHead>{t("common.voiture")}</TableHead>
          <TableHead>{t("common.interventions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reparations.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center py-10 text-muted-foreground"
            >
              {t("common.no_items")}
            </TableCell>
          </TableRow>
        ) : (
          reparations.map((reparation, i) => (
            <TableRow key={i}>
              <TableCell>{reparation.user?.displayName || "N/A"}</TableCell>
              <TableCell>{reparation.voiture?.nom}</TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {reparation.interventions?.length || 0}
                </Badge>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
