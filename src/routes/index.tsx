import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, UserPlus } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header
        className="relative overflow-hidden border-b border-border"
        style={{ background: "var(--gradient-hero)" }}
      >
        <DotLottieReact
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          src="https://lottie.host/647eb023-6040-4b60-a275-e2546994dd7f/zDCfp5lhLe.json"
          autoplay
          loop
          renderConfig={{ autoResize: true }}
        />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-5">
          <div className="flex items-center justify-end gap-2 py-4">
            <span className="mr-auto text-[11px] font-semibold tracking-wide text-foreground/70 sm:text-xs">
              Open Source Directory
            </span>
            <a
              href="https://github.com/Lintshiwe/FreeBrowse"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary sm:text-xs"
            >
              <Star className="h-3.5 w-3.5" />
              Star
            </a>
            <a
              href="https://github.com/Lintshiwe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary sm:text-xs"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Follow
            </a>
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-12 sm:px-5 sm:pb-16 md:pb-24">
          <img
            src="/favicon.png"
            alt="OpenStack"
            className="mb-4 h-10 w-10 rounded-xl border border-border/50 bg-card/60 object-cover backdrop-blur sm:h-12 sm:w-12 sm:mb-5"
          />
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl">
            The open directory of <span className="text-primary">useful websites</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base md:text-lg">
            Discover free and affordable digital tools that matter. Built to help South Africans —
            students, entrepreneurs, and small businesses — find the right software without breaking
            the bank.
          </p>

          <div className="mt-6 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-lg sm:mt-8">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(48);
              }}
              placeholder="Search tools — try email, design, analytics..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
            />
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-3 sm:gap-3 sm:px-5 sm:py-4">
          <div className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card p-1">
            {PRICING_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setPricing(f);
                  setVisible(48);
                }}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs ${
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
            className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1.5 text-[11px] text-foreground focus:border-primary focus:outline-none sm:px-3 sm:text-xs"
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
            className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1.5 text-[11px] text-foreground focus:border-primary focus:outline-none sm:px-3 sm:text-xs"
          >
            <option value="All">All platforms</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <span className="ml-auto shrink-0 text-[11px] text-muted-foreground sm:text-xs">
            {filtered.length.toLocaleString()} results
          </span>
        </div>
      </section>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-5 py-10">
        {shown.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
            <p className="text-lg font-medium">No tools match those filters.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try removing a filter or clearing the search.
            </p>
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
        <div className="mx-auto flex max-w-6xl items-center justify-center px-5 py-6 text-xs text-muted-foreground">
          <p>
            Developed by{" "}
            <a
              className="font-medium text-foreground hover:text-primary transition-colors"
              href="https://github.com/Lintshiwe"
              target="_blank"
              rel="noreferrer"
            >
              Lintshiwe
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
