import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Tournoi } from "../types/tournoi";
import { genererPlayoffs as creerPlayoffs } from "../utils/genererPlayoffs";
import {mettreAJourTournoiSupabase,chargerTournoiSupabase,} from "../lib/tournoisSupabase";

interface TournoiContextType {
  tournoi: Tournoi | null;

  setTournoi: (tournoi: Tournoi) => void;

  updateMatch: (
    matchId: number,
    scoreA: number,
    scoreB: number
  ) => void;

  updatePlayoffMatch: (
    matchId: number,
    scoreA: number,
    scoreB: number
  ) => void;

  genererPlayoffs: () => void;
}

export const TournoiContext = createContext<TournoiContextType>({
  tournoi: null,

  setTournoi: () => {},

  updateMatch: () => {},

  updatePlayoffMatch: () => {},

  genererPlayoffs: () => {},
});

interface Props {
  children: ReactNode;
}

export function TournoiProvider({ children }: Props) {
  const [tournoi, setTournoi] = useState<Tournoi | null>(() => {
  const sauvegarde = localStorage.getItem("tournoi");

  if (!sauvegarde) return null;

  return JSON.parse(sauvegarde);
});

useEffect(() => {
  if (tournoi) {
    localStorage.setItem(
      "tournoi",
      JSON.stringify(tournoi)
    );
  }
}, [tournoi]);

/*useEffect(() => {
  if (!tournoi || !tournoi.supabaseId) return;
  const supabaseId = tournoi.supabaseId;
  const interval = setInterval(async () => {
  const tournoiSupabase =
      await chargerTournoiSupabase(
  supabaseId
  );

    if (!tournoiSupabase) return;

    setTournoi(tournoiSupabase);
  }, 5000);

  return () => clearInterval(interval);
}, [tournoi?.supabaseId]);*/

  async function updateMatch(
  matchId: number,
  scoreA: number,
  scoreB: number
) {
  if (!tournoi) return;

  const nouveauTournoi = structuredClone(tournoi);

  const match = nouveauTournoi.matchs.find(
    (m) => m.id === matchId
  );

  if (!match) return;

  match.scoreA = scoreA;
  match.scoreB = scoreB;
  match.joue = true;

  setTournoi(nouveauTournoi);

  await mettreAJourTournoiSupabase(
    nouveauTournoi
  );
}

  async function updatePlayoffMatch(
  matchId: number,
  scoreA: number,
  scoreB: number
) {
  if (!tournoi) return;

  const nouveauTournoi = structuredClone(tournoi);

  const match = nouveauTournoi.playoffs.find(
    (m) => m.id === matchId
  );

  if (!match) return;

  match.scoreA = scoreA;
  match.scoreB = scoreB;
  match.joue = true;

  const demis = nouveauTournoi.playoffs.filter(
    (m) => m.phase === "Demi-finale"
  );

  const finaleExiste = nouveauTournoi.playoffs.some(
    (m) => m.phase === "Finale"
  );

  if (
    demis.length === 2 &&
    demis.every((m) => m.joue) &&
    !finaleExiste
  ) {
    const demi1 = demis[0];
    const demi2 = demis[1];

    const vainqueur1 =
      demi1.scoreA > demi1.scoreB
        ? demi1.equipeA
        : demi1.equipeB;

    const perdant1 =
      demi1.scoreA > demi1.scoreB
        ? demi1.equipeB
        : demi1.equipeA;

    const vainqueur2 =
      demi2.scoreA > demi2.scoreB
        ? demi2.equipeA
        : demi2.equipeB;

    const perdant2 =
      demi2.scoreA > demi2.scoreB
        ? demi2.equipeB
        : demi2.equipeA;

    nouveauTournoi.playoffs.push(
      {
        id: 5,
        phase: "Finale",
        equipeA: vainqueur1,
        equipeB: vainqueur2,
        scoreA: 0,
        scoreB: 0,
        joue: false,
      },
      {
        id: 6,
        phase: "Petite finale",
        equipeA: perdant1,
        equipeB: perdant2,
        scoreA: 0,
        scoreB: 0,
        joue: false,
      }
    );
  }

  const consolantes = nouveauTournoi.playoffs.filter(
  (m) => m.phase === "Consolante"
);

const finaleConsolanteExiste =
  nouveauTournoi.playoffs.some(
    (m) => m.phase === "Finale Consolante"
  );

if (
  consolantes.length === 2 &&
  consolantes.every((m) => m.joue) &&
  !finaleConsolanteExiste
) {
  const consolante1 = consolantes[0];
  const consolante2 = consolantes[1];

  const vainqueur1 =
    consolante1.scoreA > consolante1.scoreB
      ? consolante1.equipeA
      : consolante1.equipeB;

  const perdant1 =
    consolante1.scoreA > consolante1.scoreB
      ? consolante1.equipeB
      : consolante1.equipeA;

  const vainqueur2 =
    consolante2.scoreA > consolante2.scoreB
      ? consolante2.equipeA
      : consolante2.equipeB;

  const perdant2 =
    consolante2.scoreA > consolante2.scoreB
      ? consolante2.equipeB
      : consolante2.equipeA;

  nouveauTournoi.playoffs.push(
    {
      id: 7,
      phase: "Finale Consolante",
      equipeA: vainqueur1,
      equipeB: vainqueur2,
      scoreA: 0,
      scoreB: 0,
      joue: false,
    },
    {
      id: 8,
      phase: "Petite Finale Consolante",
      equipeA: perdant1,
      equipeB: perdant2,
      scoreA: 0,
      scoreB: 0,
      joue: false,
    }
  );
}

  setTournoi(nouveauTournoi);

  await mettreAJourTournoiSupabase(
  nouveauTournoi
);
}

  async function genererPlayoffs() {
  if (!tournoi) return;

  if (tournoi.playoffs.length > 0) return;

  const playoffs = creerPlayoffs(
    tournoi.equipes,
    tournoi.matchs,
    tournoi.groupes
  );

  const nouveauTournoi = {
    ...tournoi,
    playoffs,
  };

  setTournoi(nouveauTournoi);

  await mettreAJourTournoiSupabase(
    nouveauTournoi
  );
}

  return (
    <TournoiContext.Provider
      value={{
        tournoi,
        setTournoi,
        updateMatch,
        updatePlayoffMatch,
        genererPlayoffs,
      }}
    >
      {children}
    </TournoiContext.Provider>
  );
}