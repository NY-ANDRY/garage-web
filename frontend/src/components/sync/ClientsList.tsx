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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/types/Types";

interface ClientsListProps {
  clients: User[];
}

export const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  const { t } = useTranslation();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("common.client")}</TableHead>
          <TableHead>{t("common.email")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center py-10 text-muted-foreground"
            >
              {t("common.no_items")}
            </TableCell>
          </TableRow>
        ) : (
          clients.map((client) => (
            <TableRow key={client.uid}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={client.photoURL || ""}
                    alt={client.displayName || ""}
                  />
                  <AvatarFallback>
                    {client.displayName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{client.displayName || "N/A"}</span>
              </TableCell>
              <TableCell>{client.email}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
