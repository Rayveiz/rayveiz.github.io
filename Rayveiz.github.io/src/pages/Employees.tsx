import { useState } from "react";
import { Link } from "react-router-dom";
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
import { UserPlus, Save, CreditCard, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: number;
  name: string;
  position: string;
  status: string;
  closedHours: number;
  normHours: number;
}

const initialEmployees: Employee[] = [
  { id: 2733, name: "Алексашкин Святослав Сергеевич", position: "Младший консультант по информационным технологиям", status: "1", closedHours: 104.2, normHours: 120 },
  { id: 2379, name: "Болтнев Станислав Александрович", position: "Ведущий консультант по информационным технологиям", status: "3", closedHours: 161.7, normHours: 140 },
  { id: 2721, name: "Ефремов Алексей Владимирович", position: "Ведущий консультант по информационным технологиям", status: "3", closedHours: 136.8, normHours: 140 },
  { id: 2365, name: "Казаков Антон Вячеславович", position: "Аналитик", status: "1", closedHours: 98.3, normHours: 120 },
  { id: 2713, name: "Лунев Никита", position: "Младший консультант по информационным технологиям", status: "2", closedHours: 93.3, normHours: 120 },
  { id: 2705, name: "Петянов Леонид Станиславович", position: "Младший консультант по информационным технологиям", status: "2", closedHours: 101.7, normHours: 120 },
  { id: 2473, name: "Пронина Ирина Михайловна", position: "Консультант по информационным технологиям", status: "1", closedHours: 116.7, normHours: 120 },
  { id: 1973, name: "Пучков Олег Анатольевич", position: "Ведущий консультант по информационным технологиям", status: "3", closedHours: 173.3, normHours: 140 },
  { id: 2691, name: "Садкова Виктория Александровна", position: "Младший консультант по информационным технологиям", status: "1", closedHours: 86.7, normHours: 120 },
  { id: 2175, name: "Сокотун Ирина Олеговна", position: "Ведущий консультант по информационным технологиям", status: "2", closedHours: 130.0, normHours: 140 },
  { id: 2585, name: "Хисматова Алина Руслановна", position: "Консультант по информационным технологиям", status: "2", closedHours: 110.0, normHours: 120 },
  { id: 2325, name: "Шмырина Анастасия Анатольевна", position: "", status: "3", closedHours: 123.3, normHours: 120 },
  { id: 2819, name: "Ярков Константин Владимирович", position: "", status: "3", closedHours: 115.0, normHours: 120 },
  { id: 2835, name: "Ярышев Владимир Сергеевич", position: "", status: "1", closedHours: 150.0, normHours: 140 },
];

const statusLabels: Record<string, string> = {
  "1": "Свободен",
  "2": "Занят",
  "3": "Завал",
};

const statusColors: Record<string, string> = {
  "1": "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800",
  "2": "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800",
  "3": "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800",
};

const Employees = () => {
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [newBitrixId, setNewBitrixId] = useState("");
  const [newName, setNewName] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = () => {
    if (!newBitrixId && !newName) {
      toast({ title: "Ошибка", description: "Укажите Bitrix ID или ФИО", variant: "destructive" });
      return;
    }
    const newEmp: Employee = {
      id: newBitrixId ? parseInt(newBitrixId) : Math.floor(Math.random() * 9000) + 1000,
      name: newName || "Новый сотрудник",
      position: newPosition,
      status: "1",
      closedHours: 0,
      normHours: 120,
    };
    setEmployees([...employees, newEmp]);
    setNewBitrixId("");
    setNewName("");
    setNewPosition("");
    toast({ title: "Сотрудник добавлен", description: `${newEmp.name} добавлен в список` });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, status: newStatus } : e));
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
    toast({ title: "Удалено", description: "Сотрудник удалён из списка" });
  };

  const handleSave = (emp: Employee) => {
    toast({ title: "Сохранено", description: `Данные ${emp.name} сохранены` });
  };

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.id.toString().includes(searchQuery)
  );

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        {/* Add employee form */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Сотрудники</h1>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2">Добавить сотрудника</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Можно указать только <span className="font-bold text-foreground">Bitrix ID</span> или только{" "}
            <span className="font-bold text-foreground">ФИО</span>: система попробует подтянуть второе из Bitrix.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Bitrix ID:</label>
              <Input value={newBitrixId} onChange={(e) => setNewBitrixId(e.target.value)} placeholder="ID" className="bg-background/70" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">ФИО:</label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Фамилия Имя Отчество" className="bg-background/70" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Должность:</label>
              <Input value={newPosition} onChange={(e) => setNewPosition(e.target.value)} placeholder="Должность" className="bg-background/70" />
            </div>
            <div className="flex items-end">
              <Button onClick={handleAdd} className="gap-1.5 shadow-md w-full sm:w-auto">
                <UserPlus className="w-4 h-4" />
                Добавить
              </Button>
            </div>
          </div>
        </div>

        {/* Employee list */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h2 className="text-lg font-bold text-foreground">Список</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Поиск..." className="pl-9 bg-background/70" />
            </div>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((emp) => (
              <div key={emp.id} className="bg-background/60 border border-border rounded-xl p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">{emp.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">ID: {emp.id}</p>
                    {emp.position && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{emp.position}</p>}
                  </div>
                  <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-lg border ${statusColors[emp.status]}`}>
                    {statusLabels[emp.status]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={emp.status} onValueChange={(v) => handleStatusChange(emp.id, v)}>
                    <SelectTrigger className="h-8 text-xs font-medium border rounded-lg flex-1">
                      <SelectValue>{emp.status} ({statusLabels[emp.status]})</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Свободен)</SelectItem>
                      <SelectItem value="2">2 (Занят)</SelectItem>
                      <SelectItem value="3">3 (Завал)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={() => handleSave(emp)} className="h-8 text-xs px-3">
                    <Save className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.id)} className="h-8 text-xs px-3">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold text-foreground w-20">ID</TableHead>
                  <TableHead className="font-bold text-foreground">Имя</TableHead>
                  <TableHead className="font-bold text-foreground">Должность</TableHead>
                  <TableHead className="font-bold text-foreground w-44">Статус</TableHead>
                  <TableHead className="font-bold text-foreground w-32 text-center">Часы / Норма</TableHead>
                  <TableHead className="font-bold text-foreground text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((emp) => (
                  <TableRow key={emp.id} className="group transition-colors duration-200">
                    <TableCell className="font-mono text-muted-foreground">{emp.id}</TableCell>
                    <TableCell>
                      <Input defaultValue={emp.name} className="border-transparent bg-transparent hover:bg-background/60 hover:border-border transition-all h-8 text-sm" />
                    </TableCell>
                    <TableCell>
                      <Input defaultValue={emp.position} className="border-transparent bg-transparent hover:bg-background/60 hover:border-border transition-all h-8 text-sm" />
                    </TableCell>
                    <TableCell>
                      <Select value={emp.status} onValueChange={(v) => handleStatusChange(emp.id, v)}>
                        <SelectTrigger className={`h-8 text-xs font-medium border rounded-lg w-36 ${statusColors[emp.status]}`}>
                          <SelectValue>{emp.status} ({statusLabels[emp.status]})</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 (Свободен)</SelectItem>
                          <SelectItem value="2">2 (Занят)</SelectItem>
                          <SelectItem value="3">3 (Завал)</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-medium ${emp.closedHours >= emp.normHours ? "text-emerald-600" : emp.closedHours >= emp.normHours * 0.8 ? "text-foreground" : "text-red-500"}`}>
                        {emp.closedHours.toFixed(1)}
                      </span>
                      <span className="text-muted-foreground text-xs"> / {emp.normHours}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button size="sm" onClick={() => handleSave(emp)} className="h-7 text-xs px-3 shadow-sm">
                          <Save className="w-3 h-3 mr-1" />
                          Сохранить
                        </Button>
                        <Link to={`/employees/${emp.id}/card`}>
                          <Button size="sm" variant="outline" className="h-7 text-xs px-3 border-primary/30 text-primary hover:bg-primary/10">
                            <CreditCard className="w-3 h-3 mr-1" />
                            Карточка
                          </Button>
                        </Link>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.id)} className="h-7 text-xs px-3 shadow-sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Всего сотрудников: {filtered.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Employees;
