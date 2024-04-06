import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or API key is missing");
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;
