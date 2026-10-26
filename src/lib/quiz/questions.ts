
import type { HouseName, QuizQuestion } from "./types";

const S: HouseName = "Solara";
const L: HouseName = "Lunaris";
const A: HouseName = "Atherion";
const P: HouseName = "Spiraxus";

type AnswerInput = [string, string, HouseName[]];

function makeQuestion(
  id: number,
  question: string,
  answers: AnswerInput[]
): QuizQuestion {
  return {
    id,
    question,
    randomizeAnswers: id !== 18,
    answers: answers.map(([answerId, text, houses]) => ({
      id: answerId,
      text,
      houses,
    })),
  };
}

const standardHouses: HouseName[][] = [[S], [L], [A], [P]];

function standardAnswers(
  answers: [string, string][]
): AnswerInput[] {
  return answers.map(([id, text], index) => [
    id,
    text,
    standardHouses[index],
  ]);
}

export const quizQuestions: QuizQuestion[] = [
  makeQuestion(1, "Which of the following would you consider to be your greatest strength?", standardAnswers([
    ["a", "Your commitment to doing what you believe is right."],
    ["b", "Your dedication to those you love."],
    ["c", "Your determination to better yourself and your life."],
    ["d", "Your unwavering resolve to stand for truth."],
  ])),

  makeQuestion(2, "What would you risk everything for?", standardAnswers([
    ["a", "Establishing peace and equality throughout all of Alori."],
    ["b", "Obtaining knowledge that would drastically improve the lives of those around me."],
    ["c", "Securing my dream life."],
    ["d", "Whatever ensures the future is better than the present."],
  ])),

  makeQuestion(3, "What quality do you admire most in others?", standardAnswers([
    ["a", "The manner in which they carry themselves."],
    ["b", "Their loyalty."],
    ["c", "Their work ethic."],
    ["d", "Their honesty."],
  ])),

  makeQuestion(4, "What motivates you to keep going when you’ve reached your limit?", standardAnswers([
    ["a", "The desire to keep the commitments I’ve set for myself."],
    ["b", "The knowledge that other people are relying on me to come through for them."],
    ["c", "The promise of a better life."],
    ["d", "The drive to prove that other people are wrong about me."],
  ])),

  makeQuestion(5, "How do you typically respond to failure?", standardAnswers([
    ["a", "I take a step back, and assess what went wrong."],
    ["b", "Failures happen, so I’d take time to recoup before trying again."],
    ["c", "I welcome failures, and quickly note every detail before tackling the obstacle from a different angle."],
    ["d", "They are inevitable, only pushing me to work harder until the matter is resolved."],
  ])),

  makeQuestion(6, "Is it ever acceptable to break a promise?", [
    ["a", "Yes", [A, P]],
    ["b", "No", [S, L]],
  ]),

  makeQuestion(7, "If doing the right thing meant you’d lose everything, would you still do it?", [
    ["a", "Yes", [S, P]],
    ["b", "No", [A, L]],
  ]),

  makeQuestion(8, "If you discovered a long-standing practice was harming others, how would you respond?", standardAnswers([
    ["a", "It’s important to maintain order in society. I weigh which would cause more distress, upholding the tradition or doing away with it."],
    ["b", "There’s nothing more important than caring for those around you. Even if a practice benefits some members of society, it can't be upheld at the cost of harming others."],
    ["c", "Societal progression is imperative when it comes to bettering our communities. Long-standing or not, outdated practices must concede to that progression."],
    ["d", "Everything comes at a cost. I consider the consequences of each option and then choose whatever is best for the majority of the population."],
  ])),

  makeQuestion(9, "What would you do if someone you loved committed a terrible crime?", standardAnswers([
    ["a", "For the safety of everyone around them, I would turn them in."],
    ["b", "Even though I know what they did was wrong, I would still attempt to help them through it to the best of my abilities."],
    ["c", "That depends on what they did, why they did it, and if they got caught."],
    ["d", "If they harmed someone innocent, I’m turning them in. If they had a reasonable motive, my lips would be sealed."],
  ])),

  makeQuestion(10, "How would you respond to betrayal?", standardAnswers([
    ["a", "I would want to know why I was betrayed, and then I’d decide whether or not I’d want to work through it."],
    ["b", "Being betrayed by someone I care about would affect me deeply, but I would attempt to work through it with them if they wanted to reconcile."],
    ["c", "I believe that people can change, but I wouldn’t entertain a conversation regarding the betrayal until enough time had passed for the other party to prove to me that they’d put in the work to grow."],
    ["d", "Once a person has shown you their true colors, believe them. I don’t need to hear their explanation, I wouldn’t need anything from them ever again."],
  ])),

  makeQuestion(11, "What role do you naturally take on in friend groups?", standardAnswers([
    ["a", "The planner."],
    ["b", "The caretaker."],
    ["c", "The daredevil."],
    ["d", "The voice of reason."],
  ])),

  makeQuestion(12, "How do you typically handle disagreements with those you care about?", standardAnswers([
    ["a", "I prioritize engaging in fair, rational conversations to resolve the points of contention once both sides have had an opportunity to calm down."],
    ["b", "I tend to get carried away in the heat of the moment, but still always try my best to consider the other side's feelings as well."],
    ["c", "I refuse to engage in meaningless arguments, if they want to discuss something we can do it over coffee or dinner. If they can’t calm down enough to schedule a time to talk, then it’s simply not worth my time to begin with."],
    ["d", "I have a bad habit of self-sabotaging, and often storm off in the heat of the moment."],
  ])),

  makeQuestion(13, "How would you respond to someone you love challenging your beliefs?", standardAnswers([
    ["a", "I would take the time to calmly explain my beliefs to them, and would be open to answering any questions they may have."],
    ["b", "I would listen to their concerns because I love them, and clear up any potential misunderstandings."],
    ["c", "I’d be open to seeing any evidence they have to justify their concerns. However, if they didn’t bother doing any research into the subject, then why should I bother explaining it to them?"],
  ])),

  makeQuestion(14, "What is your love language?", [
    ["a", "Acts of Service", [P, A]],
    ["b", "Quality Time", [L, A]],
    ["c", "Words of Affirmation", [S, L]],
    ["d", "Gifts", [L, S]],
    ["e", "Physical Touch", [A, S]],
  ]),

  makeQuestion(15, "You’re given the opportunity to study under one of the professors at Kinari Academy. Who do you choose?", [
    ["a", "Professor Akuma (Philosophy and Current Events)", [S]],
    ["b", "Professor Clarice (Literature)", [P]],
    ["c", "Professor Keen (Battle Strategy and Training)", [P]],
    ["d", "Professor Boreas (Mathematics and Arcana)", [A]],
    ["e", "Professor Nutani (Chemistry and Alchemy)", [A]],
    ["f", "Professor Rhywin (Life Sciences and Botany)", [A]],
    ["g", "Professor Haku (Languages)", [L]],
    ["h", "Professor Veronica (The Arts)", [L]],
    ["i", "Professor Yuki (Monsterology and Veterinary Medicine)", [P]],
    ["j", "Professor Elrin (Political Science and Law)", [S]],
    ["k", "Professor Yuu (Medicine and Psychology)", [L]],
    ["l", "Professor Taimo (Religion and History)", [S]],
  ]),

  makeQuestion(16, "What is more important: cherishing the life you have or creating the life you want?", [
    ["a", "Cherishing the life you have.", [S, L]],
    ["b", "Creating the life you want.", [A, P]],
  ]),

  makeQuestion(17, "Do you believe a person is shaped more by their choices or their circumstances?", [
    ["a", "Their choices.", [S, A]],
    ["b", "Their circumstances.", [P, L]],
  ]),

  makeQuestion(18, "You have a chance to receive a blessing from any member of the Pantheon you choose. Who would you select?", [
    ["a", "Immanuel (God of the Heavens, Redemption, and Mercy)", [S]],
    ["b", "Zytherion (God of the Hells, Temptation, and Bargains)", [P]],
    ["c", "Ezekiel (God of Time, Agency, and Fate)", [S]],
    ["d", "Atarah (Goddess of Law, Order, and Balance)", [S]],
    ["e", "Sabah (God of the Day, Sun, and Flames)", [S]],
    ["f", "Nisha (Goddess of the Night, Moon, and Tides)", [L]],
    ["g", "Krethros (God of the Stars, Arcana, and History)", [L]],
    ["h", "Seraphine (Goddess of Love, Lust, and Infatuation)", [L]],
    ["i", "Elyssara (Goddess of Death, Evanescence, and Passage)", [L]],
    ["j", "Drevak (God of War, Resilience, and Sacrifice)", [P]],
    ["k", "Nivelle (Goddess of Nostalgia, Hearth, and Vitality)", [L]],
    ["l", "Embyratha (Goddess of Dragons, Mythos, and Ancestry)", [S]],
    ["m", "Tarisyn (Goddess of Nature, Beasts, and Survival)", [A]],
    ["n", "Ombros (God of Trickery, Secrets, and Wild Magic)", [A]],
    ["o", "Equinae (Goddess of the Equinoxes and Solstices, Harvest, and Renewal)", [A]],
    ["p", "Luthis (God of the Arts, Festivals, and Feasts)", [L]],
    ["q", "VaElri (God of Wandering, Storms, and Adventure)", [A]],
    ["r", "Phirenia (Goddess of Lumen, Prophecy, and Dreams)", [S]],
    ["s", "Silas (God of Umbra, Shadows, and Nightmares)", [P]],
    ["t", "Blighta (Goddess of Decay, Plague, and Ruin)", [P]],
    ["u", "Haman (God of Vengeance, Ambition, and Devotion)", [A]],
    ["v", "Jinko (Goddess of Innovation, Craftsmanship, and Technology)", [A]],
  ]),
];
