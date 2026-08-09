import { useContext } from "react";
import { TournoiContext } from "../context/TournoiContext";

export default function HeaderTournoi() {
  const { tournoi } = useContext(TournoiContext);

  if (!tournoi) return null;

  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        padding: 25,
        marginBottom: 25,
        boxShadow: "0 4px 20px rgba(0,0,0,.08)",
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}
    >
      {tournoi.logo && (
        <img
          src={tournoi.logo}
          alt="Logo"
          style={{
            width: 90,
            height: 90,
            objectFit: "cover",
            borderRadius: 16,
            border: "2px solid #e5e7eb",
          }}
        />
      )}

      <div>
        <h1
          style={{
            margin: 0,
            color: "#15803d",
            fontSize: 30,
          }}
        >
          🏆 {tournoi.nom}
        </h1>

        <p
          style={{
            margin: "8px 0",
            color: "#666",
          }}
        >
          📍 {tournoi.lieu}
        </p>

        <p
          style={{
            margin: 0,
            color: "#666",
          }}
        >
          📅 {tournoi.date}
        </p>
      </div>
    </div>
  );
}