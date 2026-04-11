import { Linkedin, Twitter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { instructorsFallback } from "@/data/homeFallbacks";
import { useRealtimeSubscription } from "@/hooks/useRealtimeSubscription";

const QUERY_KEYS = [["instructors"]];

const InstructorsSection = () => {
  useRealtimeSubscription("instructors", QUERY_KEYS);
  const { data: instructors = instructorsFallback } = useQuery({
    queryKey: ["instructors"],
    initialData: instructorsFallback,
    retry: 1,
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("instructors").select("*").order("created_at").limit(4);
        if (error) throw error;
        return data?.length ? data : instructorsFallback;
      } catch {
        return instructorsFallback;
      }
    },
  });

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
          {instructors.map((inst) => (
            <div key={inst.id} className="group text-center">
              <div className="relative mb-5 overflow-hidden rounded-3xl">
                <img
                  src={inst.avatar || ""}
                  alt={inst.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-3">
                    <a href={inst.linkedin || "#"} className="w-9 h-9 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors">
                      <Linkedin className="w-4 h-4 text-foreground" />
                    </a>
                    <a href={inst.twitter || "#"} className="w-9 h-9 rounded-full bg-card/90 flex items-center justify-center hover:bg-card transition-colors">
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
