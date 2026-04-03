import { CheckCircle } from "lucide-react";

const features = [
  "Instrutores especialistas com experiência de mercado",
  "Aprendizado remoto no seu ritmo",
  "Acesso vitalício aos conteúdos",
  "Certificado reconhecido pelo mercado",
];

const AboutSection = () => {
  return (
    <section id="sobre" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=500&fit=crop"
                  alt="Aprendizado"
                  className="w-full rounded-3xl object-cover h-64 shadow-card"
                />
                <div className="gradient-bg rounded-3xl p-6 text-center">
                  <h3 className="text-3xl font-bold text-primary-foreground">29+</h3>
                  <p className="text-sm text-primary-foreground/80">Prêmios Conquistados</p>
                </div>
              </div>
              <div className="pt-8">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=600&fit=crop"
                  alt="Colaboração"
                  className="w-full rounded-3xl object-cover h-80 shadow-card"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Sobre Nós</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-6">
              Aprenda & Cresça Suas Habilidades de Qualquer Lugar
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Na EloCursos, acreditamos que a educação de qualidade deve ser acessível a todos.
              Nossa plataforma conecta alunos a instrutores renomados, oferecendo cursos práticos 
              e atualizados para o mercado de trabalho.
            </p>

            <div className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-primary/5">
                <h3 className="text-2xl font-bold text-primary">2.500+</h3>
                <p className="text-sm text-muted-foreground">Cursos Online</p>
              </div>
              <div className="p-5 rounded-2xl bg-accent/5">
                <h3 className="text-2xl font-bold text-accent">200+</h3>
                <p className="text-sm text-muted-foreground">Instrutores</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
