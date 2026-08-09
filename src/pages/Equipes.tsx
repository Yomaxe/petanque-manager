import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TournoiContext } from "../context/TournoiContext";

export default function Equipes() {
  const { tournoi, setTournoi } = useContext(TournoiContext);
  const navigate = useNavigate();

  if (!tournoi) return <h1>Aucun tournoi trouvé.</h1>;

  const [equipes, setEquipes] = useState(
  tournoi.equipes.length > 0
    ? tournoi.equipes
    : Array.from(
        { length: tournoi.nombreEquipes },
        (_, i) => ({
          id: i + 1,
          joueur1: "",
          joueur2: "",
          victoires: 0,
          defaites: 0,
          pointsPour: 0,
          pointsContre: 0,
        })
      )
);

  const continuer = () => {
    // Mélange des équipes
    const equipesMelangees = [...equipes].sort(() => Math.random() - 0.5);

    // Création des groupes
    const milieu = equipesMelangees.length / 2;

    const groupes = [
      {
        nom: "Groupe A",
        equipes: equipesMelangees.slice(0, milieu).map((e) => e.id),
      },
      {
        nom: "Groupe B",
        equipes: equipesMelangees.slice(milieu).map((e) => e.id),
      },
    ];

    // Génération des matchs
    let matchs = [];
    let id = 1;

    for (const groupe of groupes) {
      const e = groupe.equipes;

      matchs.push(
        // Journée 1
        {
          id: id++,
          equipeA: e[0],
          equipeB: e[1],
          scoreA: 0,
          scoreB: 0,
          joue: false,
          groupe: groupe.nom,
        },
        {
          id: id++,
          equipeA: e[2],
          equipeB: e[3],
          scoreA: 0,
          scoreB: 0,
          joue: false,
          groupe: groupe.nom,
        },

        // Journée 2
        {
          id: id++,
          equipeA: e[0],
          equipeB: e[2],
          scoreA: 0,
          scoreB: 0,
          joue: false,
          groupe: groupe.nom,
        },
        {
          id: id++,
          equipeA: e[1],
          equipeB: e[3],
          scoreA: 0,
          scoreB: 0,
          joue: false,
          groupe: groupe.nom,
        },

        // Journée 3
        {
          id: id++,
          equipeA: e[0],
          equipeB: e[3],
          scoreA: 0,
          scoreB: 0,
          joue: false,
          groupe: groupe.nom,
        },
        {
          id: id++,
          equipeA: e[1],
          equipeB: e[2],
          scoreA: 0,
          scoreB: 0,
          joue: false,
          groupe: groupe.nom,
        }
      );
    }

    setTournoi({
      ...tournoi,
      equipes: equipesMelangees,
      groupes,
      matchs,
    });

    navigate("/matchs");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>👥 Ajout des équipes</h1>

      {equipes.map((equipe, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: 20,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <h2>Équipe {index + 1}</h2>

          <input
            type="text"
            placeholder="Joueur 1"
            value={equipe.joueur1}
            onChange={(e) => {
  const copie = [...equipes];
  copie[index].joueur1 = e.target.value;

  setEquipes(copie);

  setTournoi({
    ...tournoi,
    equipes: copie,
  });
}}
            style={{
              width: "100%",
              padding: 10,
              marginBottom: 10,
            }}
          />

          <input
            type="text"
            placeholder="Joueur 2"
            value={equipe.joueur2}
            onChange={(e) => {
  const copie = [...equipes];
  copie[index].joueur2 = e.target.value;

  setEquipes(copie);

  setTournoi({
    ...tournoi,
    equipes: copie,
  });
}}
            style={{
              width: "100%",
              padding: 10,
            }}
          />
        </div>
      ))}

      <button
        onClick={continuer}
        style={{
          padding: "15px 30px",
          background: "#15803d",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          fontSize: 18,
        }}
      >
        Générer les groupes
      </button>
    </div>
  );
}