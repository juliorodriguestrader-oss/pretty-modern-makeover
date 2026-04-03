import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Copy } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  initials: string;
  text: string;
  rating: number;
}

const AdminTestimonials = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", role: "", initials: "", text: "", rating: "5" });

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (t: typeof form & { id?: string }) => {
      const payload = { name: t.name, role: t.role, initials: t.initials, text: t.text, rating: parseInt(t.rating) };
      if (t.id) {
        const { error } = await supabase.from("testimonials").update(payload).eq("id", t.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      setOpen(false);
      toast.success(editing ? "Depoimento atualizado!" : "Depoimento criado!");
    },
    onError: () => toast.error("Erro ao salvar depoimento"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      toast.success("Depoimento excluído!");
    },
  });

  const openNew = () => { setEditing(null); setForm({ name: "", role: "", initials: "", text: "", rating: "5" }); setOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ name: t.name, role: t.role, initials: t.initials, text: t.text, rating: String(t.rating) }); setOpen(true); };
  const duplicate = (t: Testimonial) => { setEditing(null); setForm({ name: t.name + " (cópia)", role: t.role, initials: t.initials, text: t.text, rating: String(t.rating) }); setOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Depoimentos</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Novo Depoimento</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Carregando...</p> : (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Cargo</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Texto</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {testimonials?.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{t.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{t.role}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{t.text}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => duplicate(t)}><Copy className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(t.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Novo"} Depoimento</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, id: editing?.id }); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div><Label>Iniciais</Label><Input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} required maxLength={3} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Cargo</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
              <div><Label>Avaliação (1-5)</Label><Input type="number" min="1" max="5" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
            </div>
            <div><Label>Texto</Label><Textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required rows={4} /></div>
            <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Salvando..." : "Salvar"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
