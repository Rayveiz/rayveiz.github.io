import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface Grade {
  id: number;
  name: string;
  minHours: number;
  plan3Months: number;
  active: boolean;
}

const initialGrades: Grade[] = [
  { id: 1, name: "Junior", minHours: 120, plan3Months: 360, active: true },
  { id: 2, name: "Middle", minHours: 140, plan3Months: 420, active: true },
  { id: 3, name: "Senior", minHours: 160, plan3Months: 480, active: true },
  { id: 4, name: "Ведущий аналитик", minHours: 100, plan3Months: 300, active: true },
];

const Grades = () => {
  const [grades, setGrades] = useState<Grade[]>(initialGrades);
  const [newName, setNewName] = useState("");
  const [newMinHours, setNewMinHours] = useState("");
  const [newPlan, setNewPlan] = useState("");

  const handleAddGrade = () => {
    if (!newName.trim() || !newMinHours || !newPlan) return;
    const newGrade: Grade = {
      id: grades.length > 0 ? Math.max(...grades.map((g) => g.id)) + 1 : 1,
      name: newName.trim(),
      minHours: parseFloat(newMinHours),
      plan3Months: parseFloat(newPlan),
      active: true,
    };
    setGrades([...grades, newGrade]);
    setNewName("");
    setNewMinHours("");
    setNewPlan("");
  };

  const handleUpdate = (id: number, field: keyof Grade, value: string | boolean) => {
    setGrades((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        if (field === "active") return { ...g, active: value as boolean };
        if (field === "name") return { ...g, name: value as string };
        if (field === "minHours") return { ...g, minHours: parseFloat(value as string) || 0 };
        if (field === "plan3Months") return { ...g, plan3Months: parseFloat(value as string) || 0 };
        return g;
      })
    );
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Грейды
          </h1>
        </div>

        {/* Add/update form */}
        <Card className="p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Добавить/обновить грейд</h2>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted-foreground">Название:</label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Название"
                className="w-44"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted-foreground">Мин. выработка (ч/мес):</label>
              <Input
                type="number"
                value={newMinHours}
                onChange={(e) => setNewMinHours(e.target.value)}
                placeholder="0"
                className="w-40"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted-foreground">План за 3 месяца (ч):</label>
              <Input
                type="number"
                value={newPlan}
                onChange={(e) => setNewPlan(e.target.value)}
                placeholder="0"
                className="w-40"
              />
            </div>
            <Button onClick={handleAddGrade}>Сохранить</Button>
          </div>
        </Card>

        {/* Grades table */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Текущие грейды</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Мин. ч/мес</TableHead>
                  <TableHead>План 3 мес</TableHead>
                  <TableHead>Активен</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.id}</TableCell>
                    <TableCell>
                      <Input
                        value={grade.name}
                        onChange={(e) => handleUpdate(grade.id, "name", e.target.value)}
                        className="w-44"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={grade.minHours}
                        onChange={(e) => handleUpdate(grade.id, "minHours", e.target.value)}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={grade.plan3Months}
                        onChange={(e) => handleUpdate(grade.id, "plan3Months", e.target.value)}
                        className="w-28"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={grade.active ? "yes" : "no"}
                        onValueChange={(v) => handleUpdate(grade.id, "active", v === "yes")}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Да</SelectItem>
                          <SelectItem value="no">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button size="sm">Сохранить</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Grades;
