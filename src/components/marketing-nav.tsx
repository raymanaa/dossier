"use client";

import Link from "next/link";

export function MarketingNav() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="editorial text-[22px] text-ink leading-none">
            Dossier
          </span>
          <span className="label !text-[9.5px]">VOL. α · NO. 1</span>
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] text-ink-2 md:flex">
          <Link href="/app" className="hover:text-ink transition-colors">
            Memos
          </Link>
          <Link href="/docs" className="hover:text-ink transition-colors">
            Method
          </Link>
          <Link href="/security" className="hover:text-ink transition-colors">
            Security
          </Link>
        </nav>

        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 bg-ink text-paper px-3.5 py-2 text-[12.5px] font-medium hover:bg-ink-2 transition-colors"
        >
          <span>Open the press</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </header>
  );
}
