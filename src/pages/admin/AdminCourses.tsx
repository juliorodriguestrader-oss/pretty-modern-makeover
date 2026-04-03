import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Copy } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

interface CourseRow {
  id: string;
  slug: string;
  title: string;
  category_id: string | null;
  image: string | null;
  lessons: number | null;
  students: number | null;
  level: string | null;
  rating: number | null;
  reviews: number | null;
  price: number | null;
  sale_price: number | null;
  badge: string | null;
  duration: string | null;
  language: string | null;
  certificate: boolean | null;
  instructor_id: string | null;
  description: string | null;
  objectives: Json | null;
  modules: Json | null;
}

const defaultForm = {
  slug: "", title: "", category_id: "", image: "", lessons: "0", students: "0",
  level: "Iniciante", rating: "0", reviews: "0", price: "0", sale_price: "0",
  badge: "", duration: "", language: "Português", certificate: true,
  instructor_id: "", description: "", objectives: "[]", modules: "[]",
};

const AdminCourses = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<CourseRow | null>(null);
  const [form, setForm] = useState(defaultForm);

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("courses").select("*").order("title");
      if (error) throw error;
      return data as CourseRow[];
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["admin-categories-select"],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("id, name").order("name");
      return data ?? [];
    },
  });

  const { data: instructors } = useQuery({
    queryKey: ["admin-instructors-select"],
    queryFn: async () => {
      const { data } = await supabase.from("instructors").select("id, name").order("name");
      return data ?? [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (f: typeof form & { id?: string }) => {
      let objectives: Json;
      let modules: Json;
      try { objectives = JSON.parse(f.objectives); } catch { objectives = []; }
      try { modules = JSON.parse(f.modules); } catch { modules = []; }

      const payload = {
        slug: f.slug, title: f.title, category_id: f.category_id || null,
        image: f.image || null, lessons: parseInt(f.lessons), students: parseInt(f.students),
        level: f.level, rating: parseFloat(f.rating), reviews: parseInt(f.reviews),
        price: parseFloat(f.price), sale_price: parseFloat(f.sale_price),
        badge: f.badge || null, duration: f.duration || null, language: f.language,
        certificate: f.certificate, instructor_id: f.instructor_id || null,
        description: f.description || null, objectives, modules,
      };
      if (f.id) {
        const { error } = await supabase.from("courses").update(payload).eq("id", f.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      setOpen(false);
      toast.success(editing ? "Curso atualizado!" : "Curso criado!");
    },
    onError: (e) => toast.error("Erro ao salvar curso: " + e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      toast.success("Curso excluído!");
    },
  });

  const openNew = () => { setEditing(null); setForm(defaultForm); setOpen(true); };

  const openEdit = (c: CourseRow) => {
    setEditing(c);
    setForm({
      slug: c.slug, title: c.title, category_id: c.category_id || "",
      image: c.image || "", lessons: String(c.lessons ?? 0), students: String(c.students ?? 0),
      level: c.level || "Iniciante", rating: String(c.rating ?? 0), reviews: String(c.reviews ?? 0),
      price: String(c.price ?? 0), sale_price: String(c.sale_price ?? 0),
      badge: c.badge || "", duration: c.duration || "", language: c.language || "Português",
      certificate: c.certificate ?? true, instructor_id: c.instructor_id || "",
      description: c.description || "",
      objectives: JSON.stringify(c.objectives ?? [], null, 2),
      modules: JSON.stringify(c.modules ?? [], null, 2),
    });
    setOpen(true);
  };

  const duplicate = (c: CourseRow) => {
    setEditing(null);
    setForm({
      slug: c.slug + "-copia", title: c.title + " (cópia)", category_id: c.category_id || "",
      image: c.image || "", lessons: String(c.lessons ?? 0), students: String(c.students ?? 0),
      level: c.level || "Iniciante", rating: String(c.rating ?? 0), reviews: String(c.reviews ?? 0),
      price: String(c.price ?? 0), sale_price: String(c.sale_price ?? 0),
      badge: c.badge || "", duration: c.duration || "", language: c.language || "Português",
      certificate: c.certificate ?? true, instructor_id: c.instructor_id || "",
      description: c.description || "",
      objectives: JSON.stringify(c.objectives ?? [], null, 2),
      modules: JSON.stringify(c.modules ?? [], null, 2),
    });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Cursos</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Novo Curso</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Carregando...</p> : (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Título</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Nível</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Preço</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Badge</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {courses?.map((c) => (
                <tr key={c.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground font-medium">{c.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.level}</td>
                  <td className="px-4 py-3 text-muted-foreground">R$ {Number(c.sale_price ?? c.price ?? 0).toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.badge}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(c)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => duplicate(c)}><Copy className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Novo"} Curso</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, id: editing?.id }); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Título</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Categoria</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm({ ...form, category_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{categories?.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Instrutor</Label>
                <Select value={form.instructor_id} onValueChange={(v) => setForm({ ...form, instructor_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>{instructors?.map((i) => <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Nível</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div><Label>URL da Imagem</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>

            <div className="grid grid-cols-4 gap-4">
              <div><Label>Aulas</Label><Input type="number" value={form.lessons} onChange={(e) => setForm({ ...form, lessons: e.target.value })} /></div>
              <div><Label>Alunos</Label><Input type="number" value={form.students} onChange={(e) => setForm({ ...form, students: e.target.value })} /></div>
              <div><Label>Avaliação</Label><Input type="number" step="0.1" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
              <div><Label>Reviews</Label><Input type="number" value={form.reviews} onChange={(e) => setForm({ ...form, reviews: e.target.value })} /></div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div><Label>Preço (R$)</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
              <div><Label>Preço Promo (R$)</Label><Input type="number" step="0.01" value={form.sale_price} onChange={(e) => setForm({ ...form, sale_price: e.target.value })} /></div>
              <div><Label>Duração</Label><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="40h" /></div>
              <div><Label>Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Mais Vendido" /></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Idioma</Label><Input value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })} /></div>
              <div className="flex items-center gap-2 pt-6">
                <Switch checked={form.certificate} onCheckedChange={(v) => setForm({ ...form, certificate: v })} />
                <Label>Certificado</Label>
              </div>
            </div>

            <div><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></div>

            <div><Label>Objetivos (JSON)</Label><Textarea value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} rows={4} className="font-mono text-xs" /></div>

            <div><Label>Módulos (JSON)</Label><Textarea value={form.modules} onChange={(e) => setForm({ ...form, modules: e.target.value })} rows={6} className="font-mono text-xs" /></div>

            <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Salvando..." : "Salvar"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourses;
