import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Users, MessageSquare, FolderOpen, Newspaper, Construction } from "lucide-react";
import { useMaintenanceMode } from "@/hooks/useMaintenanceMode";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

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

  const { isMaintenanceMode, toggleMaintenance, isToggling } = useMaintenanceMode();

  const handleToggle = async (checked: boolean) => {
    try {
      await toggleMaintenance(checked);
      toast({
        title: checked ? "Site em manutenção" : "Site ativo",
        description: checked
          ? "O site está exibindo a página de manutenção para visitantes."
          : "O site voltou ao funcionamento normal.",
      });
    } catch {
      toast({ title: "Erro ao alterar modo de manutenção", variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="flex items-center gap-3 bg-card rounded-xl px-4 py-3 shadow-card">
          <Construction className={`w-5 h-5 ${isMaintenanceMode ? "text-destructive" : "text-muted-foreground"}`} />
          <span className="text-sm font-medium text-foreground">Modo Manutenção</span>
          <Switch
            checked={isMaintenanceMode}
            onCheckedChange={handleToggle}
            disabled={isToggling}
          />
        </div>
      </div>
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
