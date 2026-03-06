import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import DepartmentChart from "@/components/DepartmentChart";
import TopCompetenciesTable from "@/components/TopCompetenciesTable";
import StatsCards from "@/components/StatsCards";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        {/* Welcome header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Дашборд
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Обзор показателей отдела аналитики
          </p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <DepartmentChart />
          <TopCompetenciesTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
