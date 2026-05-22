import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, Github } from "lucide-react";
import productsData from "@/data/products.json";
import { ProductCard, type Product } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  component: Index,
});

const PRODUCTS = productsData as Product[];

const PRICING_FILTERS = ["All", "Free", "Freemium", "Paid"] as const;
type PricingFilter = (typeof PRICING_FILTERS)[number];

const PLATFORMS = ["Web", "Mobile", "Desktop", "Api", "Cli", "Mcp"];

function Index() {
  const [query, setQuery] = useState("");
  const [pricing, setPricing] = useState<PricingFilter>("All");
  const [category, setCategory] = useState<string>("All");
  const [platform, setPlatform] = useState<string>("All");
  const [visible, setVisible] = useState(48);

  const allCategories = useMemo(() => {
    const set = new Map<string, number>();
    for (const p of PRODUCTS) for (const c of p.useCases) set.set(c, (set.get(c) ?? 0) + 1);
    return ["All", ...[...set.entries()].sort((a, b) => b[1] - a[1]).map(([k]) => k)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (pricing !== "All") {
        if (pricing === "Paid") {
          if (!["Paid", "Subscription", "OneTime"].includes(p.pricing)) return false;
        } else if (p.pricing !== pricing) return false;
      }
      if (category !== "All" && !p.useCases.includes(category)) return false;
      if (platform !== "All" && !p.platforms.includes(platform)) return false;
      if (q) {
        const hay = `${p.name} ${p.tagline} ${p.description} ${p.useCases.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => b.score - a.score);
  }, [query, pricing, category, platform]);

  const shown = filtered.slice(0, visible);
  const freeCount = PRODUCTS.filter((p) => p.pricing === "Free" || p.pricing === "Freemium").length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header
        className="relative overflow-hidden border-b border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, oklch(0.55 0.14 155 / 0.12), transparent 40%), radial-gradient(circle at 80% 30%, oklch(0.55 0.12 220 / 0.08), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {PRODUCTS.length.toLocaleString()} tools indexed · {freeCount.toLocaleString()} free or freemium
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            The open directory of <span className="text-primary">useful websites</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            A curated, well-organised catalog of free, freemium, open-source and paid tools — searchable
            by category, platform, and pricing. Seeded from the PeerPush community.
          </p>

          <div className="mt-8 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(48);
              }}
              placeholder="Search 1,000+ tools — try ‘email’, ‘design’, ‘analytics’…"
              className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-5 py-4">
          <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
            {PRICING_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setPricing(f);
                  setVisible(48);
                }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  pricing === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setVisible(48);
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            {allCategories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All categories" : c}
              </option>
            ))}
          </select>

          <select
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
              setVisible(48);
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="All">All platforms</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length.toLocaleString()} results
          </span>
        </div>
      </section>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-5 py-10">
        {shown.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
            <p className="text-lg font-medium">No tools match those filters.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try removing a filter or clearing the search.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setVisible((v) => v + 48)}
              className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Load more ({filtered.length - visible} remaining)
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            Data seeded from{" "}
            <a className="text-primary hover:underline" href="https://peerpush.net" target="_blank" rel="noreferrer">
              PeerPush
            </a>
            's open product API. All trademarks belong to their respective owners.
          </p>
          <span className="inline-flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" /> Built as an open directory
          </span>
        </div>
      </footer>
    </div>
  );
}
