
import type { Metadata } from "next";
import Image from "next/image";
import SortingQuiz from "./SortingQuiz";

export const metadata: Metadata = {
  title: "House Sorting Quiz | Gilded Mythos",
  description:
    "Discover the four Houses of Kinari Academy in the world of Alori.",
};

const houses = [
  {
    name: "Solara",
    colorClass: "house-solara",
    image: "/houses/SOLARA.webp",
    words: "Order · Purpose · Creation",
  },
  {
    name: "Lunaris",
    colorClass: "house-lunaris",
    image: "/houses/LUNARIS.webp",
    words: "Knowledge · Emotion · History",
  },
  {
    name: "Aetherion",
    colorClass: "house-aetherion",
    image: "/houses/AETHERION.webp",
    words: "Change · Growth · Rebirth",
  },
  {
    name: "Spiraxus",
    colorClass: "house-spiraxus",
    image: "/houses/SPIRAXUS.webp",
    words: "Ruin · Prophecy · Truth",
  },
];

export default function QuizPage() {
  return (
    <main className="quiz-page">
      <section className="quiz-hero">
        <p className="eyebrow">KINARI ACADEMY</p>

        <h1>Discover Your House</h1>

        <p>
          Four Houses. One Academy. Every student
          has a place within Kinari Academy.
          Where will your story begin?
        </p>
      </section>

      <section className="quiz-content">
        <div className="quiz-intro">
          <p className="eyebrow">THE FOUR HOUSES</p>

          <h2>Where Will You Belong?</h2>

          <p>
            Explore the four Houses of Kinari Academy
            and discover their official crests.
            Each House has its own identity and story.
          </p>
        </div>

        <div className="house-grid">
          {houses.map((house) => (
            <article
              className={`house-card ${house.colorClass}`}
              key={house.name}
            >
              <div className="house-crest">
                <Image
                  src={house.image}
                  alt={`${house.name} official House crest`}
                  width={320}
                  height={400}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>

              <h3>{house.name}</h3>

              <p className="house-words">
                {house.words}
              </p>
            </article>
          ))}
        </div>

        <SortingQuiz />
      </section>
    </main>
  );
}
