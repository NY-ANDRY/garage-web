import { Cards } from "@/components/interventions/Cards";
import ChartBar from "@/components/interventions/Chart";

const Statistique = () => {
  return (
    <div className="flex-1 flex flex-col justify-between gap-4 py-4 md:gap-6 md:py-6 md:px-4">
      <Cards />
      <ChartBar />
    </div>
  );
};

export default Statistique;
