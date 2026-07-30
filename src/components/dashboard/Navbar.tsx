"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Store, Shield, Sparkles } from "lucide-react";

import { logoutUser } from "@/services/auth.service";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile } = useAuth();

  const isAdmin = pathname.startsWith("/dashboard/admin");

  async function handleLogout() {
    try {
      await logoutUser();
      router.replace("/login");
    } catch (error) {
      console.error(error);
      alert("Logout gagal.");
    }
  }

  return (
    <header
      className="
      h-20
      bg-zinc-950/80
      backdrop-blur-xl
      border-b
      border-pink-900/30
      flex
      items-center
      justify-between
      px-8
      sticky
      top-0
      z-40
      shadow-[0_4px_25px_rgba(0,0,0,0.4)]
      "
    >
      <div className="flex items-center gap-3">
        <div className="h-9 w-1 bg-gradient-to-b from-pink-500 to-fuchsia-600 rounded-full" />
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {isAdmin ? "Admin Workspace" : "Customer Portal"}
            <Sparkles size={16} className="text-pink-400 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-400">
            WearByChingu • Market Digital Fashion Korea
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick link to Store */}
        <Link
          href="/products"
          className="
          hidden
          sm:flex
          items-center
          gap-2
          rounded-xl
          border
          border-pink-900/40
          bg-pink-950/20
          px-4
          py-2
          text-xs
          font-medium
          text-pink-300
          hover:bg-pink-900/40
          hover:border-pink-500/50
          transition-all
          duration-300
          "
        >
          <Store size={15} />
          View Store
        </Link>

        {/* User Info Card */}
        {profile && (
          <div className="hidden md:flex items-center gap-3 bg-zinc-900/80 border border-pink-900/20 rounded-2xl px-3.5 py-1.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-pink-700 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold shadow-[0_0_12px_rgba(212,20,90,0.4)]">
              {profile.full_name?.charAt(0)?.toUpperCase() ?? "U"}
            </div>
            <div className="text-left leading-tight pr-2">
              <p className="text-xs font-semibold text-white truncate max-w-[130px]">
                {profile.full_name || user?.email}
              </p>
              <span className="text-[10px] text-pink-400 capitalize flex items-center gap-1 font-medium">
                <Shield size={10} />
                {profile.role || "user"}
              </span>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-pink-700
          via-pink-600
          to-pink-500
          px-4
          py-2.5
          text-xs
          font-semibold
          text-white
          shadow-[0_0_20px_rgba(212,20,90,0.3)]
          hover:shadow-[0_0_30px_rgba(212,20,90,0.5)]
          hover:scale-[1.03]
          active:scale-[0.98]
          transition-all
          duration-300
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}