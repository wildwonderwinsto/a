import { motion } from "motion/react";
import locales from "../locales/en.json";
import { Quote } from "lucide-react";

export default function OriginSection() {
  return (
    <section className="py-32 px-4 sm:px-6 border-b-2 border-border bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="mb-8 flex justify-center text-secondary"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Quote size={48} fill="currentColor" className="opacity-20 transform -scale-x-100" />
        </motion.div>

        <motion.blockquote 
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground uppercase tracking-tight mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          "{locales.origin.quote}"
        </motion.blockquote>

        <motion.div 
          className="inline-flex items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="h-px w-12 bg-primary"></div>
          <p className="font-sans text-muted-foreground tracking-widest uppercase text-sm font-semibold">
            {locales.origin.attribution}
          </p>
          <div className="h-px w-12 bg-primary"></div>
        </motion.div>
      </div>
    </section>
  );
}
