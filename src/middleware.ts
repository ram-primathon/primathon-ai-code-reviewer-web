import { cookies } from "next/headers";

import ENV from "@prima/config/env";
import { buildQueryParams } from "./api/utils";

export const COOKIE_NAME = {
  JWT_TOKEN: "jwtToken",
};

export const getAppUrl = (
  path: string,
  params: { [key: string]: any } | null = null
) => {
  if (params) {
    return `${ENV.APP_BASE_URL}${path}?${buildQueryParams(params)}`;
  }
  return `${ENV.APP_BASE_URL}${path}`;
};

export function middleware(request: Request) {
  const redirectTo = (path: string) =>
    Response.redirect(new URL(path, request.url));

  const token = cookies().get(COOKIE_NAME.JWT_TOKEN)?.value;

  const pathname = new URL(request.url).pathname;

  // Protect dashboard route if user is not logged in
  if (!token && pathname.startsWith("/dashboard")) {
    return redirectTo(getAppUrl("/login"));
  }

  // Redirect to dashboard if user is logged in
  if (token && pathname.startsWith("/login")) {
    return redirectTo(getAppUrl("/dashboard"));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
