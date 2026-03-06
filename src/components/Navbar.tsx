import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "Сотрудники", path: "/employees" },
  { label: "Отсутствия", path: "/absences" },
  { label: "Компетенции", path: "/competences" },
  { label: "Админы", path: "/admins" },
  { label: "Отчеты", path: "/reports" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-card/80 backdrop-blur-md border border-border rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 mb-4 sm:mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <img src={logo} alt="ПИК" className="h-7 sm:h-8 transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 xl:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(15,118,110,0.3)]"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent hover:shadow-sm"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 rounded-xl bg-secondary/70 text-secondary-foreground hover:bg-accent transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Меню"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden flex flex-col gap-1.5 mt-3 pt-3 border-t border-border animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(15,118,110,0.3)]"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent hover:shadow-sm"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
