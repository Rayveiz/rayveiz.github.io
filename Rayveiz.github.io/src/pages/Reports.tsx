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
      <div className="relative z-10 max-w-[1200px] mx-auto px-3 sm:px-6 py-4 sm:py-6">
        <Navbar />

        <div className="bg-card/80 backdrop-blur-md border border-border rounded-2xl p-4 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Отчеты</h1>

          <div className="mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Фильтр периода</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground font-medium shrink-0">С:</span>
                <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full sm:w-44 bg-background/70" />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground font-medium shrink-0">По:</span>
                <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full sm:w-44 bg-background/70" />
              </div>
              <Button onClick={handleApply} className="w-full sm:w-auto">Применить</Button>
            </div>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">Скачать</h2>
            <div className="flex flex-col gap-2.5">
              {["time.csv", "time.xlsx", "matrix.csv"].map((file) => (
                <button
                  key={file}
                  onClick={() => handleDownload(file)}
                  className="text-primary hover:underline text-sm text-left flex items-center gap-2 w-fit transition-colors"
                >
                  <Download className="h-4 w-4 shrink-0" />
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
