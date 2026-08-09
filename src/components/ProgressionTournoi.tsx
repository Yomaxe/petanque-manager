import { useContext } from "react";
import { TournoiContext } from "../context/TournoiContext";

export default function ProgressionTournoi() {
  const { tournoi } = useContext(TournoiContext);

  if (!tournoi) return null;

  const matchsGroupesJoues =
    tournoi.matchs.filter((m) => m.joue).length;

  const matchsPlayoffsJoues =
    tournoi.playoffs.filter((m) => m.joue).length;

  const totalMatchs = 20;

  const matchsJoues =
    matchsGroupesJoues + matchsPlayoffsJoues;

  const progression = Math.round(
    (matchsJoues / totalMatchs) * 100
  );

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 16,
        marginBottom: 25,
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#15803d",
        }}
      >
        📊 Progression du tournoi
      </h3>

      <div
        style={{
          width: "100%",
          height: 20,
          background: "#e5e7eb",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progression}%`,
            height: "100%",
            background: "#15803d",
            transition: "0.3s",
          }}
        />
      </div>

      <p
        style={{
          marginTop: 12,
          marginBottom: 8,
          fontWeight: "bold",
        }}
      >
        {matchsJoues} / {totalMatchs} matchs joués
        ({progression}%)
      </p>

      <div
        style={{
          color: "#555",
          fontSize: 14,
        }}
      >
        ⚔️ Poules : {matchsGroupesJoues} / 12
        <br />
        🏆 Playoffs : {matchsPlayoffsJoues} / 8
      </div>
    </div>
  );
}