import { useContext } from "react";
import { TournoiContext } from "../context/TournoiContext";
import MatchCard from "../components/MatchCard";
import ClassementTable from "../components/ClassementTable";
import type { Equipe, Match } from "../types/tournoi";
import { calculClassement } from "../utils/calculClassement";
import { useNavigate } from "react-router-dom";
import HeaderTournoi from "../components/HeaderTournoi";
import Navbar from "../components/Navbar";
import ProgressionTournoi from "../components/ProgressionTournoi";

export default function Matchs() {
  const {
  tournoi,
  updateMatch,
  genererPlayoffs,
} = useContext(TournoiContext);

  const navigate = useNavigate();

  if (!tournoi) return <h1>Aucun tournoi</h1>;

  const equipesParGroupe = (nomGroupe: string) => {
    const groupe = tournoi.groupes.find((g) => g.nom === nomGroupe);
    if (!groupe) return [] as Equipe[];

    return groupe.equipes
      .map((id) => tournoi.equipes.find((e) => e.id === id))
      .filter((e): e is Equipe => e !== undefined);
  };

  const groupeAEquipes = equipesParGroupe("Groupe A");
  const groupeBEquipes = equipesParGroupe("Groupe B");
  const groupeAMatchs = tournoi.matchs.filter((m) => m.groupe === "Groupe A");
  const groupeBMatchs = tournoi.matchs.filter((m) => m.groupe === "Groupe B");

  const matchsGroupeATermines =
  groupeAMatchs.every((m) => m.joue);

  const matchsGroupeBTermines =
  groupeBMatchs.every((m) => m.joue);

  const classementA = calculClassement(
  groupeAEquipes,
  groupeAMatchs
  );

  const classementB = calculClassement(
  groupeBEquipes,
  groupeBMatchs
  );

    const rendreMatch = (match: Match) => {
    const equipeA = tournoi.equipes.find((e) => e.id === match.equipeA);
    const equipeB = tournoi.equipes.find((e) => e.id === match.equipeB);

    if (!equipeA || !equipeB) return null;

    return (
      <MatchCard
  key={match.id}
  match={match}
  equipeA={equipeA}
  equipeB={equipeB}
  onScoreChange={
    tournoi.playoffs.length > 0
      ? () => {}
      : updateMatch
  }
  readonly={tournoi.playoffs.length > 0}
/>
    );
  };

    const tousLesMatchsJoues =
  tournoi.matchs.every((m) => m.joue);

  return (
    <div
      style={{
        padding: 40,
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <HeaderTournoi />
      <ProgressionTournoi />
      {tournoi.logo && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
    }}
  >
    <img
      src={tournoi.logo}
      alt="Logo tournoi"
      style={{
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: 20,
      }}
    />
  </div>
)}
      <h1 style={{ marginBottom: 24 }}>🏆 Matchs</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>Groupe A</h2>
            {groupeAMatchs.map(rendreMatch)}
          </div>

          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 16 }}>Groupe B</h2>
            {groupeBMatchs.map(rendreMatch)}
          </div>
        </div>

        <div style={{ display: "grid", gap: 24 }}>
          <ClassementTable
  titre="Classement Groupe A"
  equipes={classementA}
  phaseTerminee={matchsGroupeATermines}
/>

<ClassementTable
  titre="Classement Groupe B"
  equipes={classementB}
  phaseTerminee={matchsGroupeBTermines}
/>
        </div>
      </div>
            {tousLesMatchsJoues && (
        <div
          style={{
            marginTop: 30,
            textAlign: "center",
          }}
        >
          <button
            onClick={() => {
            genererPlayoffs();
            navigate("/playoffs");
            }}
            style={{
              padding: "15px 30px",
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              background: "#15803d",
              color: "white",
              cursor: "pointer",
            }}
          >
            Passer aux Playoffs →
          </button>
        </div>
      )}
    </div>
  );
}