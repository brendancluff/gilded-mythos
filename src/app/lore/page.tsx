
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alori Lore | Gilded Mythos",
  description:
    "Explore the world of Alori, its seven countries, and its pantheon of 22 deities.",
};

const loreSections = [
  {
    symbol: "✧",
    title: "The World of Alori",
    description:
      "Discover the shared homebrewed world where the adventures of Gilded Mythos take place.",
    detail: "World history and geography coming soon.",
  },
  {
    symbol: "♜",
    title: "The Seven Countries",
    description:
      "Explore the seven countries of Alori, their capitals, cultures, and histories.",
    detail: "Official country information coming soon.",
  },
  {
    symbol: "✦",
    title: "The Pantheon",
    description:
      "Learn about the 22 deities of Alori and their places within the world.",
    detail: "Official deity information coming soon.",
  },
];

export default function LorePage() {
  return (
    <main className="lore-page">
      <section className="lore-hero">
        <p className="eyebrow">THE WORLD BEHIND THE STORIES</p>
        <h1>Discover Alori</h1>
        <p>
          Beyond every adventure lies a world waiting to
          be explored. Discover the lands, legends, and
          divine mysteries of Alori.
        </p>
      </section>

      <section className="lore-content">
        <div className="lore-intro">
          <p className="eyebrow">A SHARED WORLD</p>
          <h2>One World. Countless Stories.</h2>
          <p>
            Alori is the shared homebrewed world of
            Gilded Mythos. Each podcast tells its own
            story while contributing to a larger setting.
          </p>
        </div>

        <div className="lore-grid">
          {loreSections.map((section) => (
            <article className="lore-card" key={section.title}>
              <div className="lore-symbol" aria-hidden="true">
                {section.symbol}
              </div>

              <h3>{section.title}</h3>
              <p>{section.description}</p>

              <div className="lore-status">
                {section.detail}
              </div>
            </article>
          ))}
        </div>

        <div className="lore-spoiler-notice">
          <span aria-hidden="true">✦</span>
          <div>
            <h3>Spoiler Protection</h3>
            <p>
              Some lore may reveal events from Gilded Mythos
              podcasts. Future lore entries will identify
              spoiler-sensitive information and hide it
              until readers choose to reveal it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

