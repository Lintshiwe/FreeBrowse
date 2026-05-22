import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "OpenStack — Free & Open Source Tools Directory" },
      {
        name: "description",
        content:
          "A curated, well-organised directory of free, freemium, and open-source websites and tools — searchable by category, platform, and pricing.",
      },
      { name: "author", content: "OpenStack" },
      { name: "robots", content: "noai, noimageai" },
      { property: "og:title", content: "OpenStack — Free & Open Source Tools Directory" },
      {
        property: "og:description",
        content:
          "Browse hundreds of free, freemium, and open-source products and websites in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@OpenStackHQ" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var BLOCKED_KEYS = new Set(["F12"]);
  var CTRL_BLOCKED = new Set(["KeyI","KeyJ","KeyC","KeyU","KeyS","KeyP"]);

  document.addEventListener("contextmenu", function(e){ e.preventDefault(); });

  document.addEventListener("keydown", function(e){
    if(BLOCKED_KEYS.has(e.key)){ e.preventDefault(); return false; }
    if((e.ctrlKey||e.metaKey)&&e.shiftKey&&CTRL_BLOCKED.has(e.code)){ e.preventDefault(); return false; }
    if((e.ctrlKey||e.metaKey)&&e.key==="u"){ e.preventDefault(); return false; }
  });

  var devtoolsOpen = false;
  var threshold = 160;
  var check = function(){
    var w = window.outerWidth - window.innerWidth > threshold;
    var h = window.outerHeight - window.innerHeight > threshold;
    if(w || h){ devtoolsOpen = true; }
  };
  setInterval(check, 1000);

  var el = document.createElement("div");
  Object.defineProperty(el, "id", {
    get: function(){ devtoolsOpen = true; return ""; }
  });
  setInterval(function(){ console.log(el); console.clear(); }, 2000);
})();
          `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
