import { supabase } from "./supabase";

export async function creerTournoiSupabase(
  tournoi: any
) {
  const { data, error } = await supabase
    .from("tournois")
    .insert([
      {
        nom: tournoi.nom,
        data: tournoi,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data.id;
}

export async function mettreAJourTournoiSupabase(
  tournoi: any
) {
  if (!tournoi.supabaseId) return;

  const { error } = await supabase
    .from("tournois")
    .update({
      nom: tournoi.nom,
      data: tournoi,
    })
    .eq("id", tournoi.supabaseId);

  if (error) {
    console.error(error);
  }
}

export async function chargerTournoiSupabase(
  supabaseId: string
) {
  const { data, error } = await supabase
    .from("tournois")
    .select("*")
    .eq("id", supabaseId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}