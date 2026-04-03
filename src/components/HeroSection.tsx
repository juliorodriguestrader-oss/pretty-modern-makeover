import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroStudent from "@/assets/hero-student.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-slide-right">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Plataforma #1 em cursos online
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforme sua{" "}
              <span className="gradient-text">carreira</span>{" "}
              com cursos de qualidade
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Aprenda com os melhores instrutores do mercado. Mais de 2.500 cursos 
              para você evoluir no seu ritmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button className="gradient-bg text-primary-foreground rounded-full px-8 py-6 text-base font-semibold hover:opacity-90 transition-opacity group">
                Explorar Cursos
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 text-base font-medium group border-border">
                <Play className="w-4 h-4 mr-2 text-accent group-hover:scale-110 transition-transform" />
                Ver Apresentação
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[
                  "photo-1573496359142-b8d87734a5a2",
                  "photo-1560250097-0b93528c311a",
                  "photo-1573497019940-1c28c88b4f3e",
                  "photo-1500648767791-00dcc994a43e",
                ].map((id, i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/${id}?w=80&h=80&fit=crop`}
                    alt="Aluno"
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-primary-foreground text-xs font-bold border-2 border-background">
                  +50K
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">50.000+ alunos satisfeitos</p>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden lg:block animate-scale-in">
            <div className="relative z-10">
              <img
                src={heroStudent}
                alt="Estudante EloCursos"
                className="w-full max-w-lg mx-auto drop-shadow-2xl"
              />
            </div>

            {/* Floating cards */}
            <div className="absolute top-16 right-0 glass rounded-2xl p-4 shadow-elevated animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <span className="text-accent text-lg">🎓</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">3.020+</p>
                  <p className="text-xs text-muted-foreground">Cursos Online</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-32 -left-4 glass rounded-2xl p-4 shadow-elevated animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg">⭐</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">4.9/5.0</p>
                  <p className="text-xs text-muted-foreground">Avaliação Média</p>
                </div>
              </div>
            </div>

            {/* Background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/5 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
