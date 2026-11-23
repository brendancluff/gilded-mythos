
import Link from "next/link";

const SHOP_URL = "https://gilded-mythos-shop.fourthwall.com/";

const features = [
  {
    symbol: "⚔",
    title: "Explore Our Podcasts",
    description:
      "Discover stories, adventures, and unforgettable characters from across the world of Alori.",
    href: "/podcasts",
    action: "Discover Podcasts",
  },
  {
    symbol: "✧",
    title: "Enter Alori",
    description:
      "Explore a homebrewed fantasy world filled with nations, deities, legends, and mysteries.",
    href: "/lore",
    action: "Explore the Lore",
  },
  {
    symbol: "✦",
    title: "Kinari Academy",
    description:
      "Four Houses. One Academy. Discover where you belong in the world of Kinari.",
    href: "/quiz",
    action: "Discover Your House",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-glow" />

        <div className="hero-content">
          <p className="eyebrow">A WORLD OF STORIES AWAITS</p>

          <h1>
            Welcome to
            <span> Gilded Mythos</span>
          </h1>

          <p className="hero-description">
            Enter Alori, a world where magic, mystery, and
            extraordinary adventures intertwine. Discover our
            Dungeons &amp; Dragons podcasts and become part of
            the story.
          </p>

          <div className="hero-actions">
            <Link href="/podcasts" className="button-primary">
              Explore Our Stories
            </Link>

            <Link href="/lore" className="button-secondary">
              Discover Alori
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <p className="eyebrow">YOUR ADVENTURE BEGINS HERE</p>
          <h2>Explore the Mythos</h2>
          <p>
            Every legend begins somewhere. Choose your path
            into our growing world.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-symbol">
                {feature.symbol}
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>

              <Link href={feature.href}>
                {feature.action} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="academy-section">
        <div className="academy-content">
          <p className="eyebrow">KINARI ACADEMY</p>
          <h2>Where Will You Belong?</h2>

          <p>
            Solara. Lunaris. Aetherion. Spiraxus.
            Four Houses await those who enter Kinari Academy.
            Discover your House by taking the official
            Kinari Academy House Sorting Quiz.
          </p>

          <Link href="/quiz" className="coming-soon">
            Take the House Sorting Quiz
          </Link>
        </div>
      </section>

      <section className="merch-section">
        <div className="merch-content">
          <div className="merch-art" aria-hidden="true">
            <span className="merch-symbol">✦</span>
            <span className="merch-art-title">
              Gilded Mythos
            </span>
            <span className="merch-art-subtitle">
              OFFICIAL MERCHANDISE
            </span>
          </div>

          <div className="merch-details">
            <p className="eyebrow">
              OFFICIAL GILDED MYTHOS
            </p>

            <h2>Merchandise</h2>

            <p>
              Bring a piece of Alori into your world.
              Explore official Gilded Mythos merchandise
              inspired by our stories and adventures.
            </p>

            <a
              href={SHOP_URL}
              className="button-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Shop Our Merch ↗
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <p className="footer-brand">
          ✦ Gilded Mythos ✦
        </p>

        <p>
          Adventures across Alori. Stories beyond imagination.
        </p>

        <p className="footer-note">
          An independent Dungeons &amp; Dragons fan community.
        </p>
      </footer>
    </main>
  );
}
