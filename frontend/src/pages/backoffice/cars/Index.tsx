import React, { useState, useEffect } from "react";
import { useCars } from "@/domain/index";
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
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";
import type { CarBackoffice } from "@/types/BackofficeTypes";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useHeader } from "@/context/HeaderContext";

const Cars: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [allCars, setAllCars] = useState<CarBackoffice[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
    const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([
      { label: t("sidebar.car") }
    ]);
  }, [setBreadcrumbs, t]);
  // Date-fns locale based on i18n
  const dateLocale = i18n.language === 'en' ? enUS : fr;

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

  const { data, isLoading } = useCars(limit, page, debouncedSearch);

  useEffect(() => {
    if (data?.data?.data) {
      if (page === 1) {
        setAllCars(data.data.data);
      } else {
        setAllCars(prev => {
          const currentIds = new Set(prev.map(p => p.id));
          const newItems = data.data.data.filter(item => !currentIds.has(item.id));
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
          <CardTitle className="text-3xl capitalize">{t("backoffice.cars_title")}</CardTitle>
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
                  {t("backoffice.show")} {limit} <ChevronDown className="ml-2 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[10, 20, 50, 100].map((val) => (
                  <DropdownMenuItem key={val} onClick={() => handleLimitChange(val)}>
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
                <TableHead>{t("backoffice.table.image")}</TableHead>
                <TableHead>{t("backoffice.table.number")}</TableHead>
                <TableHead>{t("backoffice.table.brand_model")}</TableHead>
                <TableHead>{t("backoffice.table.owner")}</TableHead>
                <TableHead>{t("backoffice.table.year")}</TableHead>
                <TableHead>{t("backoffice.table.sync")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allCars.map((car) => (
                <TableRow key={car.id} className="group transition-colors hover:bg-muted/50">
                  <TableCell>
                    {car.url_img ? (
                      <img src={car.url_img} alt={car.nom} className="w-12 h-12 object-cover rounded-md" />
                    ) : (
                      <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground text-center">
                        No img
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <Badge variant="outline">{car.numero}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{car.marque}</span>
                      <span className="text-sm text-muted-foreground">{car.nom}</span>
                    </div>
                  </TableCell>
                  <TableCell>{car.client?.displayName || "N/A"}</TableCell>
                  <TableCell>{car.annee}</TableCell>
                  <TableCell>
                    {car.last_sync_at
                      ? format(new Date(car.last_sync_at), "PPP 'à' HH:mm", { locale: dateLocale })
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
                              <TableCell><Skeleton className="size-12 rounded-md" /></TableCell>
                              <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                              <TableCell><Skeleton className="h-10 w-40" /></TableCell>
                              <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                              <TableCell><Skeleton className="h-4 w-40" /></TableCell>
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

          {!isLoading && allCars.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              {debouncedSearch ? t("backoffice.no_search_results") : t("backoffice.no_cars_found")}
            </div>
          )}
          
          {hasMore && !isLoading && (
            <div className="flex justify-center mt-6">
              <Button variant="ghost" onClick={() => setPage(prev => prev + 1)}>
                {t("backoffice.show_more_cars")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cars;