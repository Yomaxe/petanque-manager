import { useNavigate } from "react-router-dom";

export default function Accueil() {
  const navigate = useNavigate();

  const tournoiExiste =
    localStorage.getItem("tournoi") !== null;

  function reprendreTournoi() {
  const sauvegarde = localStorage.getItem("tournoi");

  if (!sauvegarde) return;

  const tournoi = JSON.parse(sauvegarde);

  if (
    !tournoi.matchs ||
    tournoi.matchs.length === 0
  ) {
    navigate("/equipes");
    return;
  }

  if (
    tournoi.playoffs &&
    tournoi.playoffs.length > 0
  ) {
    navigate("/playoffs");
    return;
  }

  navigate("/matchs");
}

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          textAlign: "center",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            color: "#15803d",
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🏆 Pétanque Manager
        </h1>

        <p
          style={{
            color: "#555",
            marginBottom: "35px",
          }}
        >
          Gérez facilement vos tournois de pétanque.
        </p>

        {tournoiExiste ? (
          <>
            <button
              onClick={reprendreTournoi}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "15px",
              }}
            >
              ▶️ Reprendre le tournoi
            </button>

            <button
              onClick={() => {
                if (
                  confirm(
                    "Supprimer le tournoi en cours ?"
                  )
                ) {
                  localStorage.removeItem("tournoi");
                  window.location.reload();
                }
              }}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "12px",
                fontSize: "18px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              🗑️ Nouveau tournoi
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/creation")}
            style={{
              background: "#15803d",
              color: "white",
              border: "none",
              padding: "15px 30px",
              borderRadius: "12px",
              fontSize: "18px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Créer un tournoi
          </button>
        )}
      </div>
    </div>
  );
}