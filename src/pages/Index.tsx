import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import DepartmentChart from "@/components/DepartmentChart";
import StatsCards from "@/components/StatsCards";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-6">
        <Navbar />
        <StatsCards />
        <DepartmentChart />
        <div className="mt-6 flex justify-center">
          <Link to="/stats">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300 gap-2 font-semibold"
            >
              Подробная статистика
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
