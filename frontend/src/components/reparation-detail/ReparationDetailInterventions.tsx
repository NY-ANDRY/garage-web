import type { Intervention } from "@/types/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Wrench } from "lucide-react";

type ReparationDetailInterventionsProps = {
  interventions: Intervention[];
  loading?: boolean;
};

const ReparationDetailInterventions = ({
  interventions,
  loading = false,
}: ReparationDetailInterventionsProps) => {
  if (loading) {
    return (
      <Card className="border rounded-xl shadow-none">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Interventions
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-24 inline-block" />
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Interventions
        </CardTitle>
        <CardDescription>
          {interventions.length} intervention
          {interventions.length > 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Intervention</TableHead>
              <TableHead className="text-right">Durée</TableHead>
              <TableHead className="text-right">Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interventions.map((intervention) => (
              <TableRow key={intervention.id}>
                <TableCell className="font-medium">{intervention.nom}</TableCell>
                <TableCell className="text-right">
                  {intervention.duree} min
                </TableCell>
                <TableCell className="text-right">
                  {intervention.prix.toFixed(2)} €
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-medium">
                Total
              </TableCell>
              <TableCell className="text-right font-medium">
                {interventions
                  .reduce((s, i) => s + i.prix, 0)
                  .toFixed(2)}{" "}
                €
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ReparationDetailInterventions;
