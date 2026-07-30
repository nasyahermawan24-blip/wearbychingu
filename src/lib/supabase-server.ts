import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    "https://anrflrxhngyyvxlxfxau.supabase.co",
    "sb_publishable__8AVGsy2Ed_cHFqTseklJQ_MzndlH6b",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );
}
