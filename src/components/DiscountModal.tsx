import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Gift, X } from "lucide-react";

const DiscountModal = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({ nome: "", sobrenome: "", whatsapp: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem("discount_modal_seen");
    if (alreadySeen) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("discount_modal_seen", "true");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    toast({ title: "Desconto solicitado! 🎉", description: "Entraremos em contato pelo WhatsApp com seu cupom." });
    setFormData({ nome: "", sobrenome: "", whatsapp: "" });
    setErrors({});
    setOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 rounded-2xl">
        {/* Header */}
        <div className="gradient-bg px-6 py-8 text-center relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary-foreground mb-2">
            Ganhe um Desconto Especial!
          </DialogTitle>
          <p className="text-primary-foreground/80 text-sm">
            Preencha o formulário e receba seu cupom exclusivo pelo WhatsApp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="disc-nome" className="text-sm font-medium">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="disc-nome"
                placeholder="Seu nome"
                value={formData.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                className={errors.nome ? "border-destructive" : ""}
              />
              {errors.nome && <p className="text-xs text-destructive">{errors.nome}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="disc-sobrenome" className="text-sm font-medium">
                Sobrenome
              </Label>
              <Input
                id="disc-sobrenome"
                placeholder="Seu sobrenome"
                value={formData.sobrenome}
                onChange={(e) => handleChange("sobrenome", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="disc-whatsapp" className="text-sm font-medium">
              WhatsApp <span className="text-destructive">*</span>
            </Label>
            <Input
              id="disc-whatsapp"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className={errors.whatsapp ? "border-destructive" : ""}
            />
            {errors.whatsapp && <p className="text-xs text-destructive">{errors.whatsapp}</p>}
          </div>

          <Button type="submit" className="w-full rounded-full py-5 text-base font-semibold gradient-bg">
            Quero meu Desconto! 🎁
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Seus dados estão seguros conosco.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountModal;
