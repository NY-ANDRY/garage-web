import { useReparationsClient } from "@/domain/reparations/useReparationsClient";
import { useParams } from "react-router-dom";

const Home = () => {
  const { uid } = useParams<{ uid: string }>();
  const { data: reparations, loading } = useReparationsClient(uid ?? "");

  return (
    <div className="min-h-screen flex justify-center pb-24">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-5">
          {loading &&
            Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-muted/50 aspect-square rounded-xl" />
            ))}
          {!loading &&
            reparations.map((reparation, i) => (
              <div className="flex">{reparation.id}</div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
