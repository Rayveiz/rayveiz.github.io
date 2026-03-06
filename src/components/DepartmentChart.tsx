import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const departments = [
  { key: "dev", name: "Разработка", color: "hsl(170, 75%, 26%)" },
  { key: "support", name: "Поддержка", color: "hsl(199, 70%, 50%)" },
  { key: "sales", name: "Продажи", color: "hsl(280, 60%, 55%)" },
  { key: "hr", name: "HR", color: "hsl(35, 90%, 55%)" },
  { key: "analytics", name: "Аналитика", color: "hsl(340, 65%, 55%)" },
];

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}`,
      dev: Math.floor(Math.random() * 40 + 30),
      support: Math.floor(Math.random() * 30 + 20),
      sales: Math.floor(Math.random() * 25 + 15),
      hr: Math.floor(Math.random() * 20 + 10),
      analytics: Math.floor(Math.random() * 35 + 20),
    });
  }
  return data;
};

const data = generateData();

const DepartmentChart = () => {
  const [activeDepts, setActiveDepts] = useState<Set<string>>(
    new Set(departments.map((d) => d.key))
  );

  const toggleDept = (key: string) => {
    setActiveDepts((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-card-foreground">
            Загрузка отделов
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Количество закрытых часов по дням
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {departments.map((dept) => (
            <button
              key={dept.key}
              onClick={() => toggleDept(dept.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                activeDepts.has(dept.key)
                  ? "border-transparent shadow-sm"
                  : "border-border bg-muted text-muted-foreground opacity-50"
              }`}
              style={
                activeDepts.has(dept.key)
                  ? { backgroundColor: dept.color + "20", color: dept.color, borderColor: dept.color + "40" }
                  : {}
              }
            >
              {dept.name}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(216, 20%, 88%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "hsl(220, 10%, 42%)" }}
            axisLine={{ stroke: "hsl(216, 20%, 88%)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "hsl(220, 10%, 42%)" }}
            axisLine={{ stroke: "hsl(216, 20%, 88%)" }}
            tickLine={false}
            label={{
              value: "Часы",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12, fill: "hsl(220, 10%, 42%)" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(0, 0%, 100%)",
              border: "1px solid hsl(216, 20%, 88%)",
              borderRadius: "10px",
              fontSize: "13px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
          {departments.map(
            (dept) =>
              activeDepts.has(dept.key) && (
                <Line
                  key={dept.key}
                  type="monotone"
                  dataKey={dept.key}
                  name={dept.name}
                  stroke={dept.color}
                  strokeWidth={2.5}
                  dot={{ r: 3, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  animationDuration={800}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
