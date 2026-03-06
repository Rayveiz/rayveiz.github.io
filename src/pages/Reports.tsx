import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleApply = () => {
    if (!dateFrom || !dateTo) {
      toast({ title: "Укажите обе даты", variant: "destructive" });
      return;
    }
    toast({ title: "Фильтр применён", description: `С ${dateFrom} по ${dateTo}` });
  };

  const handleDownload = (filename: string) => {
    toast({ title: "Скачивание", description: filename });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-6">
        <Navbar />

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm mb-6">
          <h1 className="text-2xl font-bold text-card-foreground mb-6">Отчеты</h1>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Фильтр периода</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-muted-foreground font-medium">С:</span>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-44"
              />
              <span className="text-sm text-muted-foreground font-medium">По:</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-44"
              />
              <Button onClick={handleApply}>Применить</Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-card-foreground mb-4">Скачать</h2>
            <div className="flex flex-col gap-2">
              {["time.csv", "time.xlsx", "matrix.csv"].map((file) => (
                <button
                  key={file}
                  onClick={() => handleDownload(file)}
                  className="text-primary hover:underline text-sm text-left flex items-center gap-2 w-fit"
                >
                  <Download className="h-4 w-4" />
                  {file}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
