import type { Metadata } from "next";
import { Person } from "@/components/Person";
import { fill, getDict } from "@/lib/i18n/dict";
import { getLang, pageMeta } from "@/lib/i18n/server";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "/about", getDict(lang).pages.meta.about);
}

// People: names never change with the language. Only the job titles (in the dictionaries) are translated.
const PEOPLE: { slug: string; name: string; linkedin?: string }[] = [
  { slug: "atul-pai-kane", name: "Atul Pai Kane", linkedin: "https://www.linkedin.com/in/atul-pai-kane-93166a42/" },
  { slug: "siddharth-naik", name: "Siddharth Naik", linkedin: "https://www.linkedin.com/in/siddarthnaik/" },
  { slug: "ramnath-moye", name: "Ramnath Moye" },
  { slug: "hariom-tiwari", name: "Hariom Tiwari", linkedin: "https://www.linkedin.com/in/hariom-tiwari-658639a5/" },
  { slug: "sunil-pai-kane", name: "Sunil Pai Kane", linkedin: "https://www.linkedin.com/in/sunil-pai-kane-563478150/" },
  { slug: "orlene-dsouza", name: "Orlene Dsouza", linkedin: "https://www.linkedin.com/in/orlene-dsouza-49277347/" },
];

export default async function About({ params }: Props) {
  const lang = await getLang(params);
  const t = getDict(lang).pages.about;
  return (
    <>
      <div className="about-split">
      <section className="vt">
        <div className="vt-in">
          <span className="vt-bar" aria-hidden />
          <h1>{t.title}</h1>
          <p className="vt-sub">{t.sub}</p>
          <ol className="vt-list">
            {t.milestones.map(([year, text], i) => (
              <li key={year} className={`${i % 2 ? "even" : "odd"} ${i === t.milestones.length - 1 ? "now" : ""}`}>
                <div className="vt-card">
                  <span className="vt-year">{year}</span>
                  <span className="vt-text">{text}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="vt-facts">
            {t.facts.map(([pre, bold, post]) => (
              <p key={bold}>{pre}<b>{bold}</b>{post}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="story">
        <div className="story-head">
          <h2 className="s-h">{t.heading}</h2>
          <a className="arrow gray" href={SITE.groupUrl} target="_blank" rel="noopener noreferrer">{t.visit}</a>
        </div>
        <p className="mut">{t.p1}</p>
        <ul className="bul">
          {t.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <p className="mut">{t.p2}</p>
        <p className="mut">{t.p3}</p>
        <div className="team-wrap">
          <h2 className="s-h">{t.leadership}</h2>
          <div className="team">
            {PEOPLE.map((p) => (
              <Person key={p.slug} slug={p.slug} name={p.name} role={t.roles[p.slug]} linkedin={p.linkedin} linkedinLabel={fill(t.linkedinOf, { name: p.name })} />
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
