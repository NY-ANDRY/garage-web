import React, { useState, useEffect } from "react";
import { useReparationsBackoffice } from "@/domain/index";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import type { RepairBackoffice } from "@/types/BackofficeTypes";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { getStatutLabel } from "@/lib/utils";
import { useHeader } from "@/context/HeaderContext";

const Repairs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [allRepairs, setAllRepairs] = useState<RepairBackoffice[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.repair")}]);
  }, [setBreadcrumbs, t]);
  // Date-fns locale based on i18n
  const dateLocale = i18n.language === "en" ? enUS : fr;

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Reset page when search or limit changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, limit]);

  const { data, isLoading } = useReparationsBackoffice(
    limit,
    page,
    debouncedSearch,
  );

  useEffect(() => {
    if (data?.data?.data) {
      if (page === 1) {
        setAllRepairs(data.data.data);
      } else {
        setAllRepairs((prev) => {
          const currentIds = new Set(prev.map((p) => p.id));
          const newItems = data.data.data.filter(
            (item) => !currentIds.has(item.id),
          );
          return [...prev, ...newItems];
        });
      }
    }
  }, [data, page]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
  };

  const hasMore = data?.data?.next_page_url !== null;

  return (
    <div className="p-6 space-y-6">
      <CardHeader className="px-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CardTitle className="text-3xl capitalize">
          {t("backoffice.repairs_title")}
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("backoffice.search_placeholder")}
              className="pl-8 h-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 shrink-0">
                {t("backoffice.show")} {limit}{" "}
                <ChevronDown className="ml-2 size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[10, 20, 50, 100].map((val) => (
                <DropdownMenuItem
                  key={val}
                  onClick={() => handleLimitChange(val)}
                >
                  {val} {t("backoffice.results")}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <Card className="border-none shadow-none">
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("backoffice.table.id")}</TableHead>
                <TableHead>{t("backoffice.table.date")}</TableHead>
                <TableHead>{t("common.client")}</TableHead>
                <TableHead>{t("backoffice.table.car")}</TableHead>
                <TableHead>{t("backoffice.table.status")}</TableHead>
                <TableHead>{t("backoffice.table.sync")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allRepairs.map((repair) => (
                <TableRow
                  key={repair.id}
                  className="group transition-colors hover:bg-muted/50"
                >
                  <TableCell className="font-mono text-xs">
                    {repair.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {repair.date
                      ? format(new Date(repair.date), "PPP", {
                          locale: dateLocale,
                        })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{repair.client?.displayName || "N/A"}</TableCell>
                  <TableCell>
                    {repair.voiture ? (
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {repair.voiture.marque}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {repair.voiture.numero}
                        </span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {repair.status ? (
                      <Badge
                        variant={
                          repair.status.code === 4 ? "default" : "secondary"
                        }
                        className="capitalize"
                      >
                        {repair.status.nom}
                      </Badge>
                    ) : // <Badge variant="outline">{t("common.unknown")}</Badge>
                    // <Badge variant={getStatutLabel(Number(repair.static_statut)).variant}>{getStatutLabel(Number(repair.static_statut)).label}</Badge>
                    repair.static_statut == null ? (
                      <Badge variant="outline">{t("common.unknown")}</Badge>
                    ) : (
                      <Badge
                        variant={
                          getStatutLabel(Number(repair.static_statut)).variant
                        }
                      >
                        {getStatutLabel(Number(repair.static_statut)).label}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {repair.last_sync_at
                      ? format(new Date(repair.last_sync_at), "PPP 'à' HH:mm", {
                          locale: dateLocale,
                        })
                      : t("common.unknown")}
                  </TableCell>
                </TableRow>
              ))}

              <AnimatePresence>
                {isLoading && (
                  <motion.tr
                    key="skeletons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TableCell colSpan={6} className="p-0">
                      <Table>
                        <TableBody>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <TableRow key={`skeleton-${i}`}>
                              <TableCell>
                                <Skeleton className="h-4 w-24 font-mono" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-28" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-32" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-10 w-40" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-6 w-20 rounded-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-4 w-40" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </motion.tr>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>

          {!isLoading && allRepairs.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              {debouncedSearch
                ? t("backoffice.no_search_results")
                : t("backoffice.no_repairs_found")}
            </div>
          )}

          {hasMore && !isLoading && (
            <div className="flex justify-center mt-6">
              <Button
                variant="ghost"
                onClick={() => setPage((prev) => prev + 1)}
              >
                {t("backoffice.show_more_repairs")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Repairs;
