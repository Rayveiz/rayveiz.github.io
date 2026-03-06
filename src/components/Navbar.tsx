import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Главная", path: "/" },
  { label: "Статистика", path: "/stats" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-card border border-border rounded-xl px-4 py-3 mb-6 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ПИК" className="h-8" />
        </Link>
        <div className="flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="text-sm text-muted-foreground font-medium">
        Панель управления
      </div>
    </nav>
  );
};

export default Navbar;
