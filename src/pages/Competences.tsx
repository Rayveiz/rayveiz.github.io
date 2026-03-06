import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Download, Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const employees = [
  { name: "Алексашкин Святослав Сергеевич", id: 2733, position: "Младший консультант по и" },
  { name: "Болтнев Станислав Александрович", id: 2379, position: "Ведущий консультант по и" },
  { name: "Ефремов Алексей Владимирович", id: 2721, position: "Ведущий консультант по и" },
  { name: "Казаков Антон Вячеславович", id: 2365, position: "Аналитик" },
  { name: "Лунев Никита", id: 2713, position: "Младший консультант по и" },
  { name: "Петянов Леонид Станиславович", id: 2705, position: "Младший консультант по и" },
  { name: "Пронина Ирина Михайловна", id: 2473, position: "Консультант по информац" },
  { name: "Пучков Олег Анатольевич", id: 1973, position: "Ведущий консультант по и" },
  { name: "Садкова Виктория Александровна", id: 2691, position: "Младший консультант по и" },
  { name: "Сокотун Ирина Олеговна", id: 2175, position: "Ведущий консультант по и" },
  { name: "Хисматова Алина Руслановна", id: 2585, position: "Консультант по информац" },
  { name: "Шмырина Анастасия Анатольевна", id: 2325, position: "" },
  { name: "Ярков Константин Владимирович", id: 2819, position: "" },
  { name: "Ярышев Владимир Сергеевич", id: 2835, position: "" },
];

const configSkills = ["Должность", "УХ", "УПП", "ERP Опер. Учет", "ERP Рег. Учет", "ERP Бюджет", "ЗУП", "БП", "УТ", "УНФ", "ДО", "ТОиР", "ИТИЛ"];

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

type MatrixData = Record<string, Record<string, number>>;

const initMatrix = (): MatrixData => {
  const m: MatrixData = {};
  employees.forEach(emp => {
    m[emp.id] = {};
    [...configSkills, ...crmSkills].forEach(s => { m[emp.id][s] = 0; });
  });
  m[2733]["УНФ"]=1; m[2379]["ERP Опер. Учет"]=2; m[2379]["БП"]=3; m[2379]["УНФ"]=1;
  m[2721]["ERP Опер. Учет"]=3; m[2721]["ERP Бюджет"]=1; m[2721]["ДО"]=3; m[2721]["ТОиР"]=3; m[2721]["ИТИЛ"]=3;
  m[2365]["БП"]=3; m[2365]["УТ"]=3;
  m[2713]["БП"]=1;
  m[2705]["УНФ"]=1;
  m[2473]["ERP Опер. Учет"]=3; m[2473]["ERP Рег. Учет"]=1; m[2473]["ЗУП"]=1; m[2473]["БП"]=1; m[2473]["УТ"]=2; m[2473]["УНФ"]=2; m[2473]["ДО"]=3;
  m[1973]["УХ"]=1; m[1973]["ERP Опер. Учет"]=3; m[1973]["ERP Бюджет"]=1; m[1973]["ЗУП"]=1; m[1973]["БП"]=1; m[1973]["УТ"]=1; m[1973]["УНФ"]=1;
  m[2691]["УНФ"]=1;
  m[2175]["УПП"]=3; m[2175]["ERP Опер. Учет"]=3; m[2175]["ERP Рег. Учет"]=3;
  m[2585]["ERP Опер. Учет"]=1; m[2585]["ЗУП"]=2;
  m[2325]["ERP Опер. Учет"]=1; m[2325]["ERP Рег. Учет"]=2;
  m[2835]["УХ"]=3; m[2835]["УПП"]=3; m[2835]["ERP Опер. Учет"]=3; m[2835]["ERP Рег. Учет"]=3; m[2835]["ERP Бюджет"]=3; m[2835]["ЗУП"]=3; m[2835]["БП"]=3; m[2835]["УТ"]=3; m[2835]["УНФ"]=3; m[2835]["ДО"]=3; m[2835]["ТОиР"]=3; m[2835]["ИТИЛ"]=3;
  m[2733]["Документация и инструкции"]=2; m[2733]["Обновления"]=3; m[2733]["Обучение/ Передача знаний"]=2; m[2733]["Оценка/ЧТЗ/ Спецификации"]=2; m[2733]["Сбор требований/ предпроект"]=1; m[2733]["Сопровождение: прочие обращения"]=3; m[2733]["Тестирование"]=2;
  m[2379]["Документация и инструкции"]=3; m[2379]["Обновления"]=2; m[2379]["Обучение/ Передача знаний"]=3; m[2379]["Оценка/ЧТЗ/ Спецификации"]=4; m[2379]["Сбор требований/ предпроект"]=4; m[2379]["Сопровождение: прочие обращения"]=3; m[2379]["Тестирование"]=3;
  m[2721]["Документация и инструкции"]=3; m[2721]["Обновления"]=0; m[2721]["Обучение/ Передача знаний"]=0; m[2721]["Оценка/ЧТЗ/ Спецификации"]=3; m[2721]["Сбор требований/ предпроект"]=0; m[2721]["Сопровождение: прочие обращения"]=0; m[2721]["Тестирование"]=3;
  m[2365]["Документация и инструкции"]=4; m[2365]["Обновления"]=3; m[2365]["Обучение/ Передача знаний"]=4; m[2365]["Оценка/ЧТЗ/ Спецификации"]=4; m[2365]["Сбор требований/ предпроект"]=4; m[2365]["Сопровождение: прочие обращения"]=3; m[2365]["Тестирование"]=4;
  m[2713]["Документация и инструкции"]=2; m[2713]["Обновления"]=2; m[2713]["Обучение/ Передача знаний"]=3; m[2713]["Оценка/ЧТЗ/ Спецификации"]=1; m[2713]["Сбор требований/ предпроект"]=2; m[2713]["Сопровождение: прочие обращения"]=3; m[2713]["Тестирование"]=3;
  m[2705]["Документация и инструкции"]=2; m[2705]["Обновления"]=4; m[2705]["Обучение/ Передача знаний"]=2; m[2705]["Оценка/ЧТЗ/ Спецификации"]=2; m[2705]["Сбор требований/ предпроект"]=2; m[2705]["Сопровождение: прочие обращения"]=4; m[2705]["Тестирование"]=2;
  m[2473]["Документация и инструкции"]=3; m[2473]["Обновления"]=3; m[2473]["Обучение/ Передача знаний"]=3; m[2473]["Оценка/ЧТЗ/ Спецификации"]=3; m[2473]["Сбор требований/ предпроект"]=3; m[2473]["Сопровождение: прочие обращения"]=3; m[2473]["Тестирование"]=3;
  m[1973]["Документация и инструкции"]=3; m[1973]["Обновления"]=1; m[1973]["Обучение/ Передача знаний"]=3; m[1973]["Оценка/ЧТЗ/ Спецификации"]=4; m[1973]["Сбор требований/ предпроект"]=3; m[1973]["Сопровождение: прочие обращения"]=3; m[1973]["Тестирование"]=3;
  m[2691]["Документация и инструкции"]=2; m[2691]["Обновления"]=4; m[2691]["Обучение/ Передача знаний"]=2; m[2691]["Оценка/ЧТЗ/ Спецификации"]=2; m[2691]["Сбор требований/ предпроект"]=2; m[2691]["Сопровождение: прочие обращения"]=4; m[2691]["Тестирование"]=2;
  m[2175]["Документация и инструкции"]=3; m[2175]["Обновления"]=1; m[2175]["Обучение/ Передача знаний"]=3; m[2175]["Оценка/ЧТЗ/ Спецификации"]=3; m[2175]["Сбор требований/ предпроект"]=3; m[2175]["Сопровождение: прочие обращения"]=3; m[2175]["Тестирование"]=3;
  m[2585]["Документация и инструкции"]=2; m[2585]["Обновления"]=3; m[2585]["Обучение/ Передача знаний"]=2; m[2585]["Оценка/ЧТЗ/ Спецификации"]=2; m[2585]["Сбор требований/ предпроект"]=2; m[2585]["Сопровождение: прочие обращения"]=3; m[2585]["Тестирование"]=3;
  m[2325]["Документация и инструкции"]=2; m[2325]["Обновления"]=1; m[2325]["Обучение/ Передача знаний"]=3; m[2325]["Оценка/ЧТЗ/ Спецификации"]=3; m[2325]["Сбор требований/ предпроект"]=2; m[2325]["Сопровождение: прочие обращения"]=3; m[2325]["Тестирование"]=3;
  m[2819]["Документация и инструкции"]=2; m[2819]["Обновления"]=2; m[2819]["Обучение/ Передача знаний"]=0; m[2819]["Оценка/ЧТЗ/ Спецификации"]=2; m[2819]["Сбор требований/ предпроект"]=0; m[2819]["Сопровождение: прочие обращения"]=0; m[2819]["Тестирование"]=0;
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
  const [matrix, setMatrix] = useState<MatrixData>(initMatrix);
  const [activeTab, setActiveTab] = useState<"config" | "crm">("config");

  const skills = activeTab === "config" ? configSkills : crmSkills;

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
          <h2 className="text-base sm:text-lg font-bold text-foreground mb-1">Матрица компетенций (редактирование на странице)</h2>

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
                    {skills.map(s => (
                      <TableHead key={s} className="font-bold text-foreground text-center min-w-[50px] sm:min-w-[60px] text-[10px] sm:text-xs">
                        {s}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(emp => (
                    <TableRow key={emp.id} className="group transition-colors duration-200">
                      <TableCell className="font-medium text-foreground sticky left-0 bg-card/90 z-10 text-xs sm:text-sm">
                        {emp.name}
                      </TableCell>
                      <TableCell className="font-mono text-muted-foreground text-center text-xs sm:text-sm">{emp.id}</TableCell>
                      <TableCell className="text-muted-foreground text-xs sm:text-sm">{emp.position}</TableCell>
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
                    </TableRow>
                  ))}
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
    </div>
  );
};

export default Competences;
