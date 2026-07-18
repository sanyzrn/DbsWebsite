import { useLanguage } from '../config/languageConfig';
import { archiveContent } from '../content/archive';

const GRADIENTS = [
  'linear-gradient(135deg, #17140F 0%, #2FBF58 55%, #F5E8D1 100%)',
  'linear-gradient(135deg, #18181b 0%, #52525b 100%)',
  'linear-gradient(135deg, #1a2e1f 0%, #41DA6F 45%, #94a3b8 100%)',
  'linear-gradient(135deg, #334155 0%, #94a3b8 100%)',
  'linear-gradient(135deg, #17140F 0%, #3a5a40 100%)',
  'linear-gradient(135deg, #0f172a 0%, #41DA6F 100%)',
];

export default function Archive() {
  const { lang } = useLanguage();
  const content = archiveContent[lang];
  // Show a curated set in the glass grid (first 6) for visual balance
  const projects = content.projects.slice(0, 6);
  const viewLabel = lang === 'fa' ? 'گیت‌هاب ↗' : 'GitHub ↗';

  return (
    <section id="archive" className="px-4 sm:px-6 lg:px-10 mt-16 sm:mt-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-eyebrow">{lang === 'fa' ? 'کار منتخب' : 'Selected work'}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-[var(--ink)] max-w-xl">
              {lang === 'fa'
                ? 'تجربه‌های دیجیتال ظریف با دیدگاه روشن.'
                : 'Elegant digital experiences with a strong point of view.'}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[var(--muted)] sm:text-right">
            {content.subtitle}
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const href = `https://github.com/sanyzrn?tab=repositories&q=${encodeURIComponent(project.repoQuery)}`;
            return (
              <article
                key={project.number}
                className="rounded-[32px] border border-[var(--line)] bg-white/72 p-4 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              >
                <div
                  className="relative h-52 overflow-hidden rounded-[26px] p-5 text-white"
                  style={{ backgroundImage: GRADIENTS[index % GRADIENTS.length] }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_32%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-white/80">
                      <span className="truncate pe-2">{project.category}</span>
                      <span className="mono">{project.number}</span>
                    </div>
                    <div className="grid grid-cols-[1.45fr_1fr] gap-3">
                      <div className="rounded-[22px] border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                        <div className="h-2 w-20 rounded-full bg-white/85" />
                        <div className="mt-4 h-16 rounded-[18px] border border-white/10 bg-black/10" />
                      </div>
                      <div className="space-y-3">
                        <div className="h-12 rounded-[18px] border border-white/20 bg-black/10" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="h-10 rounded-[14px] border border-white/20 bg-white/10" />
                          <div className="h-10 rounded-[14px] border border-white/20 bg-white/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-2 pb-2 pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">{project.title}</h3>
                    <span className="mono text-[10px] text-[var(--muted)] whitespace-nowrap pt-2">{project.year}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)] line-clamp-3">{project.description}</p>

                  <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                    {project.tags.slice(0, 3).map((tag) => (
                      <li key={tag} className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex text-sm font-semibold text-[var(--accent-dark)] hover:underline"
                  >
                    {viewLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
