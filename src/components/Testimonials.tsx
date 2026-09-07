import { Link } from "react-router-dom";
import { Reveal, SectionHead, SnapCarousel } from "./ui";
import { useApp } from "../lib/app";
import { localePath } from "../lib/paths";
import {
  getLocalizedTestimonials,
  type LocalizedTestimonial,
} from "../lib/testimonials";

function TestimonialCard({ item }: { item: LocalizedTestimonial }) {
  const { lang, t } = useApp();
  const isDirect = item.quoteType === "direct";
  const projectHref = item.relatedProjectSlug
    ? localePath(lang, `/projects/${item.relatedProjectSlug}`)
    : null;

  return (
    <article
      data-testid={`testimonial-${item.quoteType}`}
      className="flex min-h-0 w-full flex-1 flex-col rounded-md border border-line bg-surface2 p-6 transition-colors duration-500 hover:border-line2 sm:p-7"
    >
      <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink3">
        {isDirect ? t.testimonials.directLabel : t.testimonials.outcomeLabel}
      </p>

      {isDirect ? (
        <blockquote className="display-heading mt-4 flex-1 text-[17px] font-medium leading-8 text-ink sm:text-[18px] sm:leading-9">
          <span aria-hidden="true" className="text-accent">
            “
          </span>
          {item.quote}
          <span aria-hidden="true" className="text-accent">
            ”
          </span>
        </blockquote>
      ) : (
        <p className="display-heading mt-4 flex-1 border-s-2 border-accent/70 ps-4 text-[17px] font-medium leading-8 text-ink sm:text-[18px] sm:leading-9">
          {item.quote}
        </p>
      )}

      <footer className="mt-6 border-t border-line pt-4">
        <cite className="block text-[13px] font-semibold not-italic text-ink2 sm:text-[14px]">
          {item.attribution}
        </cite>
        {projectHref && (
          <Link
            to={projectHref}
            className="mt-2 inline-flex text-[12px] font-semibold text-hi underline-offset-4 hover:underline"
          >
            {t.testimonials.relatedProject}
          </Link>
        )}
      </footer>
    </article>
  );
}

/**
 * Social-proof section above Contact.
 * Returns null when there are zero published testimonials — no empty-state box.
 */
export default function Testimonials() {
  const { lang, t } = useApp();
  const items = getLocalizedTestimonials(lang);

  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="section-pad border-t border-line bg-page"
    >
      <div className="wrap">
        <SectionHead
          kicker={t.testimonials.kicker}
          title={t.testimonials.title}
          lead={t.testimonials.lead}
        />

        <Reveal delay={80}>
          <div data-testid="testimonials-carousel" className="mt-8 md:hidden">
            <SnapCarousel label={t.testimonials.title}>
              {items.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </SnapCarousel>
          </div>

          <div
            data-testid="testimonials-grid"
            className="mt-8 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, i) => (
              <Reveal key={item.id} delay={100 + i * 60}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
