
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Updates | Gilded Mythos",
  description:
    "Discover official Gilded Mythos announcements, podcast news, and community updates.",
};

const newsCategories = [
  {
    symbol: "✦",
    title: "Podcast News",
    description:
      "Stay informed about podcast announcements, new episodes, and upcoming adventures.",
    className: "news-podcast",
  },
  {
    symbol: "✧",
    title: "Community Updates",
    description:
      "Discover community announcements, website updates, and future events.",
    className: "news-community",
  },
  {
    symbol: "♜",
    title: "World & Lore Updates",
    description:
      "Learn when new official information about Alori, Kinari Academy, and future campaigns becomes available.",
    className: "news-lore",
  },
];

export default function NewsPage() {
  return (
    <main className="news-page">
      <section className="news-hero">
        <p className="eyebrow">
          THE LATEST FROM GILDED MYTHOS
        </p>

        <h1>News & Updates</h1>

        <p>
          Follow the latest announcements, adventures,
          and developments from the world of
          Gilded Mythos.
        </p>
      </section>

      <section className="news-content">
        <div className="news-intro">
          <p className="eyebrow">OFFICIAL ANNOUNCEMENTS</p>

          <h2>What&apos;s New in the Mythos?</h2>

          <p>
            This is where the Gilded Mythos creators
            will share official announcements,
            podcast updates, and community news.
          </p>
        </div>

        <article className="news-featured">
          <div className="news-featured-label">
            FEATURED ANNOUNCEMENT
          </div>

          <h2>Welcome to Gilded Mythos</h2>

          <p>
            Gilded Mythos is your gateway to the
            homebrewed world of Alori and the
            adventures of Kinari Academy.
          </p>

          <p>
            Official news and announcements from
            the creators will appear here once
            the website launches.
          </p>

          <div className="news-featured-footer">
            <span>WEBSITE INTRODUCTION</span>
            <span>PREVIEW CONTENT</span>
          </div>
        </article>

        <div className="news-section-heading">
          <p className="eyebrow">EXPLORE THE LATEST</p>
          <h2>News Categories</h2>
        </div>

        <div className="news-grid">
          {newsCategories.map((category) => (
            <article
              className={`news-card ${category.className}`}
              key={category.title}
            >
              <div
                className="news-symbol"
                aria-hidden="true"
              >
                {category.symbol}
              </div>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <span className="news-coming-soon">
                UPDATES COMING SOON
              </span>
            </article>
          ))}
        </div>

        <div className="news-notice">
          <span aria-hidden="true">✦</span>

          <div>
            <h3>Official Gilded Mythos News</h3>

            <p>
              Announcements and articles will be
              published by authorized Gilded Mythos
              administrators. Spoiler-sensitive
              information will be clearly identified
              and protected before publication.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
