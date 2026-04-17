import { motion } from "motion/react";
import locales from "../locales/en.json";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Atmospheric Sunrise Gradient */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-primary blur-[100px] sm:blur-[150px]" />
      </div>

      <div className="z-10 text-center w-full max-w-7xl mx-auto mt-auto">
        <motion.h1 
          className="font-display font-bold text-6xl sm:text-7xl md:text-8xl lg:text-[120px] leading-[0.88] tracking-tighter uppercase text-foreground mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="block">{locales.hero.title_pt1}</span>
          <span className="block text-primary transform -rotate-1 origin-left inline-block">{locales.hero.title_pt2}</span>
        </motion.h1>

        <motion.p 
          className="font-sans text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {locales.hero.subtitle}
        </motion.p>
      </div>

      <div className="mt-auto z-10 pb-10">
        <motion.a 
          href="#waitlist"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="inline-flex min-h-[56px] items-center justify-center rounded-none bg-primary px-8 py-4 font-display text-lg tracking-widest text-background uppercase font-bold transition-transform hover:-translate-y-1 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {locales.hero.cta}
        </motion.a>
      </div>
    </section>
  );
}
