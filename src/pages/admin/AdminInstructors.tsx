import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Copy } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  linkedin: string | null;
  twitter: string | null;
}

const AdminInstructors = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Instructor | null>(null);
  const [form, setForm] = useState({ name: "", role: "", avatar: "", linkedin: "", twitter: "" });

  const { data: instructors, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-instructors"],
    retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase.from("instructors").select("*").order("name");
      if (error) throw error;
      return data as Instructor[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (inst: typeof form & { id?: string }) => {
      const payload = { name: inst.name, role: inst.role, avatar: inst.avatar || null, linkedin: inst.linkedin || null, twitter: inst.twitter || null };
      if (inst.id) {
        const { error } = await supabase.from("instructors").update(payload).eq("id", inst.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("instructors").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-instructors"] });
      setOpen(false);
      toast.success(editing ? "Instrutor atualizado!" : "Instrutor criado!");
    },
    onError: () => toast.error("Erro ao salvar instrutor"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("instructors").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-instructors"] });
      toast.success("Instrutor excluído!");
    },
  });

  const openNew = () => { setEditing(null); setForm({ name: "", role: "", avatar: "", linkedin: "", twitter: "" }); setOpen(true); };
  const openEdit = (i: Instructor) => { setEditing(i); setForm({ name: i.name, role: i.role, avatar: i.avatar || "", linkedin: i.linkedin || "", twitter: i.twitter || "" }); setOpen(true); };
  const duplicate = (i: Instructor) => { setEditing(null); setForm({ name: i.name + " (cópia)", role: i.role, avatar: i.avatar || "", linkedin: i.linkedin || "", twitter: i.twitter || "" }); setOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Instrutores</h1>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Novo Instrutor</Button>
      </div>

      {isLoading ? <p className="text-muted-foreground">Carregando...</p> : (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Avatar</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Nome</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Cargo</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {instructors?.map((inst) => (
                <tr key={inst.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    {inst.avatar && <img src={inst.avatar} alt={inst.name} className="w-10 h-10 rounded-full object-cover" />}
                  </td>
                  <td className="px-4 py-3 text-foreground">{inst.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{inst.role}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(inst)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => duplicate(inst)}><Copy className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(inst.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
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
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Novo"} Instrutor</DialogTitle></DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, id: editing?.id }); }} className="space-y-4">
            <div><Label>Nome</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
            <div><Label>Cargo</Label><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required /></div>
            <div><Label>URL do Avatar</Label><Input value={form.avatar} onChange={(e) => setForm({ ...form, avatar: e.target.value })} /></div>
            <div><Label>LinkedIn</Label><Input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} /></div>
            <div><Label>Twitter</Label><Input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} /></div>
            <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Salvando..." : "Salvar"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInstructors;
