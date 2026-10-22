
import Link from "next/link";

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
            <article className="feature-card" key={feature.title}>
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
            Solara. Lunaris. Atherion. Spriaxus.
            Four Houses await those who enter Kinari Academy.
            Your journey will begin with a House Sorting Quiz.
          </p>

          <p className="coming-soon">
            House Sorting Quiz — Coming Soon
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <p className="footer-brand">✦ Gilded Mythos ✦</p>
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
