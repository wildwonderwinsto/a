import { motion } from "motion/react";
import locales from "../locales/en.json";

export default function TechSection() {
  // Using reliable public portrait URLs for comedic effect
  const imageSources = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2a/Bobby_Lee_by_Gage_Skidmore.jpg", // Bobby Lee
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Andrew_Santino.jpg", // Andrew Santino (Tito Andrew)
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80", // Rudy Jules (bored/unimpressed proxy)
    "https://images.unsplash.com/photo-1542156822-6924d1a71ace?w=600&auto=format&fit=crop&q=80", // Fancy B (European producer proxy)
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80", // Carlos (Creepy/Mustache producer proxy)
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80" // Stern judging older woman (Mom proxy)
  ];
  
  const filters = ["sepia", "grayscale", "sepia", "grayscale", "sepia", "grayscale"];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-border bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.h2 
            className="font-display font-bold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {locales.tech.title}
          </motion.h2>
          <motion.p 
            className="font-sans text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {locales.tech.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locales.tech.features.map((feature, idx) => (
            <motion.div 
              key={idx}
              className="flex flex-col bg-surface border-2 border-border p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="w-full aspect-video bg-black mb-6 relative overflow-hidden border border-border">
                {/* Simulated pseudo-scientific overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-30">
                  <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent"></div>
                </div>
                <div className="absolute top-2 left-2 z-10 font-mono text-[10px] text-green-500 uppercase tracking-widest opacity-70">
                  [SCAN_{idx + 1}_INIT]
                </div>
                
                <img 
                  src={imageSources[idx]} 
                  alt={feature.title} 
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover opacity-80 ${filters[idx] === 'grayscale' ? 'grayscale' : 'sepia'}`}
                />
              </div>

              <h3 className="font-display font-bold text-xl uppercase tracking-wide text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
