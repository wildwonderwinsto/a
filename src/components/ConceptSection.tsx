import { motion } from "motion/react";
import locales from "../locales/en.json";
import { Camera, Sun, Ban, ShieldCheck } from "lucide-react";

const icons = [Ban, Sun, Camera, ShieldCheck];

export default function ConceptSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 border-y-2 border-border bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-24 flex items-baseline gap-4">
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight text-foreground">
            {locales.rules.title}
          </h2>
          <div className="h-1 flex-1 bg-border hidden sm:block"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:border-x-2 border-border">
          {locales.rules.items.map((rule, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div 
                key={idx}
                className="flex flex-col p-6 sm:p-8 border-2 lg:border-y-0 lg:border-x-0 lg:border-r-2 border-border last:border-r-0 bg-background relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Number structural accent */}
                <div className="absolute top-4 right-6 font-display text-6xl font-bold text-surface opacity-50 z-0 pointer-events-none group-hover:text-primary transition-colors duration-500">
                  0{idx + 1}
                </div>

                <div className="relative z-10 mb-8">
                  <div className="w-12 h-12 flex items-center justify-center bg-surface border border-border rounded-none text-primary">
                    <Icon size={24} />
                  </div>
                </div>

                <h3 className="relative z-10 font-display text-2xl uppercase tracking-wide text-foreground mb-4">
                  {rule.heading}
                </h3>
                <p className="relative z-10 font-sans text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {rule.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
