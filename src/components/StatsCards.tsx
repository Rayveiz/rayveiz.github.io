import { Clock, CheckCircle, Users, TrendingUp } from "lucide-react";

const cards = [
  {
    title: "Всего часов",
    value: "1,247",
    change: "+12%",
    icon: Clock,
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-primary/15",
  },
  {
    title: "Закрыто задач",
    value: "342",
    change: "+8%",
    icon: CheckCircle,
    gradient: "from-chart-2/10 to-chart-2/5",
    iconBg: "bg-[hsl(199,70%,50%)]/15",
  },
  {
    title: "Сотрудников",
    value: "14",
    change: "активных",
    icon: Users,
    gradient: "from-chart-3/10 to-chart-3/5",
    iconBg: "bg-[hsl(280,60%,55%)]/15",
  },
  {
    title: "Средняя загрузка",
    value: "87%",
    change: "+3% к норме",
    icon: TrendingUp,
    gradient: "from-chart-4/10 to-chart-4/5",
    iconBg: "bg-[hsl(35,90%,55%)]/15",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(15,118,110,0.1)] transition-all duration-500 hover:-translate-y-1 group cursor-default`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-60 pointer-events-none`} />
          <div className="relative">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {card.title}
              </span>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                <card.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-foreground/70" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-card-foreground tracking-tight">
              {card.value}
            </div>
            <div className="text-[11px] sm:text-xs font-semibold text-primary mt-1 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {card.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
