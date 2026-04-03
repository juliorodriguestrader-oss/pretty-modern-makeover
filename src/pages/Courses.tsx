import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { courses, categories, levels } from "@/data/courses";
import { Star, Clock, Users, Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCategory || c.category === selectedCategory;
      const matchLvl = !selectedLevel || c.level === selectedLevel;
      return matchSearch && matchCat && matchLvl;
    });
  }, [search, selectedCategory, selectedLevel]);

  const hasFilters = selectedCategory || selectedLevel || search;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="gradient-bg pt-32 pb-16 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Nossos Cursos
          </h1>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
            Explore nossa coleção de cursos e encontre o caminho ideal para sua carreira
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 rounded-full h-12 bg-card border-border"
            />
          </div>
          <Button
            variant="outline"
            className="rounded-full h-12 px-6 gap-2 border-border"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-card animate-fade-up">
            <div className="flex flex-wrap gap-8">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 font-sans">Categoria</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "gradient-bg text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-3 font-sans">Nível</h4>
                <div className="flex flex-wrap gap-2">
                  {levels.map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(selectedLevel === lvl ? null : lvl)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedLevel === lvl
                          ? "gradient-bg text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-muted-foreground font-sans">Filtros ativos:</span>
            {selectedCategory && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedCategory(null)}>
                {selectedCategory} <X className="w-3 h-3" />
              </Badge>
            )}
            {selectedLevel && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSelectedLevel(null)}>
                {selectedLevel} <X className="w-3 h-3" />
              </Badge>
            )}
            {search && (
              <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setSearch("")}>
                "{search}" <X className="w-3 h-3" />
              </Badge>
            )}
            <button
              className="text-sm text-accent hover:underline font-sans"
              onClick={() => { setSelectedCategory(null); setSelectedLevel(null); setSearch(""); }}
            >
              Limpar todos
            </button>
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6 font-sans">
          Exibindo <span className="font-semibold text-foreground">{filtered.length}</span> curso{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course) => (
              <Link
                to={`/cursos/${course.slug}`}
                key={course.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold gradient-bg text-primary-foreground">
                      {course.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-sans">
                      {course.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-sans">{course.level}</span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 font-sans group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-sans">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-sans">
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
                      <span className="text-sm font-semibold text-foreground font-sans">{course.rating}</span>
                      <span className="text-xs text-muted-foreground font-sans">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground line-through font-sans">
                        R${course.price}
                      </span>
                      <span className="text-lg font-bold gradient-text font-sans">
                        R${course.salePrice}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground font-sans">Nenhum curso encontrado</p>
            <p className="text-sm text-muted-foreground mt-2 font-sans">Tente alterar os filtros de busca</p>
          </div>
        )}
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Courses;
