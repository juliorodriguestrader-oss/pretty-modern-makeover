import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Início", href: "/", isRoute: true },
    { label: "Cursos", href: "/#cursos", isRoute: true },
    { label: "Sobre", href: "/#sobre", isRoute: true },
    { label: "Depoimentos", href: "/#depoimentos", isRoute: true },
    { label: "Blog", href: "/#blog", isRoute: true },
    { label: "Contato", href: "/#contato", isRoute: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              Elo<span className="gradient-text">Cursos</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" className="text-sm font-medium">
              Login
            </Button>
            <Button className="gradient-bg text-primary-foreground rounded-full px-6 text-sm font-medium hover:opacity-90 transition-opacity">
Inscreva-se
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-up">
            {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1 rounded-full text-sm">Login</Button>
              <Button className="flex-1 gradient-bg text-primary-foreground rounded-full text-sm">Inscreva-se</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
