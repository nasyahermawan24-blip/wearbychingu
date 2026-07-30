import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  "https://anrflrxhngyyvxlxfxau.supabase.co",
  "sb_publishable__8AVGsy2Ed_cHFqTseklJQ_MzndlH6b",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
