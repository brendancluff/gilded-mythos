
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcasts | Gilded Mythos",
  description:
    "Explore the Dungeons & Dragons podcasts and adventures of Gilded Mythos.",
};

export default function PodcastsPage() {
  return (
    <main className="podcasts-page">
      <section className="podcasts-hero">
        <p className="eyebrow">THE STORIES OF ALORI</p>

        <h1>Our Podcasts</h1>

        <p>
          Every adventure adds another chapter to the world
          of Alori. Explore the campaigns, meet their heroes,
          and discover the stories that shape our mythos.
        </p>
      </section>

      <section className="podcasts-content">
        <div className="podcasts-grid">
          <article className="podcast-card">
            <div className="podcast-artwork">
              <span>✦</span>
              <h2>Kinari Academy</h2>
              <p>A Gilded Mythos Adventure</p>
            </div>

            <div className="podcast-details">
              <span className="podcast-label">
                FIRST PODCAST
              </span>

              <h3>Kinari Academy</h3>

              <p>
                Enter Kinari Academy, a college within the
                magical world of Alori. Discover its four
                Houses, meet the characters, and follow
                their adventures.
              </p>

              <div className="podcast-houses">
                <span>Solara</span>
                <span>Lunaris</span>
                <span>Atherion</span>
                <span>Spriaxus</span>
              </div>

              <p className="podcast-note">
                Episode listings and listening links
                will be added soon.
              </p>
            </div>
          </article>

          <article className="podcast-card upcoming-card">
            <div className="upcoming-content">
              <span className="upcoming-symbol">✧</span>
              <h2>More Adventures Await</h2>

              <p>
                Alori is a world of countless stories.
                Future Gilded Mythos podcasts will
                appear here.
              </p>

              <span className="upcoming-label">
                COMING SOON
              </span>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
