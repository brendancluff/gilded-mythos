
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Community Art Gallery | Gilded Mythos",
  description:
    "Explore artwork created by the Gilded Mythos community.",
};

const artworks = [
  {
    image: "/community-art/IMG_1802.webp",
    artist: "animeage",
  },
  {
    image: "/community-art/IMG_1803.webp",
    artist: "thekoboldguild",
  },
  {
    image: "/community-art/IMG_2038.webp",
    artist: "snail_sir",
  },
  {
    image: "/community-art/sketch_commission_2.webp",
    artist: "pluckyshroom",
  },
  {
    image: "/community-art/commission_1.webp",
    artist: "pluckyshroom",
  },
];

export default function CommunityArtPage() {
  return (
    <main className="community-page">
      <section className="community-hero">
        <p className="eyebrow">GILDED MYTHOS COMMUNITY</p>
        <h1>Community Art Gallery</h1>
        <p>
          Explore artwork inspired by the characters,
          stories, and adventures of Alori.
        </p>
      </section>

      <section className="community-content">
        <div className="community-intro">
          <p className="eyebrow">CREATED BY OUR COMMUNITY</p>
          <h2>Art From Our Adventurers</h2>
          <p>
            A collection of artwork celebrating the
            creativity of the Gilded Mythos community.
          </p>
        </div>

        <div className="art-gallery-grid">
          {artworks.map((artwork) => (
            <article
              className="art-gallery-card"
              key={artwork.image}
            >
              <div className="art-gallery-image">
                <Image
                  src={artwork.image}
                  alt={`Community artwork by ${artwork.artist}`}
                  width={800}
                  height={1100}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="art-gallery-credit">
                <span>ARTWORK BY</span>
                <h3>{artwork.artist}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="art-gallery-back">
          <Link href="/community">
            ← Back to Community
          </Link>
        </div>
      </section>
    </main>
  );
}
