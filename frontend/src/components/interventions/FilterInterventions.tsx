// ChartFilter.tsx
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import type { StatsInterventions } from "@/types/Types";
import { IconFilter } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type DateRange } from "react-day-picker";
import { useClients, useLazyInterventionsStats } from "@/domain";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

type ChartFilterProps = {
  setChartData?: Dispatch<SetStateAction<StatsInterventions | undefined>>;
};

const ChartFilter = ({ setChartData }: ChartFilterProps) => {
  const { t, i18n } = useTranslation();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  const { data: clientsData } = useClients(100);
  const { fetchStats } = useLazyInterventionsStats();
  const isMobile = useIsMobile();

  // Date-fns locale based on i18n
  const dateLocale = i18n.language === 'en' ? enUS : fr;

  useEffect(() => {
    const loadFilteredStats = async () => {
      try {
        const params: Record<string, string> = {};

        if (dateRange?.from) {
          params.dateDebut = format(dateRange.from, "yyyy-MM-dd");
        }

        if (dateRange?.to) {
          params.dateFin = format(dateRange.to, "yyyy-MM-dd");
        }

        if (selectedUserId) {
          params.idUser = selectedUserId;
        }

        const result = await fetchStats(params);

        if (result?.success && setChartData) {
          setChartData(result.data);
        }
      } catch (error) {
        console.error("Error fetching filtered stats:", error);
      }
    };

    loadFilteredStats();
  }, [dateRange, selectedUserId, setChartData, fetchStats]);

  const handleSelectChange = (value: string) => {
    setSelectedUserId(value === "all" ? undefined : value);
  };

  const Filters = () => (
    <>
      <div className="flex flex-col gap-0.5 w-full md:w-fit">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between w-full">
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "PPP", { locale: dateLocale })} –{" "}
                    {format(dateRange.to, "PPP", { locale: dateLocale })}
                  </>
                ) : (
                  format(dateRange.from, "PPP", { locale: dateLocale })
                )
              ) : (
                t("common.date_start")
              )}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="p-0 w-fit">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              locale={dateLocale}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Select onValueChange={handleSelectChange}>
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder={t("common.client")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t("common.clients")}</SelectLabel>
            <SelectItem value="all">{t("table.select_all")}</SelectItem>
            {clientsData?.data?.data?.map((client) => (
              <SelectItem key={client.uid} value={client.uid || ""}>
                {client.displayName || client.email}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <div className="flex items-center flex-row-reverse px-1 gap-4 w-full">
      {isMobile ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconFilter size={24} />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Filters />
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <>
          <IconFilter size={24} />
          <Filters />
        </>
      )}
    </div>
  );
};

export default ChartFilter;
