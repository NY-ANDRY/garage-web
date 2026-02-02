import { useReparationsClient } from "@/domain/reparations/useReparationsClient";
import { useParams } from "react-router-dom";
import ReparationClientCard from "@/components/reparation/ReparationClientCard";
import { Separator } from "@/components/ui/separator";
import { useHeader } from "@/context/HeaderContext";
import { useEffect } from "react";
import AnimatedPlaceholder from "@/components/animations/AnimatedPlaceholder";
import EmptyReparation from "@/components/reparation/EmptyReparation";

import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const { uid } = useParams<{ uid: string }>();
  const { data: reparations, loading } = useReparationsClient(uid ?? "");
  const { setBreadcrumbs } = useHeader();

  useEffect(() => {
    setBreadcrumbs([{ label: t("sidebar.clients"), href: "/backoffice/dashboard" }]);
  }, [t, setBreadcrumbs]);

  return (
    <section className="min-h-screen flex flex-col flex-1 pb-24">
      <AnimatedPlaceholder
        loading={loading}
        skeletonCount={5}
        skeletonClassName="w-full h-48 aspect-square rounded-xl bg-muted/50"
      >
        <div className="flex flex-1 flex-col p-4">
          {reparations.length <= 0 ? (
            <EmptyReparation />
          ) : (
            reparations.map((reparation, i) => (
              <div key={reparation.id} className="flex flex-col">
                {i > 0 && <Separator className="my-4" />}
                <ReparationClientCard reparation={reparation} />
              </div>
            ))
          )}
        </div>
      </AnimatedPlaceholder>
    </section>
  );
};

export default Home;
