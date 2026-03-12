import { Clock, CheckCircle, Users } from "lucide-react";

const cards = [
  {
    title: "Всего часов",
    value: "1,247",
    change: "+12% за неделю",
    icon: Clock,
    accent: "hsl(170, 75%, 26%)",
  },
  {
    title: "Закрыто задач",
    value: "342",
    change: "+8% за неделю",
    icon: CheckCircle,
    accent: "hsl(199, 70%, 50%)",
  },
  {
    title: "Сотрудников",
    value: "14",
    change: "активных",
    icon: Users,
    accent: "hsl(280, 60%, 55%)",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="relative overflow-hidden bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1 group cursor-default"
        >
          {/* Accent bar */}
          <div
            className="absolute top-0 left-0 w-full h-1 rounded-t-2xl opacity-80"
            style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
          />

          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {card.title}
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-card-foreground tracking-tight mt-1">
                {card.value}
              </div>
              <div className="text-[11px] sm:text-xs font-semibold text-primary mt-2 flex items-center gap-1.5">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: card.accent }}
                />
                {card.change}
              </div>
            </div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm shrink-0"
              style={{ background: `${card.accent}20` }}
            >
              <card.icon className="w-5 h-5" style={{ color: card.accent }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
