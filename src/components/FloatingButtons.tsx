import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-muted transition-all"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      <a
        href="https://wa.me/5599988587620"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Fale pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;
