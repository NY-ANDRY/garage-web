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
import type { ApiResponse, StatsInterventions, User } from "@/types/Types";
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

type ChartFilterProps = {
  setChartData?: Dispatch<SetStateAction<StatsInterventions | undefined>>;
};

const ChartFilter = ({ setChartData }: ChartFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(undefined);
  const { data: clientsData } = useClients();
  const { fetchStats } = useLazyInterventionsStats();

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
        
        if (selectedUserId) {
          params.idUser = selectedUserId;
        }

        const result = await fetchStats(params);
        
        if (result?.success && setChartData) {
          setChartData(result.data);
        }
      } catch (error) {
        console.error('Error fetching filtered stats:', error);
      }
    };

    loadFilteredStats();
  }, [dateRange, selectedUserId, setChartData, fetchStats]);

  const handleSelectChange = (value: string) => {
    setSelectedUserId(value === "all" ? undefined : value);
  };

  return (
    <div className="flex items-center flex-row-reverse px-1 gap-4">
      <IconFilter size={24} />
      <div className="flex flex-col gap-0.5">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-between w-full">
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

      <div className="flex flex-col gap-0.5">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Clients</SelectLabel>
              <SelectItem value="all">Tous les clients</SelectItem>
              {clientsData?.data?.map((client) => (
                <SelectItem key={client.uid} value={client.uid || ""}>
                  {client.displayName || client.email}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChartFilter;
