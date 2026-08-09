import Equipes from "./pages/Equipes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import CreationTournoi from "./pages/CreationTournoi";
import Groupes from "./pages/Groupes";
import Matchs from "./pages/Matchs";
import Playoffs from "./pages/Playoffs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/creation" element={<CreationTournoi />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/groupes" element={<Groupes />} />
        <Route path="/matchs" element={<Matchs />} />
        <Route path="/playoffs" element={<Playoffs />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;