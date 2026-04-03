import { Monitor, Palette, TrendingUp, Heart, Database, Megaphone, DollarSign, Cpu, Camera } from "lucide-react";

const categories = [
  { icon: Monitor, name: "Informática", count: "45 cursos", bg: "bg-primary/10", iconColor: "text-primary" },
  { icon: Palette, name: "Arte & Design", count: "38 cursos", bg: "bg-accent/10", iconColor: "text-accent" },
  { icon: TrendingUp, name: "Desenvolvimento Pessoal", count: "32 cursos", bg: "bg-primary/10", iconColor: "text-primary" },
  { icon: Heart, name: "Saúde & Fitness", count: "28 cursos", bg: "bg-accent/10", iconColor: "text-accent" },
  { icon: Database, name: "Data Science", count: "41 cursos", bg: "bg-primary/10", iconColor: "text-primary" },
  { icon: Megaphone, name: "Marketing", count: "35 cursos", bg: "bg-accent/10", iconColor: "text-accent" },
  { icon: DollarSign, name: "Negócios & Finanças", count: "29 cursos", bg: "bg-primary/10", iconColor: "text-primary" },
  { icon: Cpu, name: "Ciência da Computação", count: "52 cursos", bg: "bg-accent/10", iconColor: "text-accent" },
  { icon: Camera, name: "Fotografia", count: "24 cursos", bg: "bg-primary/10", iconColor: "text-primary" },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Categorias</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            Explore Nossas Categorias
          </h2>
          <p className="text-muted-foreground">
            Encontre o curso ideal para você entre nossas diversas áreas de conhecimento
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="#"
              className="group flex items-center gap-4 p-5 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <cat.icon className={`w-5 h-5 ${cat.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-base font-sans">{cat.name}</h3>
                <p className="text-sm text-muted-foreground font-sans">{cat.count}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
