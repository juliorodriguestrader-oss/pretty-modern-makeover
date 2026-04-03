import { ArrowRight, Calendar } from "lucide-react";

const posts = [
  {
    title: "10 Dicas para Aprender Python Mais Rápido",
    excerpt: "Descubra as melhores estratégias para acelerar seu aprendizado em Python.",
    category: "Programação",
    date: "15 Mar 2026",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
  },
  {
    title: "Princípios Fundamentais do Design UI/UX",
    excerpt: "Entenda os conceitos essenciais para criar interfaces intuitivas.",
    category: "Design",
    date: "12 Mar 2026",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
  },
  {
    title: "Estratégias de Marketing Digital para 2026",
    excerpt: "As tendências que vão dominar o marketing digital neste ano.",
    category: "Marketing",
    date: "10 Mar 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Blog</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            Últimos Artigos
          </h2>
          <p className="text-muted-foreground">
            Conteúdo gratuito para ajudar você a se manter atualizado
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <a
              key={i}
              href="#"
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-sans">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  Ler Mais <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
