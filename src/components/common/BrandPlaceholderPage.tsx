import Link from "next/link";

interface BrandPlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}

export default function BrandPlaceholderPage({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
}: BrandPlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-pink-900/30 bg-zinc-950 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.16),_transparent_52%)]" />
        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-400">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-white">
            <span className="bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            {description}
          </p>

          <Link
            href={ctaHref}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.25)] transition hover:scale-[1.02]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
