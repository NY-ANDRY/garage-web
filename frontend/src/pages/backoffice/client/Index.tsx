import { Cards } from "@/components/clients/Cards";
import ChartBar from "@/components/clients/Chart";

const Index = () => {
  return (
    <div className="flex flex-col py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden min-h-full">
      <Cards />
      <ChartBar />
    </div>
  );
};

export default Index;
