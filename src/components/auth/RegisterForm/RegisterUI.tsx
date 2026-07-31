"use client";

interface Props {
  form: {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<{
      fullName: string;
      phone: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>
  >;

  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;

  loading: boolean;
}

export default function RegisterUI({
  form,
  setForm,
  onSubmit,
  loading,
}: Props) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-transparent">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),_transparent_48%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          bg-black/60
          border border-[#8a0038]/50
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(212,20,90,0.15)]
          p-8
        "
      >
        <h1 className="text-3xl font-bold text-center text-gradient">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Join WearByChingu Marketplace
        </p>

        <form
          onSubmit={onSubmit}
          className="space-y-4"
          autoComplete="on"
        >
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
            className="input-auth"
          />

          <input
            type="text"
            placeholder="Phone Number"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="input-auth"
          />

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="input-auth"
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
            className="input-auth"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            className="input-auth"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-[#8a0038]
              to-[#d4145a]
              text-white
              font-semibold
              transition-all
              duration-300
              hover:shadow-[0_0_30px_rgba(212,20,90,0.5)]
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}