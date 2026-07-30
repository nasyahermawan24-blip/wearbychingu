"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

import useAuth from "@/hooks/useAuth";
import { logoutUser } from "@/services/auth.service";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, profile, loading } = useAuth();

  const [open, setOpen] = useState(false);

  async function handleLogout() {
    try {
      await logoutUser();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Logout gagal");
    }
  }

  const menu = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Testimonials",
      href: "/testimonials",
    },
  ];

  return (
    <nav
      className="
      fixed
      top-0
      left-0
      right-0
      z-50
      border-b
      border-pink-900/40
      bg-black/60
      backdrop-blur-xl
      shadow-[0_0_40px_rgba(212,20,90,.15)]
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        h-20
        flex
        items-center
        justify-between
      "
      >
        {/* ================= LOGO ================= */}

        <Link href="/">
          <h1
            className="
            text-3xl
            font-black
            tracking-wide
            bg-gradient-to-r
            from-pink-400
            via-pink-500
            to-fuchsia-500
            bg-clip-text
            text-transparent
          "
          >
            WearByChingu
          </h1>
        </Link>

        {/* ================= MENU DESKTOP ================= */}

        <div className="hidden md:flex items-center gap-8">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition duration-300 ${
                pathname === item.href
                  ? "text-pink-500 font-semibold"
                  : "text-gray-300 hover:text-pink-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* ================= RIGHT ================= */}

        <div className="hidden md:flex items-center gap-5">
          {/* Cart */}

          <Link href="/cart" className="relative">
            <ShoppingBag
              size={22}
              className="text-white hover:text-pink-400 transition"
            />

            <span
              className="
              absolute
              -top-2
              -right-2
              h-5
              w-5
              rounded-full
              bg-pink-600
              text-xs
              flex
              items-center
              justify-center
            "
            >
              0
            </span>
          </Link>

          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="
                text-gray-300
                hover:text-pink-400
                transition
              "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                rounded-xl
                bg-gradient-to-r
                from-pink-700
                to-pink-500
                px-5
                py-2
                font-semibold
                hover:scale-105
                transition
              "
              >
                Register
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link
                href={
                  profile?.role === "admin"
                    ? "/dashboard/admin"
                    : "/dashboard/customer"
                }
                className="
                flex
                items-center
                gap-2
                text-gray-300
                hover:text-pink-400
                transition
              "
              >
                <LayoutDashboard size={20} />
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-pink-600
                px-4
                py-2
                hover:bg-pink-700
                transition
              "
              >
                <LogOut size={18} />
                Logout
              </button>

              <div
                className="
                h-11
                w-11
                rounded-full
                bg-gradient-to-r
                from-pink-700
                to-fuchsia-600
                flex
                items-center
                justify-center
              "
              >
                <User />
              </div>
            </>
          )}
        </div>

        {/* ================= MOBILE ================= */}

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div
          className="
          md:hidden
          border-t
          border-pink-900/40
          bg-black/95
          px-6
          py-5
          space-y-5
        "
        >
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-pink-400"
            >
              {item.name}
            </Link>
          ))}

          {!loading && !user && (
            <>
              <Link
                href="/login"
                className="block"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block"
              >
                Register
              </Link>
            </>
          )}

          {!loading && user && (
            <>
              <Link
                href={
                  profile?.role === "admin"
                    ? "/dashboard/admin"
                    : "/dashboard/customer"
                }
                className="block"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}