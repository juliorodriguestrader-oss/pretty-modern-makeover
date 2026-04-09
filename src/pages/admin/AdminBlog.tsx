import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Copy, Link, FileText, Loader2 } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  date: string | null;
  image: string | null;
  published: boolean | null;
  external_url: string | null;
}

const AdminBlog = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [postType, setPostType] = useState<"internal" | "external">("internal");
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", category: "", date: "", image: "", published: true, external_url: "" });

  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-blog"],
    retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (p: typeof form & { id?: string }) => {
      const payload = {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || null,
        content: postType === "external" ? null : (p.content || null),
        category: p.category || null,
        date: p.date || null,
        image: p.image || null,
        published: p.published,
        external_url: postType === "external" ? (p.external_url || null) : null,
      };
      if (p.id) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", p.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      setOpen(false);
      toast.success(editing ? "Post atualizado!" : "Post criado!");
    },
    onError: () => toast.error("Erro ao salvar post"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post excluído!");
    },
  });

  const fetchMetaFromUrl = async (url: string) => {
    if (!url) return;
    setFetchingUrl(true);
    try {
      const res = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);
      const json = await res.json();
      if (json.status === "success" && json.data) {
        const d = json.data;
        const title = d.title || "";
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
        const now = new Date();
        const dateStr = now.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
        setForm((prev) => ({
          ...prev,
          title,
          slug,
          excerpt: d.description || "",
          image: d.image?.url || d.logo?.url || "",
          date: dateStr,
          category: d.publisher || "",
          external_url: url,
        }));
        toast.success("Dados importados com sucesso!");
      } else {
        toast.error("Não foi possível extrair os dados do link");
      }
    } catch {
      toast.error("Erro ao buscar dados do link");
    } finally {
      setFetchingUrl(false);
    }
  };

  const openNewInternal = () => {
    setEditing(null);
    setPostType("internal");
    setForm({ title: "", slug: "", excerpt: "", content: "", category: "", date: "", image: "", published: true, external_url: "" });
    setOpen(true);
  };

  const openNewExternal = () => {
    setEditing(null);
    setPostType("external");
    setForm({ title: "", slug: "", excerpt: "", content: "", category: "", date: "", image: "", published: true, external_url: "" });
    setOpen(true);
  };

  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setPostType(p.external_url ? "external" : "internal");
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content || "",
      category: p.category || "",
      date: p.date || "",
      image: p.image || "",
      published: p.published ?? true,
      external_url: p.external_url || "",
    });
    setOpen(true);
  };

  const duplicate = (p: BlogPost) => {
    setEditing(null);
    setPostType(p.external_url ? "external" : "internal");
    setForm({
      title: p.title + " (cópia)",
      slug: p.slug + "-copia",
      excerpt: p.excerpt || "",
      content: p.content || "",
      category: p.category || "",
      date: p.date || "",
      image: p.image || "",
      published: false,
      external_url: p.external_url || "",
    });
    setOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Blog</h1>
        <div className="flex gap-2">
          <Button onClick={openNewInternal} variant="default">
            <FileText className="w-4 h-4 mr-2" />Post Interno
          </Button>
          <Button onClick={openNewExternal} variant="outline">
            <Link className="w-4 h-4 mr-2" />Post Externo
          </Button>
        </div>
      </div>

      {isLoading ? <p className="text-muted-foreground">Carregando...</p> : (
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Título</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Tipo</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Categoria</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Data</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.external_url ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}>
                      {p.external_url ? "Externo" : "Interno"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {p.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => duplicate(p)}><Copy className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Editar" : "Novo"} Post {postType === "external" ? "Externo" : "Interno"}
            </DialogTitle>
          </DialogHeader>

          {postType === "external" && !editing && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3 border border-border">
              <Label className="text-sm font-semibold">Cole o link da notícia para importar automaticamente</Label>
              <div className="flex gap-2">
                <Input
                  value={form.external_url}
                  onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                  placeholder="https://exemplo.com/noticia"
                  type="url"
                />
                <Button
                  type="button"
                  onClick={() => fetchMetaFromUrl(form.external_url)}
                  disabled={fetchingUrl || !form.external_url}
                  variant="secondary"
                >
                  {fetchingUrl ? <Loader2 className="w-4 h-4 animate-spin" /> : "Importar"}
                </Button>
              </div>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, id: editing?.id }); }} className="space-y-4">
            {postType === "external" && editing && (
              <div>
                <Label>URL Externa</Label>
                <Input value={form.external_url} onChange={(e) => setForm({ ...form, external_url: e.target.value })} placeholder="https://exemplo.com/noticia" />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Título</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required /></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Categoria</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><Label>Data</Label><Input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="15 Mar 2026" /></div>
              <div><Label>URL da Imagem</Label><Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></div>
            </div>
            <div><Label>Resumo</Label><Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></div>
            {postType === "internal" && (
              <div><Label>Conteúdo</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} /></div>
            )}
            <div className="flex items-center gap-2">
              <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
              <Label>Publicado</Label>
            </div>
            <Button type="submit" className="w-full" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Salvando..." : "Salvar"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
