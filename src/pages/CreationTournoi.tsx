import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TournoiContext } from "../context/TournoiContext";
import {creerTournoiSupabase,mettreAJourTournoiSupabase,} from "../lib/tournoisSupabase";

export default function CreationTournoi() {
  const { setTournoi } = useContext(TournoiContext);
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [lieu, setLieu] = useState("");
  const [date, setDate] = useState("");
  const [nombreEquipes, setNombreEquipes] = useState(8);
  const [logo, setLogo] = useState("");

  async function creerTournoi() {
  const nouveauTournoi = {
    nom,
    lieu,
    date,
    logo,

    nombreEquipes,

    groupes: [],
    equipes: [],
    matchs: [],
    playoffs: [],

    termine: false,
  };

  const supabaseId =
    await creerTournoiSupabase(
      nouveauTournoi
    );

  console.log("SUPABASE ID =", supabaseId);

  const tournoiComplet = {
    ...nouveauTournoi,
    supabaseId,
  };

  setTournoi(tournoiComplet);

  await mettreAJourTournoiSupabase(
  tournoiComplet
);

  navigate("/equipes");
}

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <h1>🏆 Création du tournoi</h1>

      <div style={{ marginBottom: 20 }}>
        <label>Nom du tournoi</label>

        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 5,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Lieu</label>

        <input
          type="text"
          value={lieu}
          onChange={(e) => setLieu(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 5,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Date</label>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 5,
          }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Nombre d'équipes</label>

        <select
          value={nombreEquipes}
          onChange={(e) =>
            setNombreEquipes(Number(e.target.value))
          }
          style={{
            width: "100%",
            padding: 12,
            marginTop: 5,
          }}
        >
          <option value={8}>8 équipes</option>
        </select>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>Logo du tournoi</label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const fichier = e.target.files?.[0];

            if (!fichier) return;

            const lecteur = new FileReader();

            lecteur.onload = () => {
              setLogo(lecteur.result as string);
            };

            lecteur.readAsDataURL(fichier);
          }}
          style={{
            width: "100%",
            marginTop: 5,
          }}
        />
      </div>

      {logo && (
        <div
          style={{
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo tournoi"
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: 20,
              border: "2px solid #ddd",
            }}
          />
        </div>
      )}

      <button
        onClick={creerTournoi}
        style={{
          background: "#15803d",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: 12,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        Continuer →
      </button>
    </div>
  );
}