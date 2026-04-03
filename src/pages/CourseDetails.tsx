import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { courses } from "@/data/courses";
import { useState } from "react";
import {
  Star,
  Clock,
  Users,
  BookOpen,
  Award,
  Globe,
  Play,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseDetails = () => {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor">("overview");

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Curso não encontrado</h1>
          <Link to="/cursos" className="text-primary hover:underline font-sans">
            ← Voltar para cursos
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const tabs = [
    { key: "overview" as const, label: "Visão Geral" },
    { key: "curriculum" as const, label: "Currículo" },
    { key: "instructor" as const, label: "Instrutor" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="gradient-bg pt-32 pb-12 lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/cursos"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground text-sm font-sans mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para cursos
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-foreground/20 text-primary-foreground font-sans">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-foreground/10 text-primary-foreground/80 font-sans">
                  {course.level}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
                {course.title}
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl font-sans">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-primary-foreground/70 text-sm font-sans">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-accent fill-current" />
                  <span className="font-semibold text-primary-foreground">{course.rating}</span>
                  <span>({course.reviews} avaliações)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.students} alunos
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {course.lessons} aulas
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-foreground/20"
                />
                <div>
                  <p className="text-sm font-semibold text-primary-foreground font-sans">{course.instructor.name}</p>
                  <p className="text-xs text-primary-foreground/60 font-sans">{course.instructor.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex border-b border-border mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 text-sm font-semibold font-sans transition-colors relative ${
                    activeTab === tab.key
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-bg rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fade-up">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Sobre este Curso</h3>
                  <p className="text-muted-foreground leading-relaxed font-sans">{course.description}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-5">O que você vai aprender</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {course.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground font-sans">{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Curriculum Tab */}
            {activeTab === "curriculum" && (
              <div className="animate-fade-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Currículo do Curso</h3>
                  <p className="text-sm text-muted-foreground font-sans">
                    {course.modules.length} módulos · {totalLessons} aulas
                  </p>
                </div>

                <Accordion type="multiple" className="space-y-3">
                  {course.modules.map((mod, i) => (
                    <AccordionItem
                      key={i}
                      value={`module-${i}`}
                      className="bg-card border border-border rounded-2xl overflow-hidden px-0"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-secondary/50">
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground font-sans text-sm">{mod.title}</p>
                            <p className="text-xs text-muted-foreground font-sans">{mod.lessons.length} aulas</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-2 pt-2">
                          {mod.lessons.map((lesson, j) => (
                            <div
                              key={j}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4 text-primary" />
                                <span className="text-sm text-foreground font-sans">{lesson.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground font-sans">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Instructor Tab */}
            {activeTab === "instructor" && (
              <div className="animate-fade-up">
                <h3 className="text-2xl font-bold text-foreground mb-6">Conheça o Instrutor</h3>
                <div className="bg-card rounded-2xl border border-border p-8 flex flex-col sm:flex-row items-start gap-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-foreground font-sans">{course.instructor.name}</h4>
                    <p className="text-accent font-medium text-sm font-sans mb-3">{course.instructor.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                      Profissional com ampla experiência na área, dedicado a transformar conhecimento técnico em conteúdo
                      acessível e prático para alunos de todos os níveis.
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground font-sans">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        {course.rating} Avaliação
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {course.students}+ Alunos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="bg-card rounded-3xl border border-border shadow-elevated overflow-hidden sticky top-28">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary ml-1" />
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold gradient-text font-sans">R${course.salePrice}</span>
                  <span className="text-lg text-muted-foreground line-through font-sans">R${course.price}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/10 text-accent font-sans">
                    -{Math.round(((course.price - course.salePrice) / course.price) * 100)}%
                  </span>
                </div>

                <Button className="w-full rounded-full py-6 text-base font-semibold gradient-bg">
                  Matricular-se Agora
                </Button>
                <Button variant="outline" className="w-full rounded-full py-6 text-base font-semibold border-border">
                  Adicionar à Lista
                </Button>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground font-sans">Este curso inclui:</h4>
                  <div className="space-y-3 text-sm font-sans">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>{course.lessons} aulas</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{course.duration} de conteúdo</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Globe className="w-4 h-4 text-primary" />
                      <span>{course.language}</span>
                    </div>
                    {course.certificate && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Award className="w-4 h-4 text-primary" />
                        <span>Certificado de conclusão</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default CourseDetails;
