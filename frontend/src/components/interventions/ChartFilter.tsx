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
import type { ChartDataItem } from "@/types/Types";
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
import { Separator } from "@/components/ui/separator";
import { type DateRange } from "react-day-picker";

type ChartFilterProps = {
  setChartData: Dispatch<SetStateAction<ChartDataItem[]>>;
};

// Fonction pour générer nombres aléatoires
const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const NAMES = [
  "Vidange",
  "Refroidissement",
  "Pneu",
  "Filtre",
  "Embrayage",
  "Amortisseur",
  "Batterie",
  "Frein",
];

const ChartFilter = ({ setChartData }: ChartFilterProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  // const [selectedItem, setSelectedItem] = useState<string | undefined>();

  const generateData = () => {
    const newData: ChartDataItem[] = NAMES.map((nom) => ({
      nom,
      nombre: randomBetween(50, 350),
      prix: randomBetween(50, 250),
    }));
    setChartData(newData);
  };

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
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

        <Separator orientation="vertical" className="mx-4" />

        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground">User</span>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Users</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ChartFilter;
