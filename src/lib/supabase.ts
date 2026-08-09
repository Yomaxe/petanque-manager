import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zqlitqinazaaqlzwulza.supabase.co";
const supabaseKey = "sb_publishable_N-Eq1MrTXazu0aMFkyjKCA_vFXCPhsI";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);