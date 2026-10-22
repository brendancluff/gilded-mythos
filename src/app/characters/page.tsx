
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Characters & Players | Gilded Mythos",
  description:
    "Meet the characters, players, and Dungeon Master behind Gilded Mythos.",
};

const characters = [
  { name: "Mavis", player: "Emmalee Price" },
  { name: "Archibald", player: "Abraham Dorado" },
  { name: "Finnian", player: "Mitchell Hallsted" },
  { name: "Jo Yuu", player: "Kelton Winger" },
  { name: "Goro", player: "Colton Spencer" },
];

export default function CharactersPage() {
  return (
    <main className="characters-page">
      <section className="characters-hero">
        <p className="eyebrow">THE PEOPLE BEHIND THE LEGENDS</p>
        <h1>Characters & Players</h1>
        <p>
          Meet the adventurers of Gilded Mythos and the
          storytellers who bring the world of Alori to life.
        </p>
      </section>

      <section className="characters-content">
        <div className="characters-heading">
          <p className="eyebrow">OUR FIRST ADVENTURE</p>
          <h2>Kinari Academy</h2>
          <p>
            Meet the cast of our first Dungeons & Dragons
            podcast, set within Kinari Academy.
          </p>
        </div>

        <div className="dm-card">
          <div className="dm-symbol">✦</div>
          <div>
            <span className="character-role">DUNGEON MASTER</span>
            <h3>Danyell Hallsted</h3>
            <p>
              Guiding the adventure and bringing the
              world of Alori to life.
            </p>
          </div>
        </div>

        <div className="character-grid">
          {characters.map((character) => (
            <article
              className="character-card"
              key={character.name}
            >
              <div className="character-portrait">
                <span aria-hidden="true">✧</span>
                <p>Official Portrait Coming Soon</p>
              </div>

              <div className="character-details">
                <span className="character-role">
                  KINARI ACADEMY
                </span>

                <h3>{character.name}</h3>

                <p>
                  Played by{" "}
                  <strong>{character.player}</strong>
                </p>

                <div className="character-spoiler-note">
                  Character biography and spoiler-protected
                  information will be added later.
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
