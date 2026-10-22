
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community | Gilded Mythos",
  description:
    "Explore fan art, community links, and music from the Gilded Mythos community.",
};

const communitySections = [
  {
    symbol: "✦",
    title: "Fan Art Gallery",
    description:
      "Celebrate the creativity of the Gilded Mythos community. Discover fan artwork inspired by Alori and its adventures.",
    status: "Gallery Coming Soon",
    className: "community-art",
  },
  {
    symbol: "✧",
    title: "Discord Community",
    description:
      "Connect with other fans, discuss your favorite moments, and share your adventures with the Gilded Mythos community.",
    status: "Discord Link Coming Soon",
    className: "community-discord",
  },
  {
    symbol: "♫",
    title: "Music & Playlists",
    description:
      "Explore music and playlists associated with Gilded Mythos, its characters, and the world of Alori.",
    status: "Music Coming Soon",
    className: "community-music",
  },
];

export default function CommunityPage() {
  return (
    <main className="community-page">
      <section className="community-hero">
        <p className="eyebrow">THE GILDED MYTHOS COMMUNITY</p>

        <h1>Join the Adventure</h1>

        <p>
          A gathering place for fans, artists, and
          adventurers. Become part of the growing
          Gilded Mythos community.
        </p>
      </section>

      <section className="community-content">
        <div className="community-intro">
          <p className="eyebrow">BEYOND THE PODCAST</p>

          <h2>Explore Our Community</h2>

          <p>
            The stories of Alori extend beyond the
            podcast. Discover artwork, connect with
            fellow fans, and explore music inspired
            by our adventures.
          </p>
        </div>

        <div className="community-grid">
          {communitySections.map((section) => (
            <article
              className={`community-card ${section.className}`}
              key={section.title}
            >
              <div
                className="community-symbol"
                aria-hidden="true"
              >
                {section.symbol}
              </div>

              <h3>{section.title}</h3>

              <p>{section.description}</p>

              <div className="community-status">
                {section.status}
              </div>
            </article>
          ))}
        </div>

        <div className="community-guidelines">
          <span className="guidelines-symbol" aria-hidden="true">
            ✦
          </span>

          <div>
            <h3>A Welcoming Community</h3>

            <p>
              Community artwork and featured content
              will be reviewed and managed by Gilded
              Mythos administrators before appearing
              on the website.
            </p>

            <p>
              Spoiler-sensitive submissions will be
              labeled and protected before publication.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
