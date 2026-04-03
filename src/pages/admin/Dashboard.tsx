import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Users, MessageSquare, FolderOpen, Newspaper } from "lucide-react";

const Dashboard = () => {
  const { data: coursesCount } = useQuery({
    queryKey: ["admin-courses-count"],
    queryFn: async () => {
      const { count } = await supabase.from("courses").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: categoriesCount } = useQuery({
    queryKey: ["admin-categories-count"],
    queryFn: async () => {
      const { count } = await supabase.from("categories").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: instructorsCount } = useQuery({
    queryKey: ["admin-instructors-count"],
    queryFn: async () => {
      const { count } = await supabase.from("instructors").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: testimonialsCount } = useQuery({
    queryKey: ["admin-testimonials-count"],
    queryFn: async () => {
      const { count } = await supabase.from("testimonials").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: postsCount } = useQuery({
    queryKey: ["admin-posts-count"],
    queryFn: async () => {
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Cursos", value: coursesCount ?? 0, icon: BookOpen, color: "text-primary" },
    { label: "Categorias", value: categoriesCount ?? 0, icon: FolderOpen, color: "text-accent" },
    { label: "Instrutores", value: instructorsCount ?? 0, icon: Users, color: "text-primary" },
    { label: "Depoimentos", value: testimonialsCount ?? 0, icon: MessageSquare, color: "text-accent" },
    { label: "Posts do Blog", value: postsCount ?? 0, icon: Newspaper, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-5 shadow-card">
            <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
