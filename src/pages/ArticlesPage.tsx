import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { DirArrow, Reveal, SectionHead, DecorativeGrid } from "../components/ui";
import { useApp } from "../lib/app";
import { getPublishedArticles, type Article } from "../lib/articles";
import { formatArticleDate } from "../lib/formatDate";
import { DAILY_DIGEST_ENABLED } from "../lib/news";
import { localePath } from "../lib/paths";

/** Editorial index row — hairline-separated entry, serif title, mono meta. */
function ArticleRow({ article, index }: { article: Article; index: number }) {
  const { t, lang } = useApp();
  const to = localePath(lang, `/articles/${article.slug}`);
  const { frontmatter: fm } = article;

  return (
    <Reveal delay={Math.min(index * 60, 360)}>
      <article className="group relative border-b border-line py-8 first:pt-0 last:border-b-0 md:py-10">
        <Link to={to} className="block" aria-label={fm.title}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-accent" dir="ltr" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink3">
              {formatArticleDate(fm.date, lang)}
              <span className="mx-2 text-line2">·</span>
              {t.articles.readingTime.replace("{n}", String(fm.readingTimeMinutes))}
            </p>
          </div>
          <h2 className="display-heading mt-3 max-w-3xl text-[24px] font-semibold leading-[1.28] tracking-tight transition-colors duration-300 group-hover:text-hi sm:mt-4 sm:text-[30px] md:text-[34px]">
            {fm.title}
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] leading-7 text-ink2 sm:mt-4 sm:text-[14.5px] sm:leading-8">
            {fm.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            {fm.tags.length > 0 ? (
              <p className="line-clamp-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink3">
                {fm.tags.join(" · ")}
              </p>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-2 text-[12.5px] font-bold text-ink2 transition-colors group-hover:text-hi">
              {t.articles.view}
              <DirArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </span>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

/** Quiet secondary entry to Daily Digest — not a second top-level nav item. */
function DailyDigestTeaser() {
  const { t, lang } = useApp();

  return (
    <Reveal delay={120}>
      <aside className="mt-12 border-t border-line pt-10 md:mt-14 md:pt-12">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink3">
          {t.articles.digestKicker}
        </p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-xl">
            <h2 className="text-[18px] font-extrabold tracking-tight md:text-[20px]">{t.articles.digestTitle}</h2>
            <p className="mt-2 text-[13.5px] leading-7 text-ink2">{t.articles.digestLead}</p>
          </div>
          <Link
            to={localePath(lang, "/news")}
            className="inline-flex shrink-0 items-center gap-2 text-[13px] font-bold text-hi transition-colors hover:text-ink"
          >
            {t.articles.digestCta}
            <DirArrow className="h-4 w-4" />
          </Link>
        </div>
      </aside>
    </Reveal>
  );
}

export default function ArticlesPage() {
  const { t, lang } = useApp();
  const articles = getPublishedArticles(lang);

  return (
    <>
      <PageMeta page="articles" />
      <section id="articles" className="relative overflow-hidden section-pad border-t border-line">
        <DecorativeGrid />
        <div className="wrap relative">
          <SectionHead kicker={t.articles.pageKicker} title={t.articles.pageTitle} lead={t.articles.pageLead} />

          {articles.length === 0 ? (
            <Reveal delay={80}>
              <p className="mt-10 max-w-xl text-[15px] leading-8 text-ink2">{t.articles.empty}</p>
            </Reveal>
          ) : (
            <div className="mt-10 border-t border-line sm:mt-14">
              {articles.map((article, i) => (
                <ArticleRow key={article.slug} article={article} index={i} />
              ))}
            </div>
          )}

          {DAILY_DIGEST_ENABLED ? <DailyDigestTeaser /> : null}
        </div>
      </section>
    </>
  );
}
