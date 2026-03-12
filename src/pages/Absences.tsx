import { useState } from "react";
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
import { CalendarPlus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Absence {
  id: number;
  employeeId: number;
  employeeName: string;
  dateFrom: string;
  dateTo: string;
  reason: string;
}

const employees = [
  { id: 2733, name: "Алексашкин Святослав Сергеевич" },
  { id: 2379, name: "Болтнев Станислав Александрович" },
  { id: 2721, name: "Ефремов Алексей Владимирович" },
  { id: 2365, name: "Казаков Антон Вячеславович" },
  { id: 2713, name: "Лунев Никита" },
  { id: 2705, name: "Петянов Леонид Станиславович" },
  { id: 2473, name: "Пронина Ирина Михайловна" },
  { id: 1973, name: "Пучков Олег Анатольевич" },
  { id: 2691, name: "Садкова Виктория Александровна" },
  { id: 2175, name: "Сокотун Ирина Олеговна" },
  { id: 2585, name: "Хисматова Алина Руслановна" },
  { id: 2325, name: "Шмырина Анастасия Анатольевна" },
  { id: 2819, name: "Ярков Константин Владимирович" },
  { id: 2835, name: "Ярышев Владимир Сергеевич" },
];

const Absences = () => {
  const { toast } = useToast();
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0].id.toString());
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reason, setReason] = useState("");

  const handleAdd = () => {
    if (!dateFrom || !dateTo) {
      toast({ title: "Ошибка", description: "Укажите период отсутствия", variant: "destructive" });
      return;
    }
    const emp = employees.find(e => e.id.toString() === selectedEmployee)!;
    const newAbsence: Absence = {
      id: Date.now(),
      employeeId: emp.id,
      employeeName: emp.name,
      dateFrom,
      dateTo,
      reason,
    };
    setAbsences([...absences, newAbsence]);
    setDateFrom("");
    setDateTo("");
    setReason("");
    toast({ title: "Добавлено", description: `Отсутствие для ${emp.name} добавлено` });
  };

  const handleDelete = (id: number) => {
    setAbsences(absences.filter(a => a.id !== id));
    toast({ title: "Удалено", description: "Запись удалена" });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU");
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        {/* Add absence form */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Отсутствия</h1>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Добавить отсутствие</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-1">
              <label className="text-xs font-medium text-muted-foreground">Сотрудник:</label>
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="bg-background/70">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.id.toString()}>
                      {emp.name} ({emp.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">С:</label>
              <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-background/70" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">По:</label>
              <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-background/70" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">Причина:</label>
              <Input value={reason} onChange={e => setReason(e.target.value)} placeholder="Причина" className="bg-background/70" />
            </div>
            <Button onClick={handleAdd} className="gap-1.5 shadow-md w-full sm:w-auto">
              <CalendarPlus className="w-4 h-4" />
              Добавить
            </Button>
          </div>
        </div>

        {/* Absences list */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h2 className="text-lg font-bold text-foreground mb-4">Список</h2>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {absences.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Нет записей об отсутствиях</p>
            ) : (
              absences.map(a => (
                <div key={a.id} className="bg-background/60 border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm">{a.employeeName}</p>
                      <p className="text-xs text-muted-foreground mt-1">ID: {a.employeeId}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(a.dateFrom)} — {formatDate(a.dateTo)}</p>
                      {a.reason && <p className="text-xs text-muted-foreground mt-1">Причина: {a.reason}</p>}
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)} className="h-7 text-xs px-2 shrink-0">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold text-foreground w-20">ID</TableHead>
                  <TableHead className="font-bold text-foreground">Сотрудник</TableHead>
                  <TableHead className="font-bold text-foreground">Период</TableHead>
                  <TableHead className="font-bold text-foreground">Причина</TableHead>
                  <TableHead className="font-bold text-foreground text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {absences.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                      Нет записей об отсутствиях
                    </TableCell>
                  </TableRow>
                ) : (
                  absences.map(a => (
                    <TableRow key={a.id} className="group transition-colors duration-200">
                      <TableCell className="font-mono text-muted-foreground">{a.employeeId}</TableCell>
                      <TableCell className="font-medium text-foreground">{a.employeeName}</TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(a.dateFrom)} — {formatDate(a.dateTo)}</TableCell>
                      <TableCell className="text-muted-foreground">{a.reason || "—"}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(a.id)} className="h-7 text-xs px-3 shadow-sm">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Absences;
