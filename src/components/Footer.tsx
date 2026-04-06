import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">EloCursos</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-5">
              Transformando carreiras através da educação online de qualidade desde 2020.
            </p>
            <div className="space-y-2">
              <a href="tel:12345615523" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> (12) 3456-1552
              </a>
              <a href="mailto:contato@elocursos.com.br" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" /> contato@elocursos.com.br
              </a>
              <p className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4" /> São Paulo, SP
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-sans">Cursos</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Informática", "Programação", "Design", "Marketing", "Negócios"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-sans">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              {["Sobre Nós", "Instrutores", "Blog", "FAQ", "Contato"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-primary-foreground transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 font-sans">Newsletter</h4>
            <p className="text-sm text-primary-foreground/60 mb-4">
              Receba novidades e ofertas exclusivas. :)
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 px-4 py-2.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent"
              />
              <button className="px-5 py-2.5 gradient-bg rounded-full text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                Enviar
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/40">
            © 2026 EloCursos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
