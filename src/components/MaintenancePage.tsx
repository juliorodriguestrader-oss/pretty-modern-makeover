import { Construction } from "lucide-react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <Construction className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-3">Site em Manutenção</h1>
        <p className="text-muted-foreground leading-relaxed">
          Estamos realizando melhorias para oferecer uma experiência ainda melhor. 
          Voltaremos em breve!
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
