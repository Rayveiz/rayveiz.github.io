import { Link, useLocation } from "react-router-dom";
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

  return (
    <nav className="bg-card/80 backdrop-blur-md border border-border rounded-2xl px-5 py-3.5 mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="ПИК" className="h-8 transition-transform duration-300 group-hover:scale-105" />
        </Link>
        <div className="flex gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(15,118,110,0.3)]"
                  : "bg-secondary/70 text-secondary-foreground hover:bg-accent hover:shadow-sm"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
