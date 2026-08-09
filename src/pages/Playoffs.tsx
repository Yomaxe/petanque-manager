import { useContext } from "react";
import { TournoiContext } from "../context/TournoiContext";
import type { Match } from "../types/tournoi";
import MatchCard from "../components/MatchCard";
import HeaderTournoi from "../components/HeaderTournoi";
import Navbar from "../components/Navbar";
import ProgressionTournoi from "../components/ProgressionTournoi";
import { calculClassementFinal } from "../utils/calculClassementFinal";

export default function Playoffs() {
  const { tournoi, updatePlayoffMatch } =
    useContext(TournoiContext);

  if (!tournoi) return <>Aucun tournoi</>;

  const classementFinal = calculClassementFinal(
    tournoi.equipes,
    tournoi.playoffs
  );

  if (tournoi.playoffs.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <Navbar />
        <HeaderTournoi />

        <h1>🏆 Playoffs</h1>

        <p>Aucun playoff généré.</p>
      </div>
    );
  }

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

      <h1 style={{ marginBottom: 25 }}>
        🏆 Playoffs
      </h1>

      {tournoi.playoffs.map((match) => {
        const equipeA = tournoi.equipes.find(
          (e) => e.id === match.equipeA
        );

        const equipeB = tournoi.equipes.find(
          (e) => e.id === match.equipeB
        );

        if (!equipeA || !equipeB) return null;

        return (
          <div
            key={match.id}
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              marginBottom: 20,
              boxShadow:
                "0 2px 10px rgba(0,0,0,.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#15803d",
              }}
            >
              {match.phase}
            </h2>

            <MatchCard
              match={
                {
                  ...match,
                  groupe: match.phase,
                } as Match
              }
              equipeA={equipeA}
              equipeB={equipeB}
              onScoreChange={updatePlayoffMatch}
            />
          </div>
        );
      })}

      {classementFinal.length > 0 && (
        <>
          {/* Champion */}
          <div
            style={{
              background: "#fef3c7",
              padding: 30,
              borderRadius: 20,
              textAlign: "center",
              marginTop: 30,
              border: "3px solid #f59e0b",
              boxShadow:
                "0 4px 15px rgba(0,0,0,.08)",
            }}
          >
            <h1>🏆 Champions du tournoi</h1>

            <h2>
              {classementFinal[0].joueur1}
              <br />
              &
              <br />
              {classementFinal[0].joueur2}
            </h2>

            <p>
              📍 {tournoi.lieu}
              <br />
              📅 {tournoi.date}
            </p>
          </div>

          {/* 2e et 3e */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                background: "#e5e7eb",
                padding: 20,
                borderRadius: 16,
                textAlign: "center",
              }}
            >
              <h2>🥈 Finalistes</h2>

              <p>
                {classementFinal[1].joueur1}
                <br />
                {classementFinal[1].joueur2}
              </p>
            </div>

            <div
              style={{
                background: "#fed7aa",
                padding: 20,
                borderRadius: 16,
                textAlign: "center",
              }}
            >
              <h2>🥉 Troisième place</h2>

              <p>
                {classementFinal[2].joueur1}
                <br />
                {classementFinal[2].joueur2}
              </p>
            </div>
          </div>

          {/* Classement complet */}
          <div
            style={{
              background: "white",
              padding: 25,
              borderRadius: 16,
              marginTop: 25,
              boxShadow:
                "0 2px 10px rgba(0,0,0,.08)",
            }}
          >
            <h2>📋 Classement complet</h2>

            {classementFinal.map(
              (equipe, index) => (
                <div
                  key={equipe.id}
                  style={{
                    padding: 12,
                    borderBottom:
                      index !==
                      classementFinal.length - 1
                        ? "1px solid #eee"
                        : "none",
                  }}
                >
                  <strong>
                    {index + 1}.
                  </strong>{" "}
                  {equipe.joueur1} /{" "}
                  {equipe.joueur2}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}