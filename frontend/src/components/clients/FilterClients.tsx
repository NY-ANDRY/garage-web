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
import { ChevronDownIcon } from "lucide-react";
import type { ClientChartData, StatsClients } from "@/types/Types";
import { IconFilter } from "@tabler/icons-react";
import { type DateRange } from "react-day-picker";
import useLazyFetch from "@/hooks/useLazyFetch";
import { API_BASE_URL } from "@/lib/constants";
import type { ApiResponse } from "@/types/Types";

type ChartFilterProps = {
  setChartData: Dispatch<SetStateAction<StatsClients | undefined>>;
};

const ChartFilter = ({ setChartData }: ChartFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const { fetch: fetchStats } = useLazyFetch<ApiResponse<StatsClients>>(
    API_BASE_URL + `/stats/clients`
  );

  useEffect(() => {
    const loadFilteredStats = async () => {
      try {
        const params: Record<string, string> = {};
        
        if (dateRange?.from) {
          params.dateDebut = format(dateRange.from, 'yyyy-MM-dd');
        }
        
        if (dateRange?.to) {
          params.dateFin = format(dateRange.to, 'yyyy-MM-dd');
        }

        const result = await fetchStats(params);
        
        if (result?.success && setChartData) {
          setChartData(result.data);
        }
      } catch (error) {
        console.error('Error fetching filtered stats:', error);
      }
    };

    if (dateRange?.from || dateRange?.to) {
       loadFilteredStats();
    }
   
  }, [dateRange, setChartData, fetchStats]);


  return (
    <div className="flex flex-row-reverse items-center gap-2 px-0">
        <IconFilter className="inline-block h-4" />

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-between">
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "PPP")} –{" "}
                      {format(dateRange.to, "PPP")}
                    </>
                  ) : (
                    format(dateRange.from, "PPP")
                  )
                ) : (
                  "Pick a date range"
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
              />
            </PopoverContent>
          </Popover>
    </div>
  );
};

export default ChartFilter;
