"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  CreditCard,
  Download,
  Store,
  MessageSquare,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/dashboard/admin");

  const menuClass = (href: string) => {
    const isActive = pathname === href;
    return `
      flex
      items-center
      gap-3.5
      rounded-2xl
      px-4
      py-3.5
      font-medium
      text-sm
      transition-all
      duration-300
      ${
        isActive
          ? "bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500 text-white font-semibold shadow-[0_0_25px_rgba(212,20,90,0.4)] translate-x-1"
          : "text-gray-400 hover:bg-zinc-900/90 hover:text-pink-300 hover:translate-x-1"
      }
    `;
  };

  return (
    <aside
      className="
      w-72
      min-h-screen
      bg-zinc-950/90
      backdrop-blur-xl
      border-r
      border-pink-900/30
      flex
      flex-col
      shadow-[4px_0_30px_rgba(0,0,0,0.5)]
      "
    >
      {/* Brand Header */}
      <div
        className="
        p-6
        border-b
        border-pink-900/30
        bg-gradient-to-b
        from-pink-950/20
        to-transparent
        "
      >
        <Link href="/" className="group block">
          <h1
            className="
            text-2xl
            font-black
            tracking-wider
            bg-gradient-to-r
            from-pink-400
            via-pink-500
            to-fuchsia-500
            bg-clip-text
            text-transparent
            group-hover:scale-105
            transition-transform
            duration-300
            "
          >
            WearByChingu
          </h1>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-400 tracking-wider font-medium uppercase">
              Digital Marketplace
            </span>

            <span
              className={`
              flex
              items-center
              gap-1
              rounded-full
              px-2.5
              py-0.5
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              ${
                isAdmin
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/30"
                  : "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30"
              }
            `}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck size={12} />
                  Admin
                </>
              ) : (
                <>
                  <UserCheck size={12} />
                  Customer
                </>
              )}
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1.5 p-4 overflow-y-auto">
        <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-pink-400/70 uppercase">
          Main Menu
        </div>

        <Link
          href={isAdmin ? "/dashboard/admin" : "/dashboard/customer"}
          className={menuClass(isAdmin ? "/dashboard/admin" : "/dashboard/customer")}
        >
          <LayoutDashboard size={20} className="shrink-0" />
          Dashboard Overview
        </Link>

        {isAdmin && (
          <>
            <div className="mt-4 px-3 py-2 text-[11px] font-semibold tracking-wider text-pink-400/70 uppercase">
              Management
            </div>

            <Link
              href="/dashboard/admin/categories"
              className={menuClass("/dashboard/admin/categories")}
            >
              <FolderTree size={20} className="shrink-0" />
              Categories
            </Link>

            <Link
              href="/dashboard/admin/products"
              className={menuClass("/dashboard/admin/products")}
            >
              <Package size={20} className="shrink-0" />
              Products
            </Link>

            <Link
              href="/dashboard/admin/orders"
              className={menuClass("/dashboard/admin/orders")}
            >
              <ShoppingCart size={20} className="shrink-0" />
              Orders
            </Link>

            <Link
              href="/dashboard/admin/payments"
              className={menuClass("/dashboard/admin/payments")}
            >
              <CreditCard size={20} className="shrink-0" />
              Payments
            </Link>
          </>
        )}

        {!isAdmin && (
          <>
            <div className="mt-4 px-3 py-2 text-[11px] font-semibold tracking-wider text-pink-400/70 uppercase">
              Shop & Account
            </div>

            <Link href="/products" className={menuClass("/products")}>
              <Store size={20} className="shrink-0" />
              Marketplace
            </Link>

            <Link href="/cart" className={menuClass("/cart")}>
              <ShoppingCart size={20} className="shrink-0" />
              Cart
            </Link>

            <Link
              href="/dashboard/customer"
              className={menuClass("/dashboard/customer")}
            >
              <Package size={20} className="shrink-0" />
              My Orders
            </Link>

            <Link href="/downloads" className={menuClass("/downloads")}>
              <Download size={20} className="shrink-0" />
              Downloads
            </Link>

            <Link href="/testimonials" className={menuClass("/testimonials")}>
              <MessageSquare size={20} className="shrink-0" />
              Testimonials
            </Link>
          </>
        )}
      </nav>

      {/* Footer Info inside Sidebar */}
      <div className="p-4 border-t border-pink-900/20 bg-black/40">
        <div className="rounded-2xl border border-pink-900/30 bg-pink-950/20 p-3 text-center">
          <p className="text-xs font-semibold text-pink-400">
            Korean Digital Fashion
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            WearByChingu v1.0
          </p>
        </div>
      </div>
    </aside>
  );
}