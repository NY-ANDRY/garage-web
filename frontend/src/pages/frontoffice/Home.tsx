import { DataTable } from "@/components/shadcn/data-table";
import data from '@/test/seed/data.json';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center pb-24">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      <DataTable data={data} />
      </h1>
    </div>
  );
}

export default Home;