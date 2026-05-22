import { ExternalLink, Star } from "lucide-react";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  websiteUrl: string;
  peerpushUrl: string;
  logoUrl: string;
  pricing: string;
  platforms: string[];
  useCases: string[];
  audiences: string[];
  rating: number | null;
  score: number;
};

const pricingTone: Record<string, string> = {
  Free: "bg-primary/15 text-primary border-primary/30",
  Freemium: "bg-primary/10 text-primary border-primary/20",
  Paid: "bg-muted text-muted-foreground border-border",
  Subscription: "bg-muted text-muted-foreground border-border",
  OneTime: "bg-muted text-muted-foreground border-border",
  Unknown: "bg-muted text-muted-foreground border-border",
};

export function ProductCard({ p }: { p: Product }) {
  return (
    <a
      href={p.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start gap-3">
        {p.logoUrl ? (
          <img
            src={p.logoUrl}
            alt={`${p.name} logo`}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-lg border border-border bg-background object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-sm font-semibold text-muted-foreground">
            {p.name.slice(0, 1)}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-foreground">{p.name}</h3>
            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{p.tagline}</p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${
            pricingTone[p.pricing] ?? pricingTone.Unknown
          }`}
        >
          {p.pricing === "Unknown" ? "—" : p.pricing}
        </span>
        {p.useCases.slice(0, 2).map((c) => (
          <span
            key={c}
            className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground"
          >
            {c}
          </span>
        ))}
        {p.rating ? (
          <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Star className="h-3 w-3 fill-primary text-primary" />
            {p.rating.toFixed(1)}
          </span>
        ) : null}
      </div>
    </a>
  );
}
