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
import type { ClientChartData } from "@/types/Types";
import { IconFilter } from "@tabler/icons-react";
import { type DateRange } from "react-day-picker";

type ChartFilterProps = {
  setChartData: Dispatch<SetStateAction<ClientChartData[]>>;
};

const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const ChartFilter = ({ setChartData }: ChartFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const generateData = () => {
    if (!dateRange?.from || !dateRange?.to) return;

    const newData: ClientChartData[] = [];
    const currentDate = new Date(dateRange.from);

    while (currentDate <= dateRange.to) {
      newData.push({
        date: format(currentDate, "yyyy-MM-dd"),
        number: randomBetween(50, 500),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setChartData(newData);
  };

  useEffect(() => {
    
    if (dateRange?.from && dateRange?.to) {
      console.log('from: ' + dateRange.from + ' to: ' + dateRange.to);
      generateData();
    }
  }, [dateRange]);

  const handleSelectChange = () => {
    // setSelectedItem(value);
    generateData();
  };

  return (
    <div className="flex flex-col gap-2 px-0 pt-4">
      <div className="font-medium flex items-center gap-2 relative">
        <IconFilter className="inline-block h-4" />
        <span className="text-muted-foreground relative top-0.5">Filtre</span>
      </div>

      <div className="flex items-center px-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">Date range</span>

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
                // disabled={(date) =>
                //   date > new Date() || date < new Date("1900-01-01")
                // }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ChartFilter;
