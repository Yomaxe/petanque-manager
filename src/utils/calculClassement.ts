import type { Equipe, Match } from "../types/tournoi";

export function calculClassement(
  equipes: Equipe[],
  matchs: Match[]
) {
  const stats = equipes.map((equipe) => ({
    ...equipe,
    victoires: 0,
    defaites: 0,
    pointsPour: 0,
    pointsContre: 0,
  }));

  matchs.forEach((match) => {
    if (!match.joue) return;

    const equipeA = stats.find((e) => e.id === match.equipeA);
    const equipeB = stats.find((e) => e.id === match.equipeB);

    if (!equipeA || !equipeB) return;

    equipeA.pointsPour += match.scoreA;
    equipeA.pointsContre += match.scoreB;

    equipeB.pointsPour += match.scoreB;
    equipeB.pointsContre += match.scoreA;

    if (match.scoreA > match.scoreB) {
      equipeA.victoires++;
      equipeB.defaites++;
    } else {
      equipeB.victoires++;
      equipeA.defaites++;
    }
  });

  return stats.sort((a, b) => {
    if (b.victoires !== a.victoires) {
      return b.victoires - a.victoires;
    }

    return (
      b.pointsPour -
      b.pointsContre -
      (a.pointsPour - a.pointsContre)
    );
  });
}