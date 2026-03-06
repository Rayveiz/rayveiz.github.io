import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { ArrowLeft, Save, Upload, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

// Shared employee data
const employeesData: Record<number, {
  name: string; position: string; status: string; grade: string;
  total90d: number; avgMonthly: number; needMonthly: number; planHours3m: number; progressPercent: number;
  photoUrl: string | null;
}> = {
  2733: { name: "Алексашкин Святослав Сергеевич", position: "Младший консультант по информационным технологиям", status: "1", grade: "Junior", total90d: 312.5, avgMonthly: 104.2, needMonthly: 120, planHours3m: 360, progressPercent: 87, photoUrl: null },
  2379: { name: "Болтнев Станислав Александрович", position: "Ведущий консультант по информационным технологиям", status: "3", grade: "Senior", total90d: 485.0, avgMonthly: 161.7, needMonthly: 140, planHours3m: 420, progressPercent: 115, photoUrl: null },
  2721: { name: "Ефремов Алексей Владимирович", position: "Ведущий консультант по информационным технологиям", status: "3", grade: "Senior", total90d: 410.5, avgMonthly: 136.8, needMonthly: 140, planHours3m: 420, progressPercent: 98, photoUrl: null },
  2365: { name: "Казаков Антон Вячеславович", position: "Аналитик", status: "1", grade: "Middle", total90d: 295.0, avgMonthly: 98.3, needMonthly: 120, planHours3m: 360, progressPercent: 82, photoUrl: null },
  2713: { name: "Лунев Никита", position: "Младший консультант по информационным технологиям", status: "2", grade: "Junior", total90d: 280.0, avgMonthly: 93.3, needMonthly: 120, planHours3m: 360, progressPercent: 78, photoUrl: null },
  2705: { name: "Петянов Леонид Станиславович", position: "Младший консультант по информационным технологиям", status: "2", grade: "Junior", total90d: 305.0, avgMonthly: 101.7, needMonthly: 120, planHours3m: 360, progressPercent: 85, photoUrl: null },
  2473: { name: "Пронина Ирина Михайловна", position: "Консультант по информационным технологиям", status: "1", grade: "Middle", total90d: 350.0, avgMonthly: 116.7, needMonthly: 120, planHours3m: 360, progressPercent: 97, photoUrl: null },
  1973: { name: "Пучков Олег Анатольевич", position: "Ведущий консультант по информационным технологиям", status: "3", grade: "Senior", total90d: 520.0, avgMonthly: 173.3, needMonthly: 140, planHours3m: 420, progressPercent: 124, photoUrl: null },
  2691: { name: "Садкова Виктория Александровна", position: "Младший консультант по информационным технологиям", status: "1", grade: "Junior", total90d: 260.0, avgMonthly: 86.7, needMonthly: 120, planHours3m: 360, progressPercent: 72, photoUrl: null },
  2175: { name: "Сокотун Ирина Олеговна", position: "Ведущий консультант по информационным технологиям", status: "2", grade: "Senior", total90d: 390.0, avgMonthly: 130.0, needMonthly: 140, planHours3m: 420, progressPercent: 93, photoUrl: null },
  2585: { name: "Хисматова Алина Руслановна", position: "Консультант по информационным технологиям", status: "2", grade: "Middle", total90d: 330.0, avgMonthly: 110.0, needMonthly: 120, planHours3m: 360, progressPercent: 92, photoUrl: null },
  2325: { name: "Шмырина Анастасия Анатольевна", position: "", status: "3", grade: "Middle", total90d: 370.0, avgMonthly: 123.3, needMonthly: 120, planHours3m: 360, progressPercent: 103, photoUrl: null },
  2819: { name: "Ярков Константин Владимирович", position: "", status: "3", grade: "Middle", total90d: 345.0, avgMonthly: 115.0, needMonthly: 120, planHours3m: 360, progressPercent: 96, photoUrl: null },
  2835: { name: "Ярышев Владимир Сергеевич", position: "", status: "1", grade: "Lead", total90d: 450.0, avgMonthly: 150.0, needMonthly: 140, planHours3m: 420, progressPercent: 107, photoUrl: null },
};

const statusLabels: Record<string, string> = { "1": "Свободен", "2": "Занят", "3": "Завал" };
const statusColors: Record<string, string> = {
  "1": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "2": "text-amber-700 bg-amber-50 border-amber-200",
  "3": "text-red-700 bg-red-50 border-red-200",
};

// Mock tasks
const generateTasks = (empId: number) => {
  const configs = ["ERP Опер. Учет", "БП", "ЗУП", "УНФ", "CRM", "ДО", "УТ"];
  const types = ["Сопровождение", "Внедрение", "Обновление", "Консультация", "Доработка"];
  const statuses = ["Закрыта", "В работе", "На проверке"];
  const sources = ["Bitrix", "Jira", "Ручной ввод"];
  const tasks = [];
  const count = 15 + (empId % 10);
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90));
    tasks.push({
      id: empId * 100 + i,
      taskId: 10000 + Math.floor(Math.random() * 90000),
      hours: +(Math.random() * 8 + 0.5).toFixed(1),
      createdAt: date.toLocaleDateString("ru-RU"),
      source: sources[Math.floor(Math.random() * sources.length)],
      config: configs[Math.floor(Math.random() * configs.length)],
      taskType: types[Math.floor(Math.random() * types.length)],
      taskStatus: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return tasks;
};

const configSkills = ["УХ", "УПП", "ERP Опер. Учет", "ERP Рег. Учет", "ERP Бюджет", "ЗУП", "БП", "УТ", "УНФ", "ДО", "ТОиР", "ИТИЛ"];
const crmSkills = [
  "CRM: внедрение, доработки, сопровождение",
  "Документация и инструкции",
  "Обновления",
  "Обучение/ Передача знаний",
  "Оценка/ЧТЗ/ Спецификации",
  "Сбор требований/ предпроект",
  "Сопровождение: прочие обращения",
  "Тестирование",
  "Учет/ Хозяйственный блок",
];

const cellColor = (val: number, max: number) => {
  if (val === 0) return "text-red-500 bg-red-50";
  if (max === 3) {
    if (val === 1) return "text-orange-600 bg-orange-50";
    if (val === 2) return "text-yellow-600 bg-yellow-50";
    return "text-emerald-600 bg-emerald-50 font-bold";
  }
  if (val === 1) return "text-orange-600 bg-orange-50";
  if (val === 2) return "text-yellow-600 bg-yellow-50";
  if (val === 3) return "text-lime-600 bg-lime-50 font-semibold";
  return "text-emerald-600 bg-emerald-50 font-bold";
};

const EmployeeCard = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const empId = parseInt(id || "0");
  const emp = employeesData[empId];

  const [grade, setGrade] = useState(emp?.grade || "Middle");
  const [devPlan, setDevPlan] = useState<{ goal: string; deadline: string }[]>([
    { goal: "", deadline: "" },
  ]);
  const [compMode, setCompMode] = useState<"config" | "crm">("config");
  const [searchQuery, setSearchQuery] = useState("");
  const [configFilter, setConfigFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [compScores, setCompScores] = useState<Record<string, number>>(() => {
    const scores: Record<string, number> = {};
    [...configSkills, ...crmSkills].forEach(s => { scores[s] = Math.floor(Math.random() * 4); });
    return scores;
  });

  const tasks = useMemo(() => generateTasks(empId), [empId]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      if (searchQuery && !t.taskId.toString().includes(searchQuery) && !t.config.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (configFilter !== "all" && t.config !== configFilter) return false;
      if (typeFilter !== "all" && t.taskType !== typeFilter) return false;
      if (statusFilter !== "all" && t.taskStatus !== statusFilter) return false;
      return true;
    });
  }, [tasks, searchQuery, configFilter, typeFilter, statusFilter]);

  const configOptions = [...new Set(tasks.map(t => t.config))];
  const typeOptions = [...new Set(tasks.map(t => t.taskType))];
  const statusOptions = [...new Set(tasks.map(t => t.taskStatus))];

  const activeSkills = compMode === "config" ? configSkills : crmSkills;
  const maxScore = compMode === "config" ? 3 : 4;

  if (!emp) {
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <Navbar />
          <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-8 text-center">
            <h1 className="text-xl font-bold text-foreground mb-2">Сотрудник не найден</h1>
            <Link to="/employees" className="text-primary hover:underline text-sm">← Назад к сотрудникам</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        {/* Header */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <Link to="/employees" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Назад к сотрудникам
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Карточка сотрудника: {emp.name} ({empId})
          </h1>
        </div>

        {/* Profile + Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Profile */}
          <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold text-foreground mb-4">Профиль</h2>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Должность: <span className="text-foreground font-medium">{emp.position || "—"}</span></p>
              <p className="text-muted-foreground">Статус: <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium border ${statusColors[emp.status]}`}>{statusLabels[emp.status]}</span></p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>Грейд (эвристика):</span>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="w-32 h-7 text-xs bg-background/70"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Middle">Middle</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Фото сотрудника */}
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-foreground mb-2">Фото</h3>
                {emp.photoUrl ? (
                  <img src={emp.photoUrl} alt="Фото" className="w-44 h-44 object-cover rounded-xl border border-border mb-2" />
                ) : (
                  <div className="w-44 h-44 rounded-xl border border-border bg-muted/50 flex items-center justify-center mb-2">
                    <User className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}
                <p className="text-[11px] text-muted-foreground text-center mb-2">
                  {emp.photoUrl ? "Фото загружено" : "Фото отсутствует"}
                </p>
                <div className="flex items-center gap-1.5">
                  <Input type="file" accept=".jpg,.jpeg,.png,.webp" className="w-36 bg-background/70 text-xs" />
                  <Button size="sm" className="gap-1 shrink-0 text-xs px-2">
                    <Upload className="w-3 h-3" />
                    Загрузить
                  </Button>
                </div>
              </div>

              {/* Тип сотрудника */}
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-foreground mb-2 text-center leading-tight">Актуальный тип сотрудника<br /><span className="text-[11px] font-normal text-muted-foreground">по результатам последнего опроса</span></h3>
                <div className="w-36 h-36 rounded-xl border border-dashed border-border bg-muted/30 flex items-center justify-center mb-2">
                  <User className="w-12 h-12 text-muted-foreground/20" />
                </div>
                <textarea
                  placeholder="Описание типа сотрудника..."
                  rows={3}
                  className="w-full max-w-[220px] text-xs rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold text-foreground mb-4">Выработка</h2>
            <div className="space-y-3 text-sm">
              <p className="text-muted-foreground">За 90 дней: <span className="text-foreground font-bold text-lg">{emp.total90d.toFixed(1)} ч</span></p>
              <p className="text-muted-foreground">Средняя выработка: <span className="text-foreground font-medium">{emp.avgMonthly.toFixed(1)} ч/мес</span> <span className="text-xs">(минимум: {emp.needMonthly.toFixed(1)})</span></p>
              <p className="text-muted-foreground">План 3 месяца: <span className="text-foreground font-medium">{emp.planHours3m.toFixed(1)} ч</span></p>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-muted-foreground text-xs">Прогресс</span>
                  <span className={`text-sm font-bold ${emp.progressPercent >= 100 ? "text-emerald-600" : emp.progressPercent >= 80 ? "text-foreground" : "text-red-500"}`}>{emp.progressPercent}%</span>
                </div>
                <Progress value={Math.min(emp.progressPercent, 100)} className="h-3" />
              </div>
            </div>
          </div>

          {/* Development Plan */}
          <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold text-foreground mb-4">План развития</h2>
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-bold text-foreground">Цель</TableHead>
                    <TableHead className="font-bold text-foreground w-40">Срок</TableHead>
                    <TableHead className="w-12" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devPlan.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="p-1.5">
                        <Input
                          value={row.goal}
                          onChange={e => {
                            const next = [...devPlan];
                            next[i] = { ...next[i], goal: e.target.value };
                            setDevPlan(next);
                          }}
                          placeholder="Описание цели..."
                          className="bg-background/70 text-sm h-8"
                        />
                      </TableCell>
                      <TableCell className="p-1.5">
                        <Input
                          type="date"
                          value={row.deadline}
                          onChange={e => {
                            const next = [...devPlan];
                            next[i] = { ...next[i], deadline: e.target.value };
                            setDevPlan(next);
                          }}
                          className="bg-background/70 text-sm h-8"
                        />
                      </TableCell>
                      <TableCell className="p-1.5 text-center">
                        {devPlan.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => setDevPlan(devPlan.filter((_, j) => j !== i))}
                          >
                            ×
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => setDevPlan([...devPlan, { goal: "", deadline: "" }])}
            >
              + Добавить цель
            </Button>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-foreground mb-4">Задачи (учтенное время, последние 90 дней)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
            <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Поиск..." className="bg-background/70" />
            <Select value={configFilter} onValueChange={setConfigFilter}>
              <SelectTrigger className="bg-background/70"><SelectValue placeholder="Конфигурация" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все конфигурации</SelectItem>
                {configOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-background/70"><SelectValue placeholder="Тип" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                {typeOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background/70"><SelectValue placeholder="Статус" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                {statusOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="text-xs text-muted-foreground self-center">
              Показано {filteredTasks.length} из {tasks.length}
            </div>
          </div>

          <div className="rounded-xl border border-border overflow-auto scrollbar-thin max-h-[400px]">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50 sticky top-0 z-10">
                  <TableHead className="font-bold text-foreground w-16">ID</TableHead>
                  <TableHead className="font-bold text-foreground">Task ID</TableHead>
                  <TableHead className="font-bold text-foreground w-20">Часы</TableHead>
                  <TableHead className="font-bold text-foreground">Дата</TableHead>
                  <TableHead className="font-bold text-foreground">Источник</TableHead>
                  <TableHead className="font-bold text-foreground">Конфигурация</TableHead>
                  <TableHead className="font-bold text-foreground">Тип</TableHead>
                  <TableHead className="font-bold text-foreground">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map(t => (
                  <TableRow key={t.id} className="transition-colors duration-200">
                    <TableCell className="font-mono text-muted-foreground text-xs">{t.id}</TableCell>
                    <TableCell className="font-mono text-muted-foreground text-sm">{t.taskId}</TableCell>
                    <TableCell className="font-medium text-foreground">{t.hours}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{t.createdAt}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{t.source}</TableCell>
                    <TableCell className="text-sm">{t.config}</TableCell>
                    <TableCell className="text-sm">{t.taskType}</TableCell>
                    <TableCell className="text-sm">{t.taskStatus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Competency matrix */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-semibold text-foreground mb-3">Матрица компетенций</h2>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setCompMode("config")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                compMode === "config"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent"
              }`}
            >
              По конфигурации (0–3)
            </button>
            <button
              onClick={() => setCompMode("crm")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                compMode === "crm"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent"
              }`}
            >
              По типам задач (0–4)
            </button>
          </div>

          <div className="rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold text-foreground">Навык</TableHead>
                  <TableHead className="font-bold text-foreground w-32 text-center">Оценка (0–{maxScore})</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeSkills.map(skill => (
                  <TableRow key={skill}>
                    <TableCell className="text-sm text-foreground">{skill}</TableCell>
                    <TableCell className="text-center p-2">
                      <input
                        type="number"
                        min={0}
                        max={maxScore}
                        value={compScores[skill] ?? 0}
                        onChange={e => setCompScores(prev => ({ ...prev, [skill]: parseInt(e.target.value) || 0 }))}
                        className={`w-14 h-8 text-center text-sm rounded-md border border-transparent hover:border-border focus:border-primary outline-none transition-all ${cellColor(compScores[skill] ?? 0, maxScore)}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Button onClick={() => toast({ title: "Сохранено", description: "Матрица компетенций обновлена" })} className="gap-1.5 shadow-md w-full sm:w-auto">
              <Save className="w-4 h-4" />
              Сохранить матрицу
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
