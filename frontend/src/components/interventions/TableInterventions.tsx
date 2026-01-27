import useFetch from "@/hooks/useFetch";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse, TableStatItem } from "@/types/Types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const TableIntervention = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useFetch<ApiResponse<TableStatItem[]>>(
    `${API_BASE_URL}/stats/interventions/table`,
  );

  const value: TableStatItem[] = data?.data ?? [];

  // Calcul des totaux
  const totalNombre = value.reduce((sum, item) => sum + item.nombre, 0);
  const totalPrix = value.reduce((sum, item) => sum + item.montant_total, 0);
  const handleNavigate = (id: string) => {
    navigate(`/backoffice/interventions/${id}`);
  };

  return (
    <div className="flex flex-col border rounded-lg">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Montant total</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {value.map((val, index) => (
            <TableRow key={index} className="font-medium h-12">
              <TableCell className="font-medium">{val.nom}</TableCell>
              <TableCell>{val.nombre}</TableCell>
              <TableCell>
                <div className="flex items-center gap-0.5">
                  <span>{t("currency")}</span>
                  <span>{val.montant_total}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => {
                    handleNavigate(val.id);
                  }}
                  variant="outline"
                  size="icon"
                >
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{totalNombre}</TableCell>
            <TableCell>
              <div className="flex items-center gap-0.5">
                <span>{t("currency")}</span>
                <span>{totalPrix}</span>
              </div>
            </TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableIntervention;
