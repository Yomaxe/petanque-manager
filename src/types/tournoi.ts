export interface Equipe {
  id: number;

  joueur1: string;
  joueur2: string;

  victoires: number;
  defaites: number;

  pointsPour: number;
  pointsContre: number;
}

export interface Match {
  id: number;

  equipeA: number;
  equipeB: number;

  scoreA: number;
  scoreB: number;

  joue: boolean;

  groupe: string;
}

export interface MatchPlayoff {
  id: number;

  phase:
    | "Demi-finale"
    | "Petite finale"
    | "Finale"
    | "Consolante"
    | "Finale Consolante"
    | "Petite Finale Consolante";

  equipeA: number;
  equipeB: number;

  scoreA: number;
  scoreB: number;

  joue: boolean;
}

export interface Groupe {
  nom: string;
  equipes: number[];
}

export interface Tournoi {
  nom: string;
  lieu: string;
  date: string;
  logo?: string;
  nombreEquipes: number;

  groupes: Groupe[];

  equipes: Equipe[];

  matchs: Match[];

  playoffs: MatchPlayoff[];

  termine: boolean;
}