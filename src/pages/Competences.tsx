import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Download, Upload, Save, Plus, Trash2, UserPlus, UserMinus, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  name: string;
  id: number;
  position: string;
  department: string;
}

interface Department {
  id: string;
  name: string;
}

const defaultDepartments: Department[] = [
  { id: "consulting", name: "Консалтинг" },
  { id: "dev", name: "Разработка" },
  { id: "analytics", name: "Аналитика" },
];

const defaultEmployees: Employee[] = [
  { name: "Алексашкин Святослав Сергеевич", id: 2733, position: "Младший консультант по и", department: "consulting" },
  { name: "Болтнев Станислав Александрович", id: 2379, position: "Ведущий консультант по и", department: "consulting" },
  { name: "Ефремов Алексей Владимирович", id: 2721, position: "Ведущий консультант по и", department: "consulting" },
  { name: "Казаков Антон Вячеславович", id: 2365, position: "Аналитик", department: "analytics" },
  { name: "Лунев Никита", id: 2713, position: "Младший консультант по и", department: "consulting" },
  { name: "Петянов Леонид Станиславович", id: 2705, position: "Младший консультант по и", department: "consulting" },
  { name: "Пронина Ирина Михайловна", id: 2473, position: "Консультант по информац", department: "consulting" },
  { name: "Пучков Олег Анатольевич", id: 1973, position: "Ведущий консультант по и", department: "consulting" },
  { name: "Садкова Виктория Александровна", id: 2691, position: "Младший консультант по и", department: "consulting" },
  { name: "Сокотун Ирина Олеговна", id: 2175, position: "Ведущий консультант по и", department: "consulting" },
  { name: "Хисматова Алина Руслановна", id: 2585, position: "Консультант по информац", department: "consulting" },
  { name: "Шмырина Анастасия Анатольевна", id: 2325, position: "", department: "dev" },
  { name: "Ярков Константин Владимирович", id: 2819, position: "", department: "dev" },
  { name: "Ярышев Владимир Сергеевич", id: 2835, position: "", department: "dev" },
];

const defaultConfigSkills = ["Должность", "УХ", "УПП", "ERP Опер. Учет", "ERP Рег. Учет", "ERP Бюджет", "ЗУП", "БП", "УТ", "УНФ", "ДО", "ТОиР", "ИТИЛ"];

const defaultCrmSkills = [
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

type MatrixData = Record<string, Record<string, number>>;

const initMatrix = (employees: Employee[], configSkills: string[], crmSkills: string[]): MatrixData => {
  const m: MatrixData = {};
  employees.forEach(emp => {
    m[emp.id] = {};
    [...configSkills, ...crmSkills].forEach(s => { m[emp.id][s] = 0; });
  });
  if (m[2733]) { m[2733]["УНФ"]=1; }
  if (m[2379]) { m[2379]["ERP Опер. Учет"]=2; m[2379]["БП"]=3; m[2379]["УНФ"]=1; }
  if (m[2721]) { m[2721]["ERP Опер. Учет"]=3; m[2721]["ERP Бюджет"]=1; m[2721]["ДО"]=3; m[2721]["ТОиР"]=3; m[2721]["ИТИЛ"]=3; }
  if (m[2365]) { m[2365]["БП"]=3; m[2365]["УТ"]=3; }
  if (m[2713]) { m[2713]["БП"]=1; }
  if (m[2705]) { m[2705]["УНФ"]=1; }
  if (m[2473]) { m[2473]["ERP Опер. Учет"]=3; m[2473]["ERP Рег. Учет"]=1; m[2473]["ЗУП"]=1; m[2473]["БП"]=1; m[2473]["УТ"]=2; m[2473]["УНФ"]=2; m[2473]["ДО"]=3; }
  if (m[1973]) { m[1973]["УХ"]=1; m[1973]["ERP Опер. Учет"]=3; m[1973]["ERP Бюджет"]=1; m[1973]["ЗУП"]=1; m[1973]["БП"]=1; m[1973]["УТ"]=1; m[1973]["УНФ"]=1; }
  if (m[2691]) { m[2691]["УНФ"]=1; }
  if (m[2175]) { m[2175]["УПП"]=3; m[2175]["ERP Опер. Учет"]=3; m[2175]["ERP Рег. Учет"]=3; }
  if (m[2585]) { m[2585]["ERP Опер. Учет"]=1; m[2585]["ЗУП"]=2; }
  if (m[2325]) { m[2325]["ERP Опер. Учет"]=1; m[2325]["ERP Рег. Учет"]=2; }
  if (m[2835]) { m[2835]["УХ"]=3; m[2835]["УПП"]=3; m[2835]["ERP Опер. Учет"]=3; m[2835]["ERP Рег. Учет"]=3; m[2835]["ERP Бюджет"]=3; m[2835]["ЗУП"]=3; m[2835]["БП"]=3; m[2835]["УТ"]=3; m[2835]["УНФ"]=3; m[2835]["ДО"]=3; m[2835]["ТОиР"]=3; m[2835]["ИТИЛ"]=3; }
  if (m[2733]) { m[2733]["Документация и инструкции"]=2; m[2733]["Обновления"]=3; m[2733]["Обучение/ Передача знаний"]=2; m[2733]["Оценка/ЧТЗ/ Спецификации"]=2; m[2733]["Сбор требований/ предпроект"]=1; m[2733]["Сопровождение: прочие обращения"]=3; m[2733]["Тестирование"]=2; }
  if (m[2379]) { m[2379]["Документация и инструкции"]=3; m[2379]["Обновления"]=2; m[2379]["Обучение/ Передача знаний"]=3; m[2379]["Оценка/ЧТЗ/ Спецификации"]=4; m[2379]["Сбор требований/ предпроект"]=4; m[2379]["Сопровождение: прочие обращения"]=3; m[2379]["Тестирование"]=3; }
  if (m[2721]) { m[2721]["Документация и инструкции"]=3; m[2721]["Оценка/ЧТЗ/ Спецификации"]=3; m[2721]["Тестирование"]=3; }
  if (m[2365]) { m[2365]["Документация и инструкции"]=4; m[2365]["Обновления"]=3; m[2365]["Обучение/ Передача знаний"]=4; m[2365]["Оценка/ЧТЗ/ Спецификации"]=4; m[2365]["Сбор требований/ предпроект"]=4; m[2365]["Сопровождение: прочие обращения"]=3; m[2365]["Тестирование"]=4; }
  if (m[2713]) { m[2713]["Документация и инструкции"]=2; m[2713]["Обновления"]=2; m[2713]["Обучение/ Передача знаний"]=3; m[2713]["Оценка/ЧТЗ/ Спецификации"]=1; m[2713]["Сбор требований/ предпроект"]=2; m[2713]["Сопровождение: прочие обращения"]=3; m[2713]["Тестирование"]=3; }
  if (m[2705]) { m[2705]["Документация и инструкции"]=2; m[2705]["Обновления"]=4; m[2705]["Обучение/ Передача знаний"]=2; m[2705]["Оценка/ЧТЗ/ Спецификации"]=2; m[2705]["Сбор требований/ предпроект"]=2; m[2705]["Сопровождение: прочие обращения"]=4; m[2705]["Тестирование"]=2; }
  if (m[2473]) { m[2473]["Документация и инструкции"]=3; m[2473]["Обновления"]=3; m[2473]["Обучение/ Передача знаний"]=3; m[2473]["Оценка/ЧТЗ/ Спецификации"]=3; m[2473]["Сбор требований/ предпроект"]=3; m[2473]["Сопровождение: прочие обращения"]=3; m[2473]["Тестирование"]=3; }
  if (m[1973]) { m[1973]["Документация и инструкции"]=3; m[1973]["Обновления"]=1; m[1973]["Обучение/ Передача знаний"]=3; m[1973]["Оценка/ЧТЗ/ Спецификации"]=4; m[1973]["Сбор требований/ предпроект"]=3; m[1973]["Сопровождение: прочие обращения"]=3; m[1973]["Тестирование"]=3; }
  if (m[2691]) { m[2691]["Документация и инструкции"]=2; m[2691]["Обновления"]=4; m[2691]["Обучение/ Передача знаний"]=2; m[2691]["Оценка/ЧТЗ/ Спецификации"]=2; m[2691]["Сбор требований/ предпроект"]=2; m[2691]["Сопровождение: прочие обращения"]=4; m[2691]["Тестирование"]=2; }
  if (m[2175]) { m[2175]["Документация и инструкции"]=3; m[2175]["Обновления"]=1; m[2175]["Обучение/ Передача знаний"]=3; m[2175]["Оценка/ЧТЗ/ Спецификации"]=3; m[2175]["Сбор требований/ предпроект"]=3; m[2175]["Сопровождение: прочие обращения"]=3; m[2175]["Тестирование"]=3; }
  if (m[2585]) { m[2585]["Документация и инструкции"]=2; m[2585]["Обновления"]=3; m[2585]["Обучение/ Передача знаний"]=2; m[2585]["Оценка/ЧТЗ/ Спецификации"]=2; m[2585]["Сбор требований/ предпроект"]=2; m[2585]["Сопровождение: прочие обращения"]=3; m[2585]["Тестирование"]=3; }
  if (m[2325]) { m[2325]["Документация и инструкции"]=2; m[2325]["Обновления"]=1; m[2325]["Обучение/ Передача знаний"]=3; m[2325]["Оценка/ЧТЗ/ Спецификации"]=3; m[2325]["Сбор требований/ предпроект"]=2; m[2325]["Сопровождение: прочие обращения"]=3; m[2325]["Тестирование"]=3; }
  if (m[2819]) { m[2819]["Документация и инструкции"]=2; m[2819]["Обновления"]=2; }
  return m;
};

const cellColor = (val: number, max: number) => {
  if (val === 0) return "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/40";
  if (max === 3) {
    if (val === 1) return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40";
    if (val === 2) return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40";
    return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 font-bold";
  }
  if (val === 1) return "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40";
  if (val === 2) return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/40";
  if (val === 3) return "text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/40 font-semibold";
  return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 font-bold";
};

const Competences = () => {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>(defaultDepartments);
  const [selectedDept, setSelectedDept] = useState<string>("all");
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [configSkills, setConfigSkills] = useState<string[]>(defaultConfigSkills);
  const [crmSkills, setCrmSkills] = useState<string[]>(defaultCrmSkills);
  const [matrix, setMatrix] = useState<MatrixData>(() => initMatrix(defaultEmployees, defaultConfigSkills, defaultCrmSkills));
  const [activeTab, setActiveTab] = useState<"config" | "crm">("config");

  // Dialogs
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpId, setNewEmpId] = useState("");
  const [newEmpPosition, setNewEmpPosition] = useState("");
  const [newEmpDept, setNewEmpDept] = useState("");
  const [showAddDept, setShowAddDept] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");

  const skills = activeTab === "config" ? configSkills : crmSkills;

  const filteredEmployees = useMemo(() => {
    if (selectedDept === "all") return employees;
    return employees.filter(e => e.department === selectedDept);
  }, [employees, selectedDept]);

  const handleChange = (empId: number, skill: string, value: string) => {
    const num = parseInt(value) || 0;
    setMatrix(prev => ({
      ...prev,
      [empId]: { ...prev[empId], [skill]: num },
    }));
  };

  const handleSave = () => {
    toast({ title: "Сохранено", description: "Матрица компетенций сохранена" });
  };

  const handleAddSkill = () => {
    const name = newSkillName.trim();
    if (!name) return;
    if ([...configSkills, ...crmSkills].includes(name)) {
      toast({ title: "Ошибка", description: "Такая компетенция уже существует", variant: "destructive" });
      return;
    }
    if (activeTab === "config") {
      setConfigSkills(prev => [...prev, name]);
    } else {
      setCrmSkills(prev => [...prev, name]);
    }
    setMatrix(prev => {
      const next = { ...prev };
      employees.forEach(emp => {
        next[emp.id] = { ...next[emp.id], [name]: 0 };
      });
      return next;
    });
    setNewSkillName("");
    setShowAddSkill(false);
    toast({ title: "Добавлено", description: `Компетенция «${name}» добавлена` });
  };

  const handleRemoveSkill = (skill: string) => {
    if (activeTab === "config") {
      setConfigSkills(prev => prev.filter(s => s !== skill));
    } else {
      setCrmSkills(prev => prev.filter(s => s !== skill));
    }
    setMatrix(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => {
        const row = { ...next[id] };
        delete row[skill];
        next[id] = row;
      });
      return next;
    });
    toast({ title: "Удалено", description: `Компетенция «${skill}» удалена` });
  };

  const handleAddEmployee = () => {
    const name = newEmpName.trim();
    const id = parseInt(newEmpId);
    if (!name || !id) {
      toast({ title: "Ошибка", description: "Укажите ФИО и ID сотрудника", variant: "destructive" });
      return;
    }
    if (employees.some(e => e.id === id)) {
      toast({ title: "Ошибка", description: "Сотрудник с таким ID уже существует", variant: "destructive" });
      return;
    }
    const dept = newEmpDept || (selectedDept !== "all" ? selectedDept : departments[0]?.id || "");
    const emp: Employee = { name, id, position: newEmpPosition.trim(), department: dept };
    setEmployees(prev => [...prev, emp]);
    setMatrix(prev => {
      const row: Record<string, number> = {};
      [...configSkills, ...crmSkills].forEach(s => { row[s] = 0; });
      return { ...prev, [id]: row };
    });
    setNewEmpName("");
    setNewEmpId("");
    setNewEmpPosition("");
    setNewEmpDept("");
    setShowAddEmployee(false);
    toast({ title: "Добавлено", description: `Сотрудник «${name}» добавлен в матрицу` });
  };

  const handleRemoveEmployee = (empId: number) => {
    setEmployees(prev => prev.filter(e => e.id !== empId));
    setMatrix(prev => {
      const next = { ...prev };
      delete next[empId];
      return next;
    });
    toast({ title: "Удалено", description: "Сотрудник удалён из матрицы" });
  };

  const handleAddDept = () => {
    const name = newDeptName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    if (departments.some(d => d.name === name)) {
      toast({ title: "Ошибка", description: "Отдел с таким названием уже существует", variant: "destructive" });
      return;
    }
    setDepartments(prev => [...prev, { id, name }]);
    setNewDeptName("");
    setShowAddDept(false);
    toast({ title: "Добавлено", description: `Отдел «${name}» создан` });
  };

  const handleRemoveDept = (deptId: string) => {
    const dept = departments.find(d => d.id === deptId);
    const empsInDept = employees.filter(e => e.department === deptId);
    if (empsInDept.length > 0) {
      toast({ title: "Ошибка", description: `В отделе «${dept?.name}» есть сотрудники. Сначала удалите или переместите их.`, variant: "destructive" });
      return;
    }
    setDepartments(prev => prev.filter(d => d.id !== deptId));
    if (selectedDept === deptId) setSelectedDept("all");
    toast({ title: "Удалено", description: `Отдел «${dept?.name}» удалён` });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        {/* Export / Import */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Компетенции</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">Экспорт</h2>
              <div className="flex flex-col gap-1.5">
                <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  Скачать competencies.csv
                </a>
                <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 shrink-0" />
                  Скачать matrix.xlsx (шаблонный формат)
                </a>
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">Импорт (bulk replace)</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Поддерживаемые форматы: <span className="font-bold text-foreground">CSV</span> и{" "}
                <span className="font-bold text-foreground">XLSX</span>.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Input type="file" accept=".csv,.xlsx" className="w-full sm:w-64 bg-background/70" />
                <Button className="gap-1.5 shadow-md w-full sm:w-auto">
                  <Upload className="w-4 h-4" />
                  Загрузить файл
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Matrix */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Матрица компетенций</h2>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setShowAddDept(true)}>
                <Building2 className="w-4 h-4" />
                Отдел
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setShowAddEmployee(true)}>
                <UserPlus className="w-4 h-4" />
                Сотрудник
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setShowAddSkill(true)}>
                <Plus className="w-4 h-4" />
                Компетенция
              </Button>
            </div>
          </div>

          {/* Department selector */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm font-medium text-muted-foreground">Отдел:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedDept("all")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedDept === "all"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/70 text-secondary-foreground hover:bg-accent"
                }`}
              >
                Все ({employees.length})
              </button>
              {departments.map(dept => {
                const count = employees.filter(e => e.department === dept.id).length;
                return (
                  <div key={dept.id} className="relative group/dept">
                    <button
                      onClick={() => setSelectedDept(dept.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all pr-6 ${
                        selectedDept === dept.id
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-secondary/70 text-secondary-foreground hover:bg-accent"
                      }`}
                    >
                      {dept.name} ({count})
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRemoveDept(dept.id); }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/dept:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                      title={`Удалить отдел «${dept.name}»`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("config")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === "config"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent"
              }`}
            >
              Конфигурации (0..3)
            </button>
            <button
              onClick={() => setActiveTab("crm")}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === "crm"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent"
              }`}
            >
              CRM (0..4)
            </button>
          </div>

          <div className="rounded-xl border border-border overflow-auto scrollbar-thin -mx-4 sm:mx-0">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-bold text-foreground sticky left-0 bg-muted/90 z-10 min-w-[120px] sm:min-w-[140px] text-xs sm:text-sm">ФИО</TableHead>
                    <TableHead className="font-bold text-foreground w-14 sm:w-16 text-center text-xs sm:text-sm">ID</TableHead>
                    <TableHead className="font-bold text-foreground min-w-[100px] sm:min-w-[160px] text-xs sm:text-sm">Должность</TableHead>
                    {selectedDept === "all" && (
                      <TableHead className="font-bold text-foreground min-w-[80px] text-xs sm:text-sm">Отдел</TableHead>
                    )}
                    {skills.map(s => (
                      <TableHead key={s} className="font-bold text-foreground text-center min-w-[50px] sm:min-w-[60px] text-[10px] sm:text-xs relative group">
                        <div className="flex flex-col items-center gap-0.5">
                          <span>{s}</span>
                          <button
                            onClick={() => handleRemoveSkill(s)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                            title={`Удалить «${s}»`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="w-10 text-center text-xs">
                      <span className="sr-only">Действия</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={skills.length + 4} className="text-center text-muted-foreground py-8">
                        Нет сотрудников в выбранном отделе
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map(emp => (
                      <TableRow key={emp.id} className="group/row transition-colors duration-200">
                        <TableCell className="font-medium text-foreground sticky left-0 bg-card/90 z-10 text-xs sm:text-sm">
                          {emp.name}
                        </TableCell>
                        <TableCell className="font-mono text-muted-foreground text-center text-xs sm:text-sm">{emp.id}</TableCell>
                        <TableCell className="text-muted-foreground text-xs sm:text-sm">{emp.position}</TableCell>
                        {selectedDept === "all" && (
                          <TableCell className="text-muted-foreground text-xs sm:text-sm">
                            {departments.find(d => d.id === emp.department)?.name || "—"}
                          </TableCell>
                        )}
                        {skills.map(s => (
                          <TableCell key={s} className="text-center p-1">
                            <input
                              type="number"
                              min={0}
                              max={activeTab === "config" ? 3 : 4}
                              value={matrix[emp.id]?.[s] ?? 0}
                              onChange={e => handleChange(emp.id, s, e.target.value)}
                              className={`w-9 sm:w-10 h-7 sm:h-8 text-center text-xs sm:text-sm rounded-md border border-transparent hover:border-border focus:border-primary outline-none transition-all ${cellColor(matrix[emp.id]?.[s] ?? 0, activeTab === "config" ? 3 : 4)}`}
                            />
                          </TableCell>
                        ))}
                        <TableCell className="text-center p-1">
                          <button
                            onClick={() => handleRemoveEmployee(emp.id)}
                            className="opacity-0 group-hover/row:opacity-100 transition-opacity text-destructive hover:text-destructive/80 p-1"
                            title="Удалить сотрудника"
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-2 sm:hidden">← Прокрутите таблицу горизонтально →</p>

          <div className="mt-4">
            <Button onClick={handleSave} className="gap-1.5 shadow-md w-full sm:w-auto">
              <Save className="w-4 h-4" />
              Сохранить матрицу
            </Button>
          </div>
        </div>
      </div>

      {/* Add Skill Dialog */}
      <Dialog open={showAddSkill} onOpenChange={setShowAddSkill}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Добавить {activeTab === "config" ? "конфигурацию" : "компетенцию CRM"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Название"
              value={newSkillName}
              onChange={e => setNewSkillName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAddSkill()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSkill(false)}>Отмена</Button>
            <Button onClick={handleAddSkill}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Employee Dialog */}
      <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить сотрудника в матрицу</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="ФИО"
              value={newEmpName}
              onChange={e => setNewEmpName(e.target.value)}
            />
            <Input
              placeholder="ID (Битрикс)"
              type="number"
              value={newEmpId}
              onChange={e => setNewEmpId(e.target.value)}
            />
            <Input
              placeholder="Должность"
              value={newEmpPosition}
              onChange={e => setNewEmpPosition(e.target.value)}
            />
            <Select value={newEmpDept} onValueChange={setNewEmpDept}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите отдел" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(d => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddEmployee(false)}>Отмена</Button>
            <Button onClick={handleAddEmployee}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Department Dialog */}
      <Dialog open={showAddDept} onOpenChange={setShowAddDept}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Добавить отдел</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Название отдела"
              value={newDeptName}
              onChange={e => setNewDeptName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAddDept()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDept(false)}>Отмена</Button>
            <Button onClick={handleAddDept}>Добавить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Competences;
