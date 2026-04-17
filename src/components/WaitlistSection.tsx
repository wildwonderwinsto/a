import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import locales from "../locales/en.json";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Turnstile simulation state
  const [turnstileState, setTurnstileState] = useState<"idle" | "verifying" | "success">("idle");

  const handleTurnstileClick = () => {
    if (turnstileState !== "idle") return;
    setTurnstileState("verifying");
    
    // Simulate real verification delay
    setTimeout(() => {
      setTurnstileState("success");
    }, 1800);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (turnstileState !== "success") return;
    
    setStatus("submitting");
    setErrorMessage("");

    try {
      // API call to the local Express backend route setup in server.ts
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          turnstileToken: "stub-pass" // Passing our simulated token for Turnstile
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <section id="waitlist" className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-3xl mx-auto text-center border-2 border-border p-8 sm:p-12 md:p-16 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary translate-x-1 translate-y-1"></div>

        <motion.h2 
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground uppercase tracking-tighter mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {locales.waitlist.title}
        </motion.h2>

        <motion.p 
          className="font-sans text-muted-foreground text-center max-w-xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {locales.waitlist.description}
        </motion.p>

        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto relative z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col gap-5">
            <label htmlFor="email" className="sr-only">
              {locales.waitlist.email_label}
            </label>
            <input
              id="email"
              type="email"
              required
              disabled={status === "submitting" || status === "success"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={locales.waitlist.email_placeholder}
              aria-describedby={errorMessage ? "waitlist-error" : undefined}
              className="w-full min-h-[64px] px-5 py-4 bg-background border-4 border-border text-foreground font-sans text-lg placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
            />
            
            {/* Interactive Neo-Brutalist STUB: Cloudflare Turnstile Verification widget */}
            <button 
              type="button"
              onClick={handleTurnstileClick}
              disabled={turnstileState !== "idle"}
              className="w-full h-[72px] bg-background border-4 border-border flex items-center px-4 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 group relative overflow-hidden disabled:cursor-not-allowed" 
              aria-label="Verify you are ugly enough"
            >
              {turnstileState === "verifying" && (
                <motion.div 
                  className="absolute inset-0 bg-primary/10"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
              <div className={`w-8 h-8 border-4 ${turnstileState === "success" ? "border-primary" : "border-border"} bg-background mr-4 flex flex-shrink-0 items-center justify-center transition-colors overflow-hidden relative group-hover:border-primary z-10`}>
                {turnstileState === "verifying" && (
                  <motion.div 
                    className="w-5 h-5 border-t-4 border-primary rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {turnstileState === "success" && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="text-primary"
                  >
                    <Check strokeWidth={4} size={20} />
                  </motion.div>
                )}
              </div>
              <div className="flex flex-col text-left z-10 w-full">
                <span className={`text-sm md:text-base font-sans font-bold transition-colors ${turnstileState === "success" ? "text-primary" : "text-foreground"}`}>
                  {turnstileState === "idle" ? "Confirm you are human" : 
                   turnstileState === "verifying" ? "Scanning for flawless pores..." : 
                   "Authentic Ugly Confirmed"}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  {turnstileState === "idle" ? "Anti-Bot Protection" : 
                   turnstileState === "success" ? "Verification complete" : "Analyzing face data"}
                </span>
              </div>
              <div className="hidden sm:flex flex-col text-right ml-auto z-10 flex-shrink-0 opacity-40">
                <span className="text-[10px] font-display uppercase tracking-widest text-foreground">Powered by</span>
                <span className="text-[12px] font-display uppercase tracking-widest font-bold text-foreground">Bobby Lee</span>
              </div>
            </button>

            <button
              type="submit"
              disabled={status === "submitting" || status === "success" || turnstileState !== "success"}
              className={`w-full min-h-[72px] font-display font-black text-xl lg:text-2xl uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative
                ${turnstileState !== "success" || status === "submitting" || status === "success" 
                  ? 'bg-border text-muted-foreground/50 border-4 border-border' 
                  : 'bg-primary text-background border-4 border-primary shadow-[6px_6px_0px_0px_#B91A00] hover:shadow-[0px_0px_0px_0px_#B91A00] hover:translate-x-[6px] hover:translate-y-[6px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50'
                }`}
            >
              {status === "submitting" ? locales.waitlist.submitting : (status === "success" ? "YOU'RE ON THE LIST" : locales.waitlist.submit)}
              {status === "idle" && turnstileState === "success" && (
                <ArrowRight className="w-6 h-6 animate-pulse" strokeWidth={3} />
              )}
            </button>
          </div>

          <div aria-live="polite" className="mt-4 min-h-[24px]">
            {status === "success" && (
              <p className="text-primary font-semibold text-sm uppercase tracking-wide">
                {locales.waitlist.success}
              </p>
            )}
            {status === "error" && (
              <p id="waitlist-error" className="text-secondary font-semibold text-sm uppercase tracking-wide">
                {errorMessage}
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
