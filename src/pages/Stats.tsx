import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";

const Stats = () => {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-6">
        <Navbar />
        <div className="bg-card border border-border rounded-xl p-12 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            Подробная статистика
          </h1>
          <p className="text-muted-foreground">
            Эта страница будет проработана позже.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
