import { useState, useMemo } from "react";
import { format, differenceInDays } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";

const taskTypes = [
  "ERP Опер. Учет", "БП", "ЗУП", "УНФ", "CRM", "ДО", "УТ",
  "Сопровождение", "Внедрение", "Обновление", "Консультация", "Доработка",
  "Тестирование", "Обучение", "Документация",
];

const departments = [
  { key: "all", label: "Все отделы" },
  { key: "analytics", label: "Аналитика" },
  { key: "consulting", label: "Консалтинг" },
  { key: "dev", label: "Разработка" },
] as const;

const generateCompetencyData = (days: number, deptKey: string) => {
  const deptSeed = deptKey.charCodeAt(0) * 11 + deptKey.length * 7;
  const seed = days * 7 + deptSeed;
  return taskTypes.map((name, i) => ({
    name,
    count: Math.floor(((seed + i * 17) % 50) + 5 + ((seed + i * 137 + 97) * 2654435761 >>> 0) % 20),
  })).sort((a, b) => b.count - a.count);
};

const TopCompetenciesTable = () => {
  const [activeDept, setActiveDept] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date>(() => {
    const d = new Date(); d.setDate(d.getDate() - 30); return d;
  });
  const [dateTo, setDateTo] = useState<Date>(new Date());

  const days = Math.max(differenceInDays(dateTo, dateFrom), 1);
  const data = useMemo(() => generateCompetencyData(days, activeDept), [days, activeDept]);
  const total = data.reduce((s, d) => s + d.count, 0);

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col">
      <h2 className="text-lg sm:text-xl font-bold text-card-foreground mb-1">
        Востребованные компетенции
      </h2>
      <p className="text-xs text-muted-foreground mb-3">Типы задач за выбранный период</p>

      {/* Department selector */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-muted/60 rounded-xl p-1 self-start overflow-x-auto mb-3">
        {departments.map((d) => (
          <button
            key={d.key}
            onClick={() => setActiveDept(d.key)}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
              activeDept === d.key
                ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(15,118,110,0.3)]"
                : "text-muted-foreground hover:text-card-foreground hover:bg-card/80"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("h-8 text-xs justify-start gap-1.5")}>
              <CalendarIcon className="w-3.5 h-3.5" />
              {format(dateFrom, "dd.MM.yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateFrom} onSelect={(d) => d && setDateFrom(d)} initialFocus className="p-3 pointer-events-auto" locale={ru} />
          </PopoverContent>
        </Popover>
        <span className="text-muted-foreground text-xs">—</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("h-8 text-xs justify-start gap-1.5")}>
              <CalendarIcon className="w-3.5 h-3.5" />
              {format(dateTo, "dd.MM.yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateTo} onSelect={(d) => d && setDateTo(d)} initialFocus className="p-3 pointer-events-auto" locale={ru} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-xl border border-border overflow-auto scrollbar-thin flex-1 max-h-[380px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 sticky top-0 z-10">
              <TableHead className="font-bold text-foreground">Компетенция / Тип</TableHead>
              <TableHead className="font-bold text-foreground text-center w-24">Задач</TableHead>
              <TableHead className="font-bold text-foreground text-center w-20">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => {
              const pct = ((row.count / total) * 100).toFixed(1);
              return (
                <TableRow key={row.name}>
                  <TableCell className="text-sm text-foreground">{row.name}</TableCell>
                  <TableCell className="text-center font-medium text-foreground">{row.count}</TableCell>
                  <TableCell className="text-center text-muted-foreground text-sm">{pct}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Всего задач: {total} · Период: {days} дн.</p>
    </div>
  );
};

export default TopCompetenciesTable;
