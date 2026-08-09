import type { Equipe, MatchPlayoff } from "../types/tournoi";

export function calculClassementFinal(
  equipes: Equipe[],
  playoffs: MatchPlayoff[]
) {
  const finale = playoffs.find(
    (m) => m.phase === "Finale" && m.joue
  );

  const petiteFinale = playoffs.find(
    (m) => m.phase === "Petite finale" && m.joue
  );

  const finaleConsolante = playoffs.find(
    (m) => m.phase === "Finale Consolante" && m.joue
  );

  const petiteFinaleConsolante = playoffs.find(
    (m) => m.phase === "Petite Finale Consolante" && m.joue
  );

  if (
    !finale ||
    !petiteFinale ||
    !finaleConsolante ||
    !petiteFinaleConsolante
  ) {
    return [];
  }

  const gagnant = (match: MatchPlayoff) =>
    match.scoreA > match.scoreB
      ? match.equipeA
      : match.equipeB;

  const perdant = (match: MatchPlayoff) =>
    match.scoreA > match.scoreB
      ? match.equipeB
      : match.equipeA;

  const classementIds = [
    gagnant(finale),
    perdant(finale),
    gagnant(petiteFinale),
    perdant(petiteFinale),
    gagnant(finaleConsolante),
    perdant(finaleConsolante),
    gagnant(petiteFinaleConsolante),
    perdant(petiteFinaleConsolante),
  ];

  return classementIds
    .map((id) => equipes.find((e) => e.id === id))
    .filter(Boolean) as Equipe[];
}