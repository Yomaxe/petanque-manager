import type { Equipe } from "../types/tournoi";

interface Props {
  titre: string;
  equipes: Equipe[];
  phaseTerminee?: boolean;
}

export default function ClassementTable({
  titre,
  equipes,
  phaseTerminee = false,
}: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ marginTop: 0 }}>{titre}</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Équipe</th>
            <th>V</th>
            <th>D</th>
            <th>PP</th>
            <th>PC</th>
            <th>Diff</th>
            <th>Statut</th>
          </tr>
        </thead>

        <tbody>
          {equipes.map((equipe, index) => (
            <tr
              key={equipe.id}
              style={{
                borderTop: "1px solid #eee",
              }}
            >
              <td
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </td>

              <td>
                {equipe.joueur1} / {equipe.joueur2}
              </td>

              <td style={{ textAlign: "center" }}>
                {equipe.victoires}
              </td>

              <td style={{ textAlign: "center" }}>
                {equipe.defaites}
              </td>

              <td style={{ textAlign: "center" }}>
                {equipe.pointsPour}
              </td>

              <td style={{ textAlign: "center" }}>
                {equipe.pointsContre}
              </td>

              <td style={{ textAlign: "center" }}>
                {equipe.pointsPour -
                  equipe.pointsContre}
              </td>

              <td
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {phaseTerminee ? (
  index < 2
    ? "✅ Qualifié"
    : "❌ Éliminé"
) : (
  index < 2
    ? "✅ Qualifié"
    : "⚠️ Encore en course"
)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}