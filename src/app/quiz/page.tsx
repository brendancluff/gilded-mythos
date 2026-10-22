
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "House Sorting Quiz | Gilded Mythos",
    description:
        "Discover the four Houses of Kinari Academy in the world of Alori.",
};

const houses = [
    { name: "Solara", colorClass: "house-solara" },
    { name: "Lunaris", colorClass: "house-lunaris" },
    { name: "Atherion", colorClass: "house-atherion" },
    { name: "Spriaxus", colorClass: "house-spriaxus" },
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
                        Explore the four Houses of Kinari Academy.
                        Their official crests, colors, mottos,
                        and descriptions will be revealed here.
                    </p>
                </div>

                <div className="house-grid">
                    {houses.map((house) => (
                        <article
                            className={`house-card ${house.colorClass}`}
                            key={house.name}
                        >
                            <div className="house-crest" aria-hidden="true">
                                ♜
                            </div>

                            <h3>{house.name}</h3>

                            <p>
                                Official House description
                                coming soon.
                            </p>

                            <span className="house-placeholder">
                                CREST & MOTTO COMING SOON
                            </span>
                        </article>
                    ))}
                </div>

                <div className="quiz-coming-soon">
                    <div className="quiz-coming-symbol" aria-hidden="true">
                        ✦
                    </div>

                    <h2>Your Sorting Awaits</h2>

                    <p>
                        The Kinari Academy House Sorting Quiz
                        is currently being prepared.
                        Once available, registered fans will
                        be able to discover their House.
                    </p>

                    <div className="quiz-status">
                        SORTING QUIZ — COMING SOON
                    </div>

                    <p className="quiz-information">
                        House assignments will be saved to fan
                        profiles once the account and quiz
                        systems are complete.
                    </p>
                </div>
            </section>
        </main>
    );
}
