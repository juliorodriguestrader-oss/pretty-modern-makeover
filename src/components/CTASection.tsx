import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnrollmentModal from "@/components/EnrollmentModal";

const CTASection = () => {
  const [enrollOpen, setEnrollOpen] = useState(false);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="gradient-bg rounded-3xl p-10 lg:p-20 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary-foreground/5 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-primary-foreground/5 translate-x-1/4 translate-y-1/4" />

          <h2 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-6 relative z-10">
            Comece Sua Jornada de<br />Aprendizado Hoje
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-lg relative z-10">
            Junte-se a mais de 50.000 alunos que já estão transformando suas carreiras
          </p>
          <Button
            onClick={() => setEnrollOpen(true)}
            className="bg-card text-foreground rounded-full px-10 py-6 text-base font-semibold hover:bg-card/90 transition-all relative z-10 group"
          >
            Inscrição
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>

      <EnrollmentModal open={enrollOpen} onOpenChange={setEnrollOpen} />
    </section>
  );
};

export default CTASection;
