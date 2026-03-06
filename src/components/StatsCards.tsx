import { Clock, CheckCircle } from "lucide-react";

const cards = [
  {
    title: "Всего часов",
    value: "1,247",
    change: "+12%",
    icon: Clock,
  },
  {
    title: "Закрыто задач",
    value: "342",
    change: "+8%",
    icon: CheckCircle,
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(15,118,110,0.1)] transition-all duration-500 hover:-translate-y-1 group cursor-default"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {card.title}
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-sm">
              <card.icon className="w-4.5 h-4.5 text-secondary-foreground group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-card-foreground tracking-tight">
            {card.value}
          </div>
          <div className="text-xs font-semibold text-primary mt-1.5 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {card.change} за неделю
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
