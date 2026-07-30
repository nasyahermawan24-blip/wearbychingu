"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import useAuth from "@/hooks/useAuth";
import DashboardLayoutComponent from "@/components/dashboard/DashboardLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    loading,
    user,
    profile,
  } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    if (
      !loading &&
      user &&
      pathname.startsWith("/dashboard/admin") &&
      profile?.role !== "admin"
    ) {
      router.replace("/dashboard/customer");
    }
  }, [loading, user, profile, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-pink-500 border-t-transparent shadow-[0_0_30px_rgba(212,20,90,0.5)]" />
        <p className="mt-4 font-semibold text-pink-400 tracking-wide text-sm">
          Loading WearByChingu Workspace...
        </p>
      </div>
    );
  }

  if (!user) return null;

  if (
    pathname.startsWith("/dashboard/admin") &&
    profile?.role !== "admin"
  ) {
    return null;
  }

  return (
    <DashboardLayoutComponent>
      {children}
    </DashboardLayoutComponent>
  );
}
