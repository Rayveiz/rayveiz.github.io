import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { CalendarDays } from "lucide-react";

const periods = [
  { key: "week", label: "Неделя", days: 7 },
  { key: "2weeks", label: "2 нед.", days: 14 },
  { key: "month", label: "Месяц", days: 30 },
  { key: "quarter", label: "Квартал", days: 90 },
] as const;

const generateData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}`,
      hours: Math.floor(Math.random() * 35 + 20),
    });
  }
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl px-3 sm:px-4 py-2 sm:py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
        <p className="text-base sm:text-lg font-bold text-card-foreground">
          {payload[0].value} <span className="text-xs sm:text-sm font-normal text-muted-foreground">часов</span>
        </p>
      </div>
    );
  }
  return null;
};

const DepartmentChart = () => {
  const isMobile = useIsMobile();
  const [activePeriod, setActivePeriod] = useState<string>("2weeks");

  const selectedPeriod = periods.find((p) => p.key === activePeriod)!;
  const data = useMemo(() => generateData(selectedPeriod.days), [activePeriod]);

  const avgHours = Math.round(data.reduce((s, d) => s + d.hours, 0) / data.length);
  const maxHours = Math.max(...data.map((d) => d.hours));

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-card-foreground flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Загрузка отдела аналитики
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Закрытые часы · Среднее: <span className="font-semibold text-card-foreground">{avgHours}ч</span> · Макс: <span className="font-semibold text-card-foreground">{maxHours}ч</span>
          </p>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 bg-muted/60 rounded-xl p-1 self-start overflow-x-auto">
          <CalendarDays className="w-4 h-4 text-muted-foreground ml-1.5 sm:ml-2 shrink-0" />
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setActivePeriod(p.key)}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                activePeriod === p.key
                  ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(15,118,110,0.3)]"
                  : "text-muted-foreground hover:text-card-foreground hover:bg-card/80"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280} className="sm:!h-[380px]">
        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 5, left: -10 }}>
          <defs>
            <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(170, 75%, 26%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(170, 75%, 26%)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 20%, 92%)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "hsl(220, 10%, 42%)" }}
            axisLine={false}
            tickLine={false}
            interval={isMobile ? Math.max(Math.floor(selectedPeriod.days / 5), 1) : (selectedPeriod.days > 14 ? Math.floor(selectedPeriod.days / 8) : 0)}
            angle={isMobile ? -45 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 50 : 30}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(220, 10%, 42%)" }}
            axisLine={false}
            tickLine={false}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "hsl(170, 75%, 26%)", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="hours"
            name="Часы"
            stroke="hsl(170, 75%, 26%)"
            strokeWidth={2.5}
            fill="url(#hoursGradient)"
            dot={selectedPeriod.days <= 14 ? { r: 3, fill: "hsl(170, 75%, 26%)", strokeWidth: 2, stroke: "hsl(0, 0%, 100%)" } : false}
            activeDot={{ r: 6, fill: "hsl(170, 75%, 26%)", strokeWidth: 3, stroke: "hsl(0, 0%, 100%)" }}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
