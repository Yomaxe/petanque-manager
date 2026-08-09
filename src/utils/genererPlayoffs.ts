import type { Equipe, Match, MatchPlayoff } from "../types/tournoi";
import { calculClassement } from "./calculClassement";

export function genererPlayoffs(
  equipes: Equipe[],
  matchs: Match[],
  groupes: { nom: string; equipes: number[] }[]
): MatchPlayoff[] {

  const groupeA = groupes.find(g => g.nom === "Groupe A");
  const groupeB = groupes.find(g => g.nom === "Groupe B");

  if (!groupeA || !groupeB) return [];

  const equipesA = equipes.filter(e => groupeA.equipes.includes(e.id));
  const equipesB = equipes.filter(e => groupeB.equipes.includes(e.id));

  const matchsA = matchs.filter(m => m.groupe === "Groupe A");
  const matchsB = matchs.filter(m => m.groupe === "Groupe B");

  const classementA = calculClassement(equipesA, matchsA);
  const classementB = calculClassement(equipesB, matchsB);

  return [
    {
      id: 1,
      phase: "Demi-finale",
      equipeA: classementA[0].id,
      equipeB: classementB[1].id,
      scoreA: 0,
      scoreB: 0,
      joue: false,
    },

    {
      id: 2,
      phase: "Demi-finale",
      equipeA: classementB[0].id,
      equipeB: classementA[1].id,
      scoreA: 0,
      scoreB: 0,
      joue: false,
    },

    {
      id: 3,
      phase: "Consolante",
      equipeA: classementA[2].id,
      equipeB: classementB[3].id,
      scoreA: 0,
      scoreB: 0,
      joue: false,
    },

    {
      id: 4,
      phase: "Consolante",
      equipeA: classementB[2].id,
      equipeB: classementA[3].id,
      scoreA: 0,
      scoreB: 0,
      joue: false,
    },
  ];
}