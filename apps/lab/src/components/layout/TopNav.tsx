'use client';

import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { key: "lab", label: "Laboratory", href: "/lab" },
  { key: "theory-explorer", label: "Theory Explorer", href: "/lab" },
  { key: "research-library", label: "Research Library", href: "/lab" },
  { key: "settings", label: "Settings", href: "/lab" },
];

export function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (key: string) => {
    if (key === "lab") return pathname === "/lab";
    return false;
  };

  const handleNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-12 axiom-surface axiom-border border-b z-40 flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border border-slateLine flex items-center justify-center text-xs font-mono text-accent">A</div>
          <span className="font-semibold tracking-tight text-xs uppercase letter-spacing-wide">
            AXIOM
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => handleNavigate(item.href)}
            className={`text-xs uppercase tracking-wider font-medium transition-colors ${
              isActive(item.key)
                ? "text-accent"
                : "text-text-muted hover:text-accent"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/lab")}
          className="p-1.5 hover:bg-accent-bg rounded transition-colors"
          title="Return to Laboratory"
          aria-label="Return to Laboratory"
        >
          <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
