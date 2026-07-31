import Link from "next/link";

interface LoginUIProps {
  email: string;
  password: string;

  loading: boolean;
  error: string;

  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginUI({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginUIProps) {
  return (
    <div
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-6
        bg-gradient-to-br
        from-black
        via-[#0d0d0d]
        to-[#2a0015]
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),_transparent_48%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-pink-500/10 blur-3xl" />
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-pink-900/40
          bg-black/60
          backdrop-blur-xl
          shadow-[0_0_50px_rgba(212,20,90,0.2)]
          p-8
        "
      >
        {/* Logo */}
        <h1
          className="
            text-4xl
            font-extrabold
            text-center
            bg-gradient-to-r
            from-pink-400
            via-pink-500
            to-fuchsia-600
            bg-clip-text
            text-transparent
          "
        >
          WearByChingu
        </h1>

        <p className="text-center text-gray-400 mt-3 mb-8">
          Welcome Back 👋
        </p>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500 bg-red-500/20 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900/80
              px-4
              py-3
              text-white
              placeholder:text-gray-500
              focus:border-pink-500
              focus:ring-2
              focus:ring-pink-500/30
              focus:outline-none
              transition
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-900/80
              px-4
              py-3
              text-white
              placeholder:text-gray-500
              focus:border-pink-500
              focus:ring-2
              focus:ring-pink-500/30
              focus:outline-none
              transition
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-[#8a0038]
              via-[#d4145a]
              to-[#ff2d95]
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-pink-500/20
              hover:shadow-pink-500/40
              hover:scale-[1.02]
              transition-all
              duration-300
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="mt-8 text-center text-sm text-gray-400">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="
              font-semibold
              text-pink-400
              hover:text-pink-300
              transition
            "
          >
            Register sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}