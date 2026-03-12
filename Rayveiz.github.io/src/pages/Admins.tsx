import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const superadmins = [
  { id: 25, name: "Першина Инна Валерьевна" },
  { id: 2835, name: "Ярышев Владимир" },
];

const initialAdmins = [
  { id: 2819, name: "Ярков Константин Владимирович", addedAt: "2026-03-04T18:13:13Z", addedBy: 2835 },
];

const bitrixUsers = [
  { id: 2651, name: "Оверпал Интегратор" },
  { id: 1990, name: "Абакумова Анастасия Дмитриевна" },
  { id: 2733, name: "Алексашкин Святослав Сергеевич" },
  { id: 2741, name: "Андросов Константин Геннадьевич" },
  { id: 2603, name: "Ардавеева Анастасия Александровна" },
  { id: 2817, name: "Архитектор Функциональный" },
  { id: 2769, name: "Ахлестин Владимир Викторович" },
  { id: 2133, name: "Ахмадеев Ришат" },
  { id: 2259, name: "БОТ ОКА" },
  { id: 2555, name: "Боготенко Альбина Олеговна" },
  { id: 2379, name: "Болтнев Станислав Александрович" },
  { id: 2343, name: "Буравкина Виктория" },
  { id: 372, name: "Быков Александр Андреевич" },
  { id: 2861, name: "Временный Ответственный" },
  { id: 2657, name: "Гущин Андрей" },
  { id: 1781, name: "Даянов Равиль" },
  { id: 2653, name: "Дмитриева Галина" },
  { id: 2631, name: "Ершова Наталья" },
  { id: 2721, name: "Ефремов Алексей Владимирович" },
  { id: 2617, name: "Желтов Максим Владимирович" },
  { id: 2387, name: "Зинин Вадим Анатольевич" },
  { id: 2717, name: "Зимина Мария Олеговна" },
  { id: 2029, name: "Идрисов Александр Дмитриевич" },
  { id: 2365, name: "Казаков Антон Вячеславович" },
  { id: 2639, name: "Калабин Виктор Владимирович" },
  { id: 2357, name: "Ким Евгения Валерьевна" },
  { id: 27, name: "Колташикова Елена Николаевна" },
  { id: 121, name: "Коробова Елена Игоревна" },
  { id: 2383, name: "Курочкина Алина Владимировна" },
  { id: 2151, name: "Лакеев Евгений Викторович" },
  { id: 2479, name: "Ларионов Николай Владимирович" },
  { id: 2611, name: "Летуновская Елена" },
  { id: 2713, name: "Лунев Никита Александрович" },
  { id: 2791, name: "Мартынов Иван" },
  { id: 2777, name: "Милов Андрей Павлович" },
  { id: 2523, name: "Надров Дамир Ильдарович" },
  { id: 2451, name: "Новосильцева Анастасия Олеговна" },
  { id: 2511, name: "Овчинников Александр" },
  { id: 2779, name: "Осипова Елена Владимировна" },
  { id: 2567, name: "Отдел разработки" },
  { id: 2371, name: "Пакман Сергей Михайлович" },
  { id: 25, name: "Першина Инна Валерьевна" },
  { id: 2705, name: "Петянов Леонид Станиславович" },
  { id: 2153, name: "Пожидаев Денис Денисович" },
  { id: 2005, name: "Почты Лидогенератор" },
  { id: 2473, name: "Пронина Ирина Михайловна" },
  { id: 1973, name: "Пучков Олег Анатольевич" },
  { id: 2865, name: "Ратинский Алексей Сергеевич" },
  { id: 1569, name: "Савеина Мария Петровна" },
  { id: 2691, name: "Садкова Виктория Александровна" },
  { id: 2815, name: "Селиверстова Оксана" },
  { id: 2667, name: "Семынин Евгений" },
  { id: 2795, name: "Сидельников Николай Владимирович" },
  { id: 2175, name: "Сокотун Ирина Олеговна" },
  { id: 2459, name: "Солченко Екатерина" },
  { id: 2601, name: "Сорокалит Георгий Владимирович" },
  { id: 2843, name: "Сурская Анастасия" },
  { id: 119, name: "Сурский Андрей Александрович" },
  { id: 2457, name: "Сёмин Алексей Владимирович" },
  { id: 2579, name: "Трашенко Светлана" },
  { id: 2633, name: "Тютрин Даниил Викторович" },
  { id: 2497, name: "Уланова Олеся" },
  { id: 13, name: "Ф Д Юрьевич" },
  { id: 2585, name: "Хисматова Алина Руслановна" },
  { id: 2607, name: "Чуркина Анастасия Сергеевна" },
  { id: 2325, name: "Шмырина Анастасия Анатольевна" },
  { id: 1370, name: "Штильченко Алексей" },
  { id: 2819, name: "Ярков Константин Владимирович" },
  { id: 2835, name: "Ярышев Владимир" },
];

const Admins = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState(initialAdmins);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddAdmin = (userId: number, userName: string) => {
    if (admins.find(a => a.id === userId)) {
      toast({ title: "Уже добавлен", description: `${userName} уже является админом`, variant: "destructive" });
      return;
    }
    setAdmins([...admins, { id: userId, name: userName, addedAt: new Date().toISOString(), addedBy: 2835 }]);
    toast({ title: "Добавлен", description: `${userName} добавлен как админ` });
  };

  const filteredUsers = bitrixUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toString().includes(searchQuery)
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        {/* Superadmin */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Управление админами</h1>
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Superadmin (.env)</h2>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {superadmins.map(sa => (
              <div key={sa.id} className="bg-background/60 border border-border rounded-xl p-3 flex items-center justify-between">
                <span className="font-medium text-foreground text-sm">{sa.name}</span>
                <span className="font-mono text-muted-foreground text-xs">ID: {sa.id}</span>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold text-foreground w-32">Bitrix ID</TableHead>
                  <TableHead className="font-bold text-foreground">ФИО</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {superadmins.map(sa => (
                  <TableRow key={sa.id}>
                    <TableCell className="font-mono text-muted-foreground">{sa.id}</TableCell>
                    <TableCell className="font-medium text-foreground">{sa.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Current admins */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3">Текущие админы</h2>

          {/* Mobile cards */}
          <div className="sm:hidden space-y-2">
            {admins.length === 0 ? (
              <p className="text-center text-muted-foreground py-6 text-sm">Нет админов</p>
            ) : (
              admins.map(a => (
                <div key={a.id} className="bg-background/60 border border-border rounded-xl p-3 space-y-1">
                  <p className="font-medium text-foreground text-sm">{a.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {a.id} · Добавлен: {formatDate(a.addedAt)}</p>
                  <p className="text-xs text-muted-foreground">Кем: {a.addedBy}</p>
                </div>
              ))
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-bold text-foreground w-28">Bitrix ID</TableHead>
                  <TableHead className="font-bold text-foreground">ФИО</TableHead>
                  <TableHead className="font-bold text-foreground">Добавлен</TableHead>
                  <TableHead className="font-bold text-foreground w-28">Кем добавлен</TableHead>
                  <TableHead className="font-bold text-foreground text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">Нет админов</TableCell>
                  </TableRow>
                ) : (
                  admins.map(a => (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-muted-foreground">{a.id}</TableCell>
                      <TableCell className="font-medium text-foreground">{a.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{formatDate(a.addedAt)}</TableCell>
                      <TableCell className="font-mono text-muted-foreground">{a.addedBy}</TableCell>
                      <TableCell className="text-right">
                        <span className="text-muted-foreground">-</span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Add admin + Bitrix users */}
        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-1">Добавить админа</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Только superadmin из <span className="font-mono font-bold text-foreground">.env</span> может добавлять/удалять админов.
          </p>

          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3">Активные пользователи Bitrix</h3>

          <div className="relative w-full sm:w-64 mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Поиск..." className="pl-9 bg-background/70" />
          </div>

          {/* Mobile list */}
          <div className="sm:hidden max-h-[400px] overflow-y-auto scrollbar-thin space-y-1.5">
            {filteredUsers.map(u => (
              <div key={`${u.id}-${u.name}`} className="bg-background/60 border border-border rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm text-foreground truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">ID: {u.id}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-muted-foreground hover:text-primary shrink-0"
                  onClick={() => handleAddAdmin(u.id, u.name)}
                >
                  +
                </Button>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden sm:block rounded-xl border border-border overflow-hidden max-h-[500px] overflow-y-auto scrollbar-thin">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50 sticky top-0 z-10">
                  <TableHead className="font-bold text-foreground w-24">ID</TableHead>
                  <TableHead className="font-bold text-foreground">ФИО</TableHead>
                  <TableHead className="font-bold text-foreground text-right w-32">Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(u => (
                  <TableRow key={`${u.id}-${u.name}`} className="transition-colors duration-200">
                    <TableCell className="font-mono text-muted-foreground">{u.id}</TableCell>
                    <TableCell className="text-foreground">{u.name}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-muted-foreground hover:text-primary"
                        onClick={() => handleAddAdmin(u.id, u.name)}
                      >
                        +
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
