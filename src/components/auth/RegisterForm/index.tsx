"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/auth.service";
import RegisterUI from "./RegisterUI";

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    console.log("========== REGISTER ==========");
    console.log("Form :", form);

    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      setLoading(true);

      console.log("Sebelum registerUser()");

      const result = await registerUser(form);

      console.log("Sesudah registerUser()");
      console.log(result);

      alert("Register berhasil, silakan login");

      router.replace("/login");
    } catch (error: unknown) {
      console.error("REGISTER ERROR");
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <RegisterUI
      form={form}
      setForm={setForm}
      onSubmit={handleRegister}
      loading={loading}
    />
  );
}
