import { Cards } from "@/components/interventions/Cards";
import ChartBar from "@/components/interventions/Chart";

const Statistique = () => {
  return (
    <div className="py-4 px-2 md:gap-6 md:py-6 md:px-4 max-w-full overflow-hidden">
      <Cards />
      <ChartBar />
    </div>
  );
};

export default Statistique;
