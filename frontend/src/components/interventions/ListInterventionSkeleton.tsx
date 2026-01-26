import { Skeleton } from "@/components/ui/skeleton";

const ListIntervention = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex w-full flex-col gap-7">
          <div className="flex flex-col gap-3">
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListIntervention;
