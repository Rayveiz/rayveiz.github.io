import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";

const cards = [
  {
    title: "Всего часов",
    value: "1,247",
    change: "+12%",
    icon: Clock,
    positive: true,
  },
  {
    title: "Активных сотрудников",
    value: "86",
    change: "+3",
    icon: Users,
    positive: true,
  },
  {
    title: "Закрыто задач",
    value: "342",
    change: "+8%",
    icon: CheckCircle,
    positive: true,
  },
  {
    title: "Эффективность",
    value: "94%",
    change: "+2%",
    icon: TrendingUp,
    positive: true,
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group cursor-default"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              {card.title}
            </span>
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              <card.icon className="w-4 h-4 text-secondary-foreground group-hover:text-primary-foreground transition-colors duration-300" />
            </div>
          </div>
          <div className="text-2xl font-bold text-card-foreground">
            {card.value}
          </div>
          <div className="text-xs font-semibold text-primary mt-1">
            {card.change} за неделю
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
