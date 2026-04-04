import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, X } from "lucide-react";

interface EnrollmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ASSUNTOS = ["Matrícula", "Informações", "Dúvidas", "Outro"];

const EnrollmentModal = ({ open, onOpenChange }: EnrollmentModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    curso: "",
    assunto: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: courses } = useQuery({
    queryKey: ["courses-list-enrollment"],
    queryFn: async () => {
      const { data } = await supabase.from("courses").select("id, title").order("title");
      return data ?? [];
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp é obrigatório";
    if (!formData.curso) newErrors.curso = "Selecione um curso";
    if (!formData.assunto) newErrors.assunto = "Selecione um assunto";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await supabase.from("course_enrollments").insert({
        nome: formData.nome.trim(),
        whatsapp: formData.whatsapp.trim(),
        curso: formData.curso,
        assunto: formData.assunto,
        mensagem: formData.mensagem.trim() || null,
      });

      if (error) throw error;

      toast({ title: "Inscrição enviada! 🎓", description: "Entraremos em contato em breve." });
      setFormData({ nome: "", whatsapp: "", curso: "", assunto: "", mensagem: "" });
      setErrors({});
      onOpenChange(false);
    } catch {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 rounded-2xl">
        <div className="gradient-bg px-6 py-8 text-center relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-3 right-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary-foreground mb-2">
            Faça sua Inscrição
          </DialogTitle>
          <p className="text-primary-foreground/80 text-sm">
            Preencha o formulário abaixo e entraremos em contato.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="enroll-nome" className="text-sm font-medium">
              Nome <span className="text-destructive">*</span>
            </Label>
            <Input
              id="enroll-nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className={errors.nome ? "border-destructive" : ""}
              maxLength={100}
            />
            {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="enroll-whatsapp" className="text-sm font-medium">
              WhatsApp <span className="text-destructive">*</span>
            </Label>
            <Input
              id="enroll-whatsapp"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className={errors.whatsapp ? "border-destructive" : ""}
              maxLength={20}
            />
            {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Curso <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.curso} onValueChange={(v) => handleChange("curso", v)}>
              <SelectTrigger className={errors.curso ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione um curso" />
              </SelectTrigger>
              <SelectContent>
                {courses?.map((c) => (
                  <SelectItem key={c.id} value={c.title}>{c.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.curso && <p className="text-xs text-destructive">{errors.curso}</p>}
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Assunto <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.assunto} onValueChange={(v) => handleChange("assunto", v)}>
              <SelectTrigger className={errors.assunto ? "border-destructive" : ""}>
                <SelectValue placeholder="Selecione o assunto" />
              </SelectTrigger>
              <SelectContent>
                {ASSUNTOS.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.assunto && <p className="text-xs text-destructive">{errors.assunto}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="enroll-msg" className="text-sm font-medium">Mensagem</Label>
            <Textarea
              id="enroll-msg"
              placeholder="Sua mensagem (opcional)"
              value={formData.mensagem}
              onChange={(e) => handleChange("mensagem", e.target.value)}
              rows={3}
              maxLength={1000}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full rounded-full py-5 text-base font-semibold gradient-bg">
            {loading ? "Enviando..." : "Enviar Inscrição 🎓"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Seus dados estão seguros conosco.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentModal;
