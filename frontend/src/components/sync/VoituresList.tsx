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
import type { Voiture } from "@/types/Types";

interface VoituresListProps {
  voitures: Voiture[];
}

export const VoituresList: React.FC<VoituresListProps> = ({ voitures }) => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("common.voiture")}</TableHead>
          <TableHead>{t("common.license_plate")}</TableHead>
          <TableHead>{t("common.client")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {voitures.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center py-10 text-muted-foreground"
            >
              {t("common.no_items")}
            </TableCell>
          </TableRow>
        ) : (
          voitures.map((voiture) => (
            <TableRow key={voiture.id}>
              <TableCell>
                {voiture.nom} ({voiture.marque})
              </TableCell>
              <TableCell className="font-mono">{voiture.numero}</TableCell>
              <TableCell>{voiture.user?.displayName || "N/A"}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
