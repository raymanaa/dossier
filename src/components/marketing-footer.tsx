import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="editorial text-[20px] text-ink leading-none">
              Dossier
            </div>
            <p className="mt-3 max-w-[320px] text-[12.5px] leading-[1.7] text-ink-2">
              Investment memos authored by agent. For analysts who'd rather
              argue than research. Alpha — portfolio pilot.
            </p>
          </div>

          <div>
            <div className="label">Product</div>
            <ul className="mt-3 space-y-2 text-[13px]">
              <li><Link href="/app" className="text-ink-2 hover:text-ink transition-colors">Memos</Link></li>
              <li><Link href="/app/new" className="text-ink-2 hover:text-ink transition-colors">Draft a memo</Link></li>
              <li><Link href="/docs" className="text-ink-2 hover:text-ink transition-colors">Method</Link></li>
              <li><Link href="/security" className="text-ink-2 hover:text-ink transition-colors">Security</Link></li>
            </ul>
          </div>

          <div>
            <div className="label">Context</div>
            <ul className="mt-3 space-y-2 text-[13px] text-ink-2">
              <li>Built by Rayen Manaa</li>
              <li>
                <a
                  href="https://github.com/raymanaa/dossier"
                  target="_blank"
                  rel="noopener"
                  className="hover:text-ink transition-colors"
                >
                  github.com/raymanaa/dossier ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-line pt-5 text-[11px] text-ink-3">
          <span className="mono">© 2026 Dossier · alpha</span>
          <span className="mono">dossier.raymnz.com</span>
        </div>
      </div>
    </footer>
  );
}
