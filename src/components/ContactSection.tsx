import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    whatsapp: "",
    assunto: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp é obrigatório";
    if (!formData.mensagem.trim()) newErrors.mensagem = "Mensagem é obrigatória";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    setFormData({ nome: "", sobrenome: "", email: "", whatsapp: "", assunto: "", mensagem: "" });
    setErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section id="contato-form" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Mail className="w-4 h-4" />
            Fale Conosco
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Entre em Contato
          </h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Preencha o formulário abaixo e nossa equipe responderá o mais rápido possível.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-card rounded-2xl p-8 lg:p-10 shadow-lg border border-border/50 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="nome" className="font-sans">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                className={errors.nome ? "border-destructive" : ""}
              />
              {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sobrenome" className="font-sans">Sobrenome</Label>
              <Input
                id="sobrenome"
                placeholder="Seu sobrenome"
                value={formData.sobrenome}
                onChange={(e) => handleChange("sobrenome", e.target.value)}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="font-sans">
                WhatsApp <span className="text-destructive">*</span>
              </Label>
              <Input
                id="whatsapp"
                placeholder="(00) 00000-0000"
                value={formData.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className={errors.whatsapp ? "border-destructive" : ""}
              />
              {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assunto" className="font-sans">Assunto</Label>
            <Input
              id="assunto"
              placeholder="Sobre o que deseja falar?"
              value={formData.assunto}
              onChange={(e) => handleChange("assunto", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensagem" className="font-sans">
              Mensagem <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="mensagem"
              placeholder="Escreva sua mensagem aqui..."
              rows={5}
              value={formData.mensagem}
              onChange={(e) => handleChange("mensagem", e.target.value)}
              className={errors.mensagem ? "border-destructive" : ""}
            />
            {errors.mensagem && <p className="text-xs text-destructive">{errors.mensagem}</p>}
          </div>

          <Button type="submit" className="w-full rounded-full py-6 text-base font-semibold gradient-bg group">
            Enviar Mensagem
            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
