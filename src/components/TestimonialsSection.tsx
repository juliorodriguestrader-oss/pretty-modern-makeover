import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { testimonialsFallback } from "@/data/homeFallbacks";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

const QUERY_KEYS = [["testimonials"]];

const TestimonialsSection = () => {
  useRealtimeSubscription("testimonials", QUERY_KEYS);
  const { data: testimonials = testimonialsFallback } = useQuery({
    queryKey: ["testimonials"],
    initialData: testimonialsFallback,
    retry: 1,
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("testimonials").select("*").order("created_at");
        if (error) throw error;
        return data?.length ? data : testimonialsFallback;
      } catch {
        return testimonialsFallback;
      }
    },
  });

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-3 mb-4">
            O Que Nossos Alunos Dizem
          </h2>
          <p className="text-muted-foreground">
            Histórias reais de quem transformou sua carreira com a EloCursos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-card rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 relative group hover:-translate-y-1"
            >
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />

              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: Math.max(0, Math.round(Number(t.rating) || 5)) }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-accent fill-current" />
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-8 font-sans">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground font-sans">{t.name}</h4>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
