import locales from "../locales/en.json";

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t-2 border-border bg-background">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-sans text-muted-foreground text-xs font-medium uppercase tracking-widest">
          {locales.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
