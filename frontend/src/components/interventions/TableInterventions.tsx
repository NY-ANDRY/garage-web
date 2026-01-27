import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  ApiResponse,
  StatsInterventionItem,
  TableStatItem,
} from "@/types/Types";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { writeNumber } from "@/lib/utils";

type TableInterventionProps = {
  items: StatsInterventionItem[] | undefined;
};

const TableIntervention = ({ items }: TableInterventionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const totalNombre = items?.reduce((sum, item) => sum + Number(item.nombre_total), 0);
  const totalPrix = items?.reduce(
    (sum, item) => sum + Number(item.montant_total),
    0,
  );

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
          {items?.map((val, index) => (
            <TableRow key={index} className="font-medium h-12">
              <TableCell className="font-medium">{val.nom}</TableCell>
              <TableCell>{val.nombre_total}</TableCell>
              <TableCell>
                <div className="flex items-center gap-0.5">
                  <span>{t("currency")}</span>
                  <span>{val.montant_total}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => {
                    handleNavigate(val.id.toString());
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
            <TableCell>{writeNumber(totalNombre)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-0.5">
                <span>{t("currency")}</span>
                <span>{writeNumber(totalPrix)}</span>
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
