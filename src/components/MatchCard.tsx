import { useState } from "react";
import type { Equipe, Match } from "../types/tournoi";

type Props = {
  match: Match;
  equipeA: Equipe;
  equipeB: Equipe;
  onScoreChange: (
    matchId: number,
    scoreA: number,
    scoreB: number
  ) => void;

  readonly?: boolean;
};

export default function MatchCard({
  match,
  equipeA,
  equipeB,
  onScoreChange,
  readonly = false,
}: Props) {
  const [scoreA, setScoreA] = useState(match.scoreA);
  const [scoreB, setScoreB] = useState(match.scoreB);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        background: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <strong>
            {equipeA.joueur1} / {equipeA.joueur2}
          </strong>
        </div>

        <input
          type="number"
          min="0"
          max="13"
          value={scoreA}
          disabled={readonly || match.joue}
          onChange={(e) =>
            setScoreA(Number(e.target.value))
          }
          style={{
            width: 70,
            padding: 8,
            textAlign: "center",
          }}
        />

        <span>-</span>

        <input
          type="number"
          min="0"
          max="13"
          value={scoreB}
          disabled={readonly || match.joue}
          onChange={(e) =>
            setScoreB(Number(e.target.value))
          }
          style={{
            width: 70,
            padding: 8,
            textAlign: "center",
          }}
        />

        <div
          style={{
            flex: 1,
            textAlign: "right",
          }}
        >
          <strong>
            {equipeB.joueur1} / {equipeB.joueur2}
          </strong>
        </div>
      </div>

      {!readonly && !match.joue && (
        <button
          onClick={() => {
            const scoreValide =
              (
                scoreA === 13 &&
                scoreB >= 0 &&
                scoreB < 13
              ) ||
              (
                scoreB === 13 &&
                scoreA >= 0 &&
                scoreA < 13
              );

            if (!scoreValide) {
              alert(
                "Score invalide. En pétanque, le vainqueur doit avoir 13 points et le perdant entre 0 et 12."
              );
              return;
            }

            onScoreChange(
              match.id,
              scoreA,
              scoreB
            );
          }}
          style={{
            marginTop: 12,
            padding: "8px 16px",
            background: "#15803d",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Enregistrer
        </button>
      )}

      {match.joue && !readonly && (
        <div
          style={{
            marginTop: 12,
            color: "#15803d",
            fontWeight: "bold",
          }}
        >
          ✅ Résultat enregistré
        </div>
      )}

      {readonly && (
        <div
          style={{
            marginTop: 12,
            color: "#dc2626",
            fontWeight: "bold",
          }}
        >
          🔒 Match verrouillé
        </div>
      )}
    </div>
  );
}