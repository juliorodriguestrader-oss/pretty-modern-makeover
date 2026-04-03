import { Linkedin, Twitter } from "lucide-react";

const instructors = [
  {
    name: "Dr. Pedro Almeida",
    role: "Especialista em Python",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Mariana Costa",
    role: "Designer UI/UX",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Fernando Lima",
    role: "Estrategista de Marketing",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Dra. Julia Martins",
    role: "Consultora de Negócios",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
];

const InstructorsSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Instrutores</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            Conheça Nossos Instrutores
          </h2>
          <p className="text-muted-foreground">
            Profissionais experientes prontos para te guiar na sua jornada de aprendizado
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((inst, i) => (
            <div
              key={i}
              className="group text-center"
            >
              <div className="relative mb-5 overflow-hidden rounded-3xl">
                <img
                  src={inst.image}
                  alt={inst.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <a href="#" className="w-9 h-9 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors">
                      <Linkedin className="w-4 h-4 text-foreground" />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors">
                      <Twitter className="w-4 h-4 text-foreground" />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-foreground font-sans">{inst.name}</h3>
              <p className="text-sm text-muted-foreground">{inst.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorsSection;
