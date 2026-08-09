import { useContext } from "react";
import { TournoiContext } from "../context/TournoiContext";

export default function Groupes() {
  const { tournoi } = useContext(TournoiContext);

  if (!tournoi) {
    return <h1>Aucun tournoi trouvé</h1>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🏆 Groupes</h1>

      {tournoi.groupes.map((groupe) => (
        <div key={groupe.nom} style={{ marginBottom: 30 }}>
          <h2>{groupe.nom}</h2>

          {groupe.equipes.map((id) => {
            const equipe = tournoi.equipes.find((e) => e.id === id);

            return (
              <p key={id}>
                {equipe?.joueur1} / {equipe?.joueur2}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}