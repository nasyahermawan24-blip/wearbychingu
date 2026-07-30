import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function redirectWithSession(
  url: URL,
  responseWithSession: NextResponse
) {
  const response = NextResponse.redirect(url);

  responseWithSession.cookies.getAll().forEach((cookie) => {
    response.cookies.set(cookie);
  });

  return response;
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    "https://anrflrxhngyyvxlxfxau.supabase.co",
    "sb_publishable__8AVGsy2Ed_cHFqTseklJQ_MzndlH6b",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({ request });

          cookiesToSet.forEach((cookie) => response.cookies.set(cookie));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";

    return redirectWithSession(loginUrl, response);
  }

  if (request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profile?.role !== "admin") {
      const customerUrl = request.nextUrl.clone();
      customerUrl.pathname = "/dashboard/customer";
      customerUrl.search = "";

      return redirectWithSession(customerUrl, response);
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
