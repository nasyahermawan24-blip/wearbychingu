import { supabase } from "@/lib/supabase";

interface RegisterData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const { fullName, phone, email, password } = data;

  const { data: authData, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
        },
      },
    });

  if (error) {
    throw new Error(error.message);
  }

  return authData;
}

export async function loginUser(data: LoginData) {
  const { email, password } = data;

  // Login ke Supabase Auth
  const { data: authData, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  // Ambil profile berdasarkan user login
  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user.id)
      .single();

  if (profileError) {
    throw new Error("Profile tidak ditemukan.");
  }

  return profile.role;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}