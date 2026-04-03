import { Star, Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Informática Essencial",
    category: "Informática",
    image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=600&h=400&fit=crop",
    lessons: 80,
    students: 110,
    level: "Intermediário",
    rating: 5.0,
    price: 800,
    salePrice: 700,
    badge: "Mais Vendido",
  },
  {
    id: 2,
    title: "Python para Iniciantes",
    category: "Programação",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    lessons: 65,
    students: 230,
    level: "Iniciante",
    rating: 4.9,
    price: 600,
    salePrice: 450,
    badge: "Popular",
  },
  {
    id: 3,
    title: "Design UI/UX Completo",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    lessons: 92,
    students: 185,
    level: "Avançado",
    rating: 4.8,
    price: 900,
    salePrice: 750,
    badge: "Novo",
  },
];

const CoursesSection = () => {
  return (
    <section id="cursos" className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Cursos Populares
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            Cursos em Destaque
          </h2>
          <p className="text-muted-foreground">
            Confira nossos cursos mais procurados e comece a aprender hoje mesmo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold gradient-bg text-primary-foreground">
                    {course.badge}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {course.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{course.level}</span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3 font-sans group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.lessons} Aulas
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {course.students} Alunos
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-accent fill-current" />
                    <span className="text-sm font-semibold text-foreground">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground line-through">
                      R${course.price}
                    </span>
                    <span className="text-lg font-bold gradient-text">
                      R${course.salePrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="rounded-full px-8 py-6 text-base font-medium group border-border">
            Ver Todos os Cursos
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
