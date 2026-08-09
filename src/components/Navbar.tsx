import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const lienStyle = (path: string) => ({
    color:
      location.pathname === path
        ? "#15803d"
        : "#374151",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: 16,
  });

  return (
    <div
      style={{
        background: "white",
        padding: "15px 25px",
        borderRadius: 16,
        marginBottom: 25,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: "#15803d",
        }}
      >
        🏆 Pétanque Manager
      </div>

      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <Link to="/" style={lienStyle("/")}>
          🏠 Accueil
        </Link>

        <Link
          to="/matchs"
          style={lienStyle("/matchs")}
        >
          ⚔️ Matchs
        </Link>

        <Link
          to="/playoffs"
          style={lienStyle("/playoffs")}
        >
          🏆 Playoffs
        </Link>
      </div>
    </div>
  );
}