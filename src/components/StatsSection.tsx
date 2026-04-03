import { BookOpen, Users, Award, Trophy } from "lucide-react";

const stats = [
  { icon: BookOpen, value: "3.020+", label: "Cursos Online", color: "text-primary" },
  { icon: Users, value: "50K+", label: "Alunos Ativos", color: "text-accent" },
  { icon: Award, value: "200+", label: "Instrutores Expert", color: "text-primary" },
  { icon: Trophy, value: "4.9", label: "Avaliação Média", color: "text-accent" },
];

const StatsSection = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="gradient-bg rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
